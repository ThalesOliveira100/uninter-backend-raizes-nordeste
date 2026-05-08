import { AppError } from "./AppError";

export class ErrorProdutoInvalido extends AppError {
    constructor(produto_id: number) {
        super(
            `Produto com o ID: ${produto_id} não localizado na base de dados.`,
            404,
            "PRODUTO_INVALIDO",
            [{ field: "produto_id", issue: "Produto inválido ou não localizado na base de dados." }]
        );
    };
};
