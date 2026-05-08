import { AppError } from "./AppError";

export class ErrorUsuarioSemPermissaoParaAlterarStatus extends AppError {
    constructor(usuario_id: number) {
        super(
            `Usuário com o ID: ${usuario_id} não permitido para alterar status`,
            405,
            "USUARIO_SEM_PERMISSAO_PARA_ALTERAR_STATUS",
            [{ field: "usuario_id", issue: "Usuário sem permissão para alterar status." }]
        );
    };
};
