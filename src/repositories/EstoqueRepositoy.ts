import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EstoqueRepository {
    async consultarPorUnidade(unidade_id: number) {
        return await prisma.estoque.findMany({
            where: {
                unidade_id: unidade_id,
                quantidade: { gt: 0 }
            },
            include: {
                produto: true
            }
        });
    };
};
