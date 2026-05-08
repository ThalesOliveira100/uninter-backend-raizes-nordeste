import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PedidoRepository {
    async criar(dadosPedido: any) {
        return await prisma.pedido.create({
            data: dadosPedido,
            select: {
                id: true,
                status: true,
                canalPedido: true,
                total: true,
                total_desconto: true,
                data_criacao: true,
                cliente_id: true,
                atendente_id: true,
                unidade_id: true,
                itens: {
                    select: {
                        produto_id: true,
                        quantidade: true,
                        preco_unitario: true,
                        preco_desconto: true,
                        produto: {
                            select: {
                                nome: true,
                                descricao: true
                            }
                        }
                    }
                }
            },
        });
    };
};
