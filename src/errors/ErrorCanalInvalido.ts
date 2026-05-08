import { AppError } from "./AppError";

export class ErrorCanalInvalido extends AppError {
    constructor(canalRecebido: string) {
        super(
            "A propriedade canalPedido é de preenchimento obrigatório, e o valor deve ser um dos seguintes: [APP, TOTEM, BALCAO, PICKUP, WEB].",
            400,
            "CANAL_INVALIDO",
            [{ field: "canalPedido", issue: `Valor recebido fora do padrão Enum: ${canalRecebido || "Nenhum"}` }]
        );
    };
};
