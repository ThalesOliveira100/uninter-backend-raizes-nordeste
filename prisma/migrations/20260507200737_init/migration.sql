-- CreateTable
CREATE TABLE "Unidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "pontos_fidelidade" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco_base" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    CONSTRAINT "Estoque_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "Unidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "canalPedido" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    "total_desconto" DECIMAL NOT NULL,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" DATETIME NOT NULL,
    "data_cancelamento" DATETIME,
    "cliente_id" INTEGER NOT NULL,
    "atendente_id" INTEGER,
    "unidade_id" INTEGER NOT NULL,
    CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_atendente_id_fkey" FOREIGN KEY ("atendente_id") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pedido_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "Unidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL NOT NULL,
    "preco_desconto" DECIMAL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    CONSTRAINT "ItemPedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemPedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
