import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UnidadeRepository {
    async buscarPorId(id: number) {
        return await prisma.unidade.findUnique({
            where: { id }
        });
    };
};
