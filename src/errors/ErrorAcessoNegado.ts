import { AppError } from "./AppError";

export class ErrorAcessoNegado extends AppError {
    constructor() {
        super(
            "Seu perfil não tem permissão para realizar esta ação.",
            403,
            "ACESSO_NEGADO",
            [{ field: "authorization header", issue: "Acesso negado" }]
        );
    };
};
