import { ErrorStatusInvalido } from './../errors/ErrorStatusInvalido';
import { CanalPedido } from "../enums/CanalPedido";
import { StatusPedido } from "../enums/StatusPedido";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { ErrorCanalInvalido } from "../errors/ErrorCanalInvalido";
import { ErrorDadosIncompletos } from "../errors/ErrorDadosIncompletos";
import { ErrorAtendenteObrigatorio } from "../errors/ErrorAtendenteObrigatorio";
import { PerfilUsuario } from "../enums/PerfilUsuario";
import { ErrorAtendenteInvalido } from "../errors/ErrorAtendenteInvalido";
import { ErrorUsuarioSemPermissaoParaAlterarStatus } from '../errors/ErrorUsuarioSemPermissaoParaAlterarStatus';
import { ErrorNotFound } from '../errors/ErrorNotFound';
import { UnidadeRepository } from '../repositories/UnidadeRepository';
import { ErrorDescontoInvalido } from '../errors/ErrorDescontoInvalido';
import { AuditoriaService } from './AuditoriaService';
import { AcaoAuditoria } from '../enums/AcaoAuditoria';

export class PedidoService {
    private pedidoRepository: PedidoRepository;
    private usuarioRepository: UsuarioRepository;
    private produtoRepository: ProdutoRepository;
    private unidadeRepository: UnidadeRepository;

    constructor() {
        this.pedidoRepository = new PedidoRepository();
        this.usuarioRepository = new UsuarioRepository();
        this.produtoRepository = new ProdutoRepository();
        this.unidadeRepository = new UnidadeRepository();
    }

    async criar(dados: any) {
        const auditoriaService = new AuditoriaService();
        this.validarDadosIncompletos(dados);
        const { canalPedido, cliente_id, unidade_id, atendente_id, itens } = dados;

        this.validarCanalPedido(canalPedido);
        await this.validarExistenciaNoBanco(cliente_id, unidade_id);
        await this.validarAtendente(canalPedido as CanalPedido, atendente_id);

        const produtosComItens = await this.buscarEValidarProdutos(itens);
        const totais = this.calcularTotaisEFormatarItens(produtosComItens);

        // Registro do novo pedido
        const novoPedido = {
            canalPedido: canalPedido as CanalPedido,
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            total: totais.valorTotalFinal,
            total_desconto: totais.valorTotalDesconto,
            cliente_id,
            unidade_id,
            atendente_id: atendente_id || null,
            itens: { create: totais.itensFormatados }
        };

        const pedidoCriado = await this.pedidoRepository.criar(novoPedido)

        await auditoriaService.registrar(
            dados.usuario_logado,
            AcaoAuditoria.CRIAR_PEDIDO,
            `Usuário ${dados.usuario_logado} (${dados.usuario_perfil}) criou o pedido ID ${pedidoCriado.id} via ${pedidoCriado.canalPedido}`
        );

        return pedidoCriado;
    };

    async atualizarStatus(dados: any) {
        const { pedido_id, novo_status, usuario_id } = dados;
        const auditoriaService = new AuditoriaService();

        if (!pedido_id || !novo_status || !usuario_id) {
            throw new ErrorDadosIncompletos([
                { field: "pedido_id, novo_status, usuario_id", issue: "Ausentes" }
            ]);
        };

        if (!Object.values(StatusPedido).includes(novo_status)) {
            throw new ErrorStatusInvalido(novo_status);
        };

        await this.validarPerfilComPermissaoParaAlterarStatus(Number(usuario_id));
        const pedido = await this.pedidoRepository.buscarPorId(Number(pedido_id));

        if (!pedido) {
            throw new ErrorNotFound("pedido", pedido_id);
        };

        const pedidoAtualizado = await this.pedidoRepository.atualizarStatus(Number(pedido_id), novo_status as StatusPedido);

        await auditoriaService.registrar(
            usuario_id,
            AcaoAuditoria.ATUALIZAR_STATUS,
            `O usuário ${usuario_id} (${dados.usuario_perfil}) atualizou o status do pedido ${pedido_id} para ${novo_status}`
        );

        return pedidoAtualizado;
    };

    async obterTodos() {
        return await this.pedidoRepository.obterTodos();
    };

