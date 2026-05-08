import { AppError } from "./AppError";

export class ErrorDadosIncompletos extends AppError {
  constructor(details: any[]) {
    super(
      "Dados obrigatórios ausentes.",
      422,
      "DADOS_INCOMPLETOS",
      details
    );
  };
};
