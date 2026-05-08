import { AppError } from "./AppError";

export class ErrorAtendenteObrigatorio extends AppError {
    constructor(canal: string) {
        super(
            `Para pedidos realizados no canal ${canal}, é obrigatório informar o ID do atendente.`,
            422,
            "ATENDENTE_OBRIGATORIO",
            [{ field: "atendente_id", issue: "Valor ausente para canal que exige atendimento humano." }]
        );
    };
};
