import { AppError } from "./AppError";

export class ErrorDescontoInvalido extends AppError {
    constructor(totalDesconto: number, totalPedido: number) {
        super(
            `O valor total de desconto deve ser menor que o valor do pedido. Total Pedido: R$ ${totalPedido} | Total Desconto: R$ ${totalDesconto}`,
            409,
            "DESCONTO_INVALIDO",
            [{ field: "preco_desconto", issue: "Valor inválido." }]
        );
    };
};
