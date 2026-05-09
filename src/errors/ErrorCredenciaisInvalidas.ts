import { AppError } from "./AppError";

export class ErrorCredenciaisInvalidas extends AppError {
    constructor() {
        super(
            "E-mail ou senha inválidos.",
            401,
            "CREDENCIAIS_INVALIDAS",
            [{ field: "body", issue: "As credenciais fornecidas não conferem com os registros." }]
        );
    }
};
