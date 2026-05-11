--------------------------------------------------------------------------------
# API Raízes do Nordeste - Trilha Back-End

Esta é a API RESTful desenvolvida para o Projeto Multidisciplinar da rede "Raízes do Nordeste", implementando gestão multicanal de pedidos, controle de estoque por unidade, autenticação JWT baseada em perfis (Roles), simulação de pagamentos (Mock) e tratamento de dados conforme a LGPD.

## 🛠️ Requisitos
Para rodar este projeto localmente, você precisará ter instalado em sua máquina:
* Node.js (versão 18 ou superior recomendada)
* Gerenciador de pacotes (NPM ou Yarn)
* Banco de Dados (Configurado via Prisma ORM)

## ⚙️ Configuração das Variáveis de Ambiente
Antes de rodar o projeto, é necessário configurar as variáveis de ambiente:
1. Na raiz do projeto, faça uma cópia do arquivo `.env.example` e renomeie para `.env`.
2. Preencha as variáveis de ambiente necessárias no arquivo `.env` (como a `DATABASE_URL` e o `JWT_SECRET`).

## 📦 Instalação das Dependências
Abra o terminal na pasta raiz do projeto e execute o comando abaixo para instalar todas as dependências:
```bash
npm install
```

## 🗄️ Criação do Banco de Dados e Seed
Este projeto utiliza o Prisma ORM. Para criar as tabelas no banco de dados e popular os dados iniciais de teste (Unidades, Produtos, Estoques e Usuários), execute o seguinte comando:
```bash
npx prisma migrate reset
```
Caso apareça uma mensagem em vermelho `All data will be lost` tecle y sem medo.
*(Este comando apagará dados antigos, rodará as migrations e executará o arquivo `seed.ts` automaticamente).*

## 🚀 Como Iniciar a API
Com o banco configurado e atualizado, inicie o servidor em modo de desenvolvimento rodando:
```bash
npm run dev
```
O servidor estará rodando em: `http://localhost:3000/api`

## 📚 Acesso à Documentação (Swagger)
A documentação completa da API e seus endpoints (contratos de request/response) foi gerada utilizando Swagger/OpenAPI.
Com o servidor rodando, acesse a interface gráfica pelo seu navegador no endereço:
👉 **http://localhost:3000/api-docs**

## 🧪 Como Rodar os Testes
Os testes da aplicação foram construídos e exportados via Postman, contemplando cenários positivos e negativos.
1. Abra o seu Postman (ou Insomnia).
2. Importe o arquivo `colecao_postman.json` que se encontra na raiz deste repositório.
3. Configure o ambiente local e execute os testes organizados nas pastas para validar a autenticação, regras de estoque, travas de segurança e o fluxo de pedidos.
(Lembre-se de realizar a autenticação com cada perfil de usuário para obter os códigos de autenticação necessários para os testes.)

--------------------------------------------------------------------------------