import { CanalPedido } from "./enums/CanalPedido";
import { StatusPedido } from "./enums/StatusPedido";
import { PedidoRepository } from "./repositories/PedidoRepository";
import { ErrorCanalInvalido } from "./errors/ErrorCanalInvalido";
import { ErrorDadosIncompletos } from "./errors/ErrorDadosIncompletos";

export class PedidoService {
    private pedidoRepository: PedidoRepository;

    constructor() {
        this.pedidoRepository = new PedidoRepository();
    }

    async executar(dados: any) {
        const { canalPedido, cliente_id, unidade_id, itens } = dados;

        this.validarCanalPedido(canalPedido);
        this.validarDadosIncompletos(cliente_id, unidade_id, itens);

        const totais = this.calcularTotaisEFormatarItens(itens);
        
        // Registro do novo pedido
        const novoPedido = {
            canalPedido: canalPedido as CanalPedido,
            status: StatusPedido.AGUARDANDO_PAGAMENTO,
            total: totais.valorTotalFinal,
            total_desconto: totais.valorTotalDesconto,
            cliente_id,
            unidade_id,
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

    private calcularTotaisEFormatarItens(itens: any[]) {
        let valorSubTotal = 0;
        let valorTotalDesconto = 0;

        const itensFormatados = itens.map((item: any) => {
            const desconto = item.preco_desconto || 0;
            const subTotalItem = item.quantidade * item.preco_unitario;

            valorSubTotal += subTotalItem;
            valorTotalDesconto += desconto;

            return {
                produto_id: item.produto_id,
                quantidade: item.quantidade,
                preco_unitario: item.preco_unitario,
                preco_desconto: desconto > 0 ? desconto : null
            };
        });

        return {
            valorTotalFinal: valorSubTotal - valorTotalDesconto,
            valorTotalDesconto,
            itensFormatados
        };
    };
}