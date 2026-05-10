import { PrismaClient } from "@prisma/client";
import { ErrorDadosIncompletos } from "../errors/ErrorDadosIncompletos";
import { UnidadeRepository } from "../repositories/UnidadeRepository";
import { ErrorNotFound } from "../errors/ErrorNotFound";
import { EstoqueRepository } from "../repositories/EstoqueRepositoy";

const prisma = new PrismaClient();

export class EstoqueService {
    private unidadeRepository = new UnidadeRepository();
    private estoqueRepository = new EstoqueRepository();

    async listarCardapioDaUnidade(unidade_id: number) {
        await this.validarExistenciaNoBanco(unidade_id);

        if (!unidade_id) {
            throw new ErrorDadosIncompletos([{ field: "unidade_id", issue: "Ausente ou em branco" }]);
        };

        return await this.estoqueRepository.consultarPorUnidade(unidade_id);
    };

    private async validarExistenciaNoBanco(unidade_id: number): Promise<void> {
        const unidade = await this.unidadeRepository.buscarPorId(unidade_id);

        if (!unidade) {
            throw new ErrorNotFound("unidade", String(unidade_id));
        };
    };
};