    private validarCanalPedido(canalPedido: any): void {
        if (!Object.values(CanalPedido).includes(canalPedido)) {
            throw new ErrorCanalInvalido(canalPedido);
        };
    };

    private async validarExistenciaNoBanco(cliente_id: number, unidade_id: number): Promise<void> {
        const [cliente, unidade] = await Promise.all([
            this.usuarioRepository.buscarPorId(cliente_id),
            this.unidadeRepository.buscarPorId(unidade_id)
        ]);

        if (!cliente) {
            throw new ErrorNotFound("cliente", String(cliente_id));
        }

        if (!unidade) {
            throw new ErrorNotFound("unidade", String(unidade_id));
        }
    }

    private validarDadosIncompletos(dados: any): void {
        const { canalPedido, cliente_id, unidade_id, itens } = dados;
        const detalhesErro = [];

        if (!canalPedido) {
            detalhesErro.push({ field: "canalPedido", issue: "Ausente ou em branco" });
        };
        if (!cliente_id) {
            detalhesErro.push({ field: "cliente_id", issue: "Ausente ou em branco" });
        };
        if (!unidade_id) {
            detalhesErro.push({ field: "unidade_id", issue: "Ausente ou em branco" });
        };
        if (!itens || itens.length === 0) {
            detalhesErro.push({ field: "itens", issue: "O pedido precisa ter pelo menos um item" });
        } else {
            itens.forEach((item: any, index: number) => {
                if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
                    detalhesErro.push({
                        field: `itens[${index}].quantidade`,
                        issue: "A quantidade deve ser um número inteiro e maior que zero."
                    });
                };
            });
        };

        if (detalhesErro.length > 0) {
            throw new ErrorDadosIncompletos(detalhesErro);
        };
    };

    private async buscarEValidarProdutos(itens: any[]) {
        const promessas = itens.map(async (item) => {
            const produto = await this.produtoRepository.buscarPorId(Number(item.produto_id));

            if (!produto) {
                throw new ErrorNotFound("produto", item.produto_id);
            };

            return { item, produto }
        });
        return await Promise.all(promessas);
    }

    private calcularTotaisEFormatarItens(produtosComItens: any[]) {
        let valorSubTotal = 0;
        let valorTotalDesconto = 0;

        const itensFormatados = produtosComItens.map(({ item, produto }) => {
            const precoUnitarioReal = Number(produto.preco_base);
            const descontoUnitario = item.preco_desconto ? Number(item.preco_desconto) : 0;

            valorSubTotal += (item.quantidade * precoUnitarioReal);
            valorTotalDesconto += (descontoUnitario * item.quantidade);

            return {
                produto_id: item.produto_id,
                quantidade: item.quantidade,
                preco_unitario: precoUnitarioReal,
                preco_desconto: descontoUnitario > 0 ? descontoUnitario : null
            };
        });

        if (valorTotalDesconto >= valorSubTotal) {
            throw new ErrorDescontoInvalido(valorTotalDesconto, valorSubTotal);
        };

        return {
            valorTotalFinal: valorSubTotal - valorTotalDesconto,
            valorTotalDesconto,
            itensFormatados
        };
    };

    private async validarAtendente(canalPedido: CanalPedido, atendente_id: any): Promise<void> {
        const canaisComAtendente = [CanalPedido.BALCAO, CanalPedido.PICKUP];

        if (canaisComAtendente.includes(canalPedido)) {
            if (!atendente_id) {
                throw new ErrorAtendenteObrigatorio(canalPedido);
            };

            const atendente = await this.usuarioRepository.buscarPorId(Number(atendente_id));

            if (!atendente || atendente.perfil !== PerfilUsuario.ATENDENTE) {
                throw new ErrorAtendenteInvalido(atendente_id);
            };
        };
    };

    private async validarPerfilComPermissaoParaAlterarStatus(usuario_id: any): Promise<void> {
        const usuario = await this.usuarioRepository.buscarPorId(Number(usuario_id));
        const perfisPermitidos = [PerfilUsuario.COZINHA, PerfilUsuario.ATENDENTE, PerfilUsuario.GERENTE];

        if (!usuario) {
            throw new ErrorNotFound("usuario", usuario_id);
        };

        if (!perfisPermitidos.includes(usuario.perfil as PerfilUsuario)) {
            throw new ErrorUsuarioSemPermissaoParaAlterarStatus(usuario_id);
        };
    };
}