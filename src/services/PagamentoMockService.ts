import { PrismaClient } from "@prisma/client";
import { ErrorPagamentoRecusado } from "../errors/ErrorPagamentoRecusado";
import { ErrorNotFound } from "../errors/ErrorNotFound";
import { StatusPedido } from "../enums/StatusPedido";
import { ErrorOperacaoInvalidaParaStatus } from "../errors/ErrorOperacaoInvalidaParaStatus";

const prisma = new PrismaClient();

export class PagamentoMockService {
    async processarPagamento(dados: any) {
        const { pedido_id, forma_pagamento } = dados;
        const pedido = await prisma.pedido.findUnique({
            where: { id: pedido_id }
        });

        if (!pedido) {
            throw new ErrorNotFound("pedido", pedido_id);
        };

        if (pedido.status !== StatusPedido.AGUARDANDO_PAGAMENTO) {
            throw new ErrorOperacaoInvalidaParaStatus("processar o pagamento", pedido.status as StatusPedido);
        };

        // Este é o mock, é gerado uma tentativa de 'pagamento' com 20% de chance de ser recusado.
        const aprovado = Math.random() > 0.2;

        if (aprovado) {
            await prisma.pedido.update({
                where: { id: Number(pedido_id) },
                data: { status: StatusPedido.PREPARANDO }
            });

            return {
                statusGateway: "APROVADO",
                transacaoId: `TXN-${Math.floor(Math.random() * 1000000)}`,
                mensagem: "Pagamento processado com sucesso.",
                pedido_id: pedido.id,
                novo_status: StatusPedido.PREPARANDO
            };
        } else {
            throw new ErrorPagamentoRecusado("Transação recusada pela operadora do cartão. Por favor, tente novamente com outra forma de pagamento.");
        };
    };
};
