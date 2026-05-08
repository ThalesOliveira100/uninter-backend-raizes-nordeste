import { AppError } from "./AppError";

export class ErrorStatusInvalido extends AppError {
    constructor(status: string) {
        super(
            "Status inválido. Use um status válido do sistema.",
            400,
            "STATUS_INVALIDO",
            [{ field: "status", issue: `Valor recebido fora do padrão Enum: ${status || "Nenhum"}` }]
        );
    };
};
