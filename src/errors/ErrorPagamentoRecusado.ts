import { AppError } from "./AppError";

export class ErrorPagamentoRecusado extends AppError {
    /**
     * Classe de Erro para simular pagamento recusado no mock de pagamento.
     */
    constructor(motivo: string) {
        super(
            "Pagamento recusado pela operadora.",
            402,
            "PAGAMENTO_RECUSADO",
            [{ field: "gateway_pagamento", issue: motivo }]
        );
    };
};
