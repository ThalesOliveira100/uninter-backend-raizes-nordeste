import { AppError } from "./AppError";

export class ErrorAtendenteInvalido extends AppError {
    constructor(atendente_id: number) {
        super(
            `Atendente com o ID: ${atendente_id} não localizado na base de dados.`,
            404,
            "ATENDENTE_INVALIDO",
            [{ field: "atendente_id", issue: "Atendente inválido ou não localizado na base de dados." }]
        );
    };
};
