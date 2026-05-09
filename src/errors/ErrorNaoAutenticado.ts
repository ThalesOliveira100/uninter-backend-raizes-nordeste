import { AppError } from "./AppError";

export class ErrorNaoAutenticado extends AppError {
    constructor() {
        super(
            "Token de autenticação não fornecido.",
            401,
            "NAO_AUTENTICADO",
            [{ field: "authorization header", issue: "Ausente" }]
        );
    };
};
