import { AppError } from "./AppError";

export class ErrorTokenInvalido extends AppError {
    constructor() {
        super(
            "Token expirado ou inválido",
            401,
            "TOKEN_INVALIDO",
            [{ field: "authorization header", issue: "Expirado ou mal formatado" }]
        );
    };
};
