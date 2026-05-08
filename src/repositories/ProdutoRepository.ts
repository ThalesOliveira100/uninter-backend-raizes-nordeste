import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProdutoRepository {
    async buscarPorId(id: number) {
        return await prisma.produto.findUnique({
            where: { id }
        });
    };
};
