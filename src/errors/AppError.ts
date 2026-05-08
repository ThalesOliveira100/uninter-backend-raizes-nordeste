export abstract class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string;
    public readonly details: any[];

    /**
     * Classe genérica de erro do projeto, já configurada com todos os campos obrigatórios.
     */
    constructor(message: string, statusCode = 400, errorCode = "BAD_REQUEST", details: any[]) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
    }
}