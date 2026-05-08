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
import { ErrorProdutoInvalido } from "../errors/ErrorProdutoInvalido";

export class PedidoService {
    private pedidoRepository: PedidoRepository;
    private usuarioRepository: UsuarioRepository;
    private produtoRepository: ProdutoRepository;

    constructor() {
        this.pedidoRepository = new PedidoRepository();
        this.usuarioRepository = new UsuarioRepository();
        this.produtoRepository = new ProdutoRepository();
    }

    async executar(dados: any) {
        const { canalPedido, cliente_id, unidade_id, atendente_id, itens } = dados;

        this.validarCanalPedido(canalPedido);
        this.validarDadosIncompletos(cliente_id, unidade_id, itens);
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

        return await this.pedidoRepository.criar(novoPedido);
    };

    private validarCanalPedido(canalPedido: any): void {
        if (!Object.values(CanalPedido).includes(canalPedido)) {
            throw new ErrorCanalInvalido(canalPedido);
        };
    };

    private validarDadosIncompletos(cliente_id: any, unidade_id: any, itens: any[]): void {
        if (!cliente_id || !unidade_id || !Array.isArray(itens) || itens.length === 0) {
            const errorDetails = [
                    { field: "cliente_id", issue: cliente_id ? "OK" : "Ausente" },
                    { field: "unidade_id", issue: unidade_id ? "OK" : "Ausente" },
                    { field: "itens", issue: Array.isArray(itens) && itens.length > 0 ? "OK" : "Ausente ou vazio" }
                ]
            throw new ErrorDadosIncompletos(errorDetails);
        };
    };

    private async buscarEValidarProdutos(itens: any[]) {
        const promessas = itens.map(async (item) => {
            const produto = await this.produtoRepository.buscarPorId(Number(item.produto_id));

            if (!produto) {
                throw new ErrorProdutoInvalido(item.produto_id);
            };

            return { item, produto}
        });
        return await Promise.all(promessas);
    }

    private calcularTotaisEFormatarItens(produtosComItens: any[]) {
        let valorSubTotal = 0;
        let valorTotalDesconto = 0;

        const itensFormatados = produtosComItens.map(({ item, produto }) => {
            const precoUnitarioReal = Number(produto.preco_base);
            const desconto = item.preco_desconto ? Number(item.preco_desconto) : 0;

            valorSubTotal += (item.quantidade * precoUnitarioReal);
            valorTotalDesconto += desconto;

            return {
                produto_id: item.produto_id,
                quantidade: item.quantidade,
                preco_unitario: precoUnitarioReal,
                preco_desconto: desconto > 0 ? desconto : null
            };
        });

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
}