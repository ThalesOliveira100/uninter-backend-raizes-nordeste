import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UsuarioRepository {
    async buscarPorId(id: number) {
        return await prisma.usuario.findUnique({
            where: { id }
        });
    };
};
