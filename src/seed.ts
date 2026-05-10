import { PrismaClient } from "@prisma/client";
import { PerfilUsuario } from "./enums/PerfilUsuario";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
    const unidades = await prisma.unidade.createMany({
        data: [
            {
                nome: "Unidade Matriz",
                endereco: "Rua do Cuscuz, 123"
            },
            {
                nome: "Filial Pedro Leopoldo",
                endereco: "Avenida Comendador Antônio Alves, 123"
            }
        ]
    });

    const senhasCriptografadas = [
        await bcrypt.hash('hash123', 10),
        await bcrypt.hash('cli123', 10),
        await bcrypt.hash('caixa123', 10),
        await bcrypt.hash('cozinha123', 10),
        await bcrypt.hash('gerencia123', 10),
    ];

    const usuariosInseridos = await prisma.usuario.createMany({
        data: [
            {
                nome: "Thales Oliveira",
                email: "thales@uninter.com",
                senha_hash: senhasCriptografadas[0],
                perfil: PerfilUsuario.CLIENTE
            },
            {
                nome: "Usuario Cliente",
                email: "cliente@email.com",
                senha_hash: senhasCriptografadas[1],
                perfil: PerfilUsuario.CLIENTE
            },
            {
                nome: "Atendente Caixa",
                email: "caixa@raizes.com",
                senha_hash: senhasCriptografadas[2],
                perfil: PerfilUsuario.ATENDENTE
            },
            {
                nome: "Cozinha",
                email: "cozinha@raizes.com",
                senha_hash: senhasCriptografadas[3],
                perfil: PerfilUsuario.COZINHA
            },
            {
                nome: "Gerencia",
                email: "gerencia@raizes.com",
                senha_hash: senhasCriptografadas[4],
                perfil: PerfilUsuario.GERENTE
            }
        ]
    });

    const produtoInseridos = await prisma.produto.createMany({
        data: [
            {
                nome: "Tapioca de Carne de Sol",
                descricao: "Deliciosa",
                preco_base: 15.90
            },
            {
                nome: "Cuscuz Completo",
                descricao: "Acompanha ovo, calabresa e queijo",
                preco_base: 12.50
            },
            {
                nome: "Suco de Cajá",
                descricao: "Copo de 500ml, suco natural",
                preco_base: 8.00
            }
        ]
    });

    await prisma.estoque.createMany({
        data: [
            // --- Estoque da Unidade 1 ---
            { unidade_id: 1, produto_id: 1, quantidade: 50 },
            { unidade_id: 1, produto_id: 2, quantidade: 30 },
            { unidade_id: 1, produto_id: 3, quantidade: 0 },

            // --- Estoque da Unidade 2 ---
            { unidade_id: 2, produto_id: 1, quantidade: 15 },
            { unidade_id: 2, produto_id: 2, quantidade: 25 },
            { unidade_id: 2, produto_id: 3, quantidade: 10 },
        ]
    });

    console.log(
        `
        Seed finalizada. 
        Foram adicionadas ${unidades.count} unidades, ${produtoInseridos.count} produtos e ${usuariosInseridos.count} usuários.
        Usuários de ID 1 e 2: CLIENTE
        Usuário de ID 3: ATENDENTE
        Usuário de ID 4: COZINHA
        Usuário de ID 5: GERENTE
        `
    );
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());