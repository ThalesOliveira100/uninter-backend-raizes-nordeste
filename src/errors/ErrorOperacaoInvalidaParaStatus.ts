import { StatusPedido } from "../enums/StatusPedido";
import { AppError } from "./AppError";

export class ErrorOperacaoInvalidaParaStatus extends AppError {
    /**
     * Erro para quando tentarem atualizar um pedido com um status que não permita a operação.
     * 
     * ex:
     * Pedido com status CANCELADO e alguém tentar realizar um pagamento.
     */
    constructor(acao: string, status: StatusPedido) {
        super(
            `Não é possível ${acao} pois o pedido encontra-se com o status '${status}'.`,
            409,
            "OPERACAO_INVALIDA_PARA_STATUS",
            [{ field: "status", issue: `O status '${status}' não permite esta operação.` }]
        );
    };
};
