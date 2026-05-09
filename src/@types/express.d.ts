declare namespace Express {
    export interface Request {
        usuario: {
            id: number;
            perfil: string;
        };
    }
}