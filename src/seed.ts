import { PrismaClient } from "@prisma/client";
import { PerfilUsuario } from "./enums/PerfilUsuario";
const prisma = new PrismaClient();

async function main() {
    const unidade = await prisma.unidade.create({
        data: {
            nome: "Unidade Matriz",
            endereco: "Rua do Cuscuz, 123"
        }
    });

    const usuariosInseridos = await prisma.usuario.createMany({
        data: [
            {
                nome: "Thales Oliveira",
                email: "thales@uninter.com",
                senha_hash: "hash123",
                perfil: PerfilUsuario.CLIENTE
            },
            {
                nome: "Usuario Cliente",
                email: "cliente@email.com",
                senha_hash: "cli123",
                perfil: PerfilUsuario.CLIENTE
            },
            {
                nome: "Atendente Caixa",
                email: "caixa@raizes.com",
                senha_hash: "caixa123",
                perfil: PerfilUsuario.ATENDENTE
            },
            {
                nome: "Cozinha",
                email: "cozinha@raizes.com",
                senha_hash: "cozinha123",
                perfil: PerfilUsuario.COZINHA
            },
            {
                nome: "Gerencia",
                email: "gerencia@raizes.com",
                senha_hash: "gerencia123",
                perfil: PerfilUsuario.GERENTE
            }
        ]
    })

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

    console.log(
        `
        Seed finalizada. 
        Foram adicionadas ${unidade.id} unidades, ${produtoInseridos.count} produtos e ${usuariosInseridos.count} usuários.
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