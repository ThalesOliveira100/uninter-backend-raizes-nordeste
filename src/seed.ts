import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const unidade = await prisma.unidade.create({
        data: {
            nome: "Unidade Matriz",
            endereco: "Rua do Cuscuz, 123"
        }
    });

    const cliente = await prisma.usuario.create({
        data: {
            nome: "Thales Oliveira",
            email: "thales@uninter.com",
            senha_hash: "hash123",
            perfil: "CLIENTE"
        }
    });

    const produto = await prisma.produto.create({
        data: {
            nome: "Tapioca de Carne de Sol",
            descricao: "Deliciosa",
            preco_base: 15.90
        }
    });

    console.log(`Seed finalizada. Unidade ID: ${unidade.id} | Cliente ID: ${cliente.id} | Produto ID: ${produto.id}`)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());