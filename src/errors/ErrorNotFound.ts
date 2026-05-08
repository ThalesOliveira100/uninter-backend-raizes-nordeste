import { AppError } from "./AppError";

export class ErrorNotFound extends AppError {
    constructor(recurso: string, id: string) {
        super(
            `O(a) ${recurso} não foi encontrado na base de dados`,
            404,
            "NOT_FOUND",
            [{ field: `${recurso}_id`, issue: `O(a) ${recurso} com o ID: ${id} não foi encontrado.` }]
        );
    };
};
