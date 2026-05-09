import { PrismaClient } from "@prisma/client";
import { AcaoAuditoria } from "../enums/AcaoAuditoria";

const prisma = new PrismaClient();

export class AuditoriaService {
    async registrar(usuario_id: number, acao: AcaoAuditoria, detalhes?: string) {
        await prisma.logAuditoria.create({
            data: {
                usuario_id,
                acao,
                detalhes
            }
        });
    };
};
