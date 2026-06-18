# Lotiva 🏘️

Sistema web de gestão de loteamentos, desenvolvido para facilitar o controle de vendas, cadastro de corretores, geração automática de contratos e acompanhamento financeiro de empreendimentos imobiliários.

---

## Sobre o projeto

O Lotiva nasceu da necessidade de centralizar e digitalizar a gestão de loteamentos em uma única plataforma. Com ele, administradores e corretores conseguem acompanhar o status de cada lote, registrar vendas, gerar contratos automaticamente e monitorar a saúde financeira dos empreendimentos em tempo real.

---

## Funcionalidades

- **Gestão de Usuários** — cadastro e controle de administradores e corretores, com perfis de acesso diferenciados
- **Gestão de Loteamentos** — cadastro de empreendimentos com informações completas, documentos anexados e controle de status
- **Mapa de Lotes** — visualização interativa da disponibilidade de lotes por quadra e empreendimento
- **Registro de Vendas** — fluxo completo de venda com simulação de financiamento, parcelamento e geração de contrato
- **Relatórios Financeiros** — painel com vencimentos próximos, resumo de vendas, estoque por empreendimento e controle de inadimplência

---

## Tecnologias

### Front-end
- [Angular 21](https://angular.io/)
- TypeScript
- SCSS

### Back-end
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) com [Mongoose](https://mongoosejs.com/)
- JWT (autenticação)
- bcryptjs (hash de senhas)

---

## Estrutura do projeto

```
lotiva/
├── src/                        # Front-end Angular
│   └── app/
│       ├── pages/
│       │   ├── user-management/        # Gestão de usuários
│       │   ├── land-registration/      # Cadastro de loteamentos
│       │   ├── land-management/        # Hub de gestão do loteamento
│       │   ├── land-maps/              # Mapa de lotes
│       │   ├── sales-register/         # Registro de vendas
│       │   └── reports-financial/      # Relatórios financeiros
│       └── shared/
│           └── components/             # Componentes reutilizáveis
│               ├── button/
│               ├── dropdown/
│               ├── loteamento-card/
│               ├── modal/
│               ├── nav-menu/
│               ├── pagination/
│               ├── search-bar/
│               └── table/
│
└── lotiva-back/                # Back-end Node.js
    ├── config/
    │   └── db.js               # Configuração da conexão com MongoDB
    ├── src/
    │   ├── controllers/        # Lógica de negócio
    │   ├── middlewares/        # Autenticação e autorização
    │   ├── models/             # Schemas Mongoose
    │   ├── routes/             # Definição dos endpoints
    │   └── seed.js             # Script para popular o banco
    ├── .env                    # Variáveis de ambiente (não versionado)
    ├── package.json
    └── server.js               # Ponto de entrada do servidor
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Community](https://www.mongodb.com/try/download/community) rodando localmente
- [Angular CLI](https://angular.io/cli) v21+

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/guimaraesisabela/lotiva.git
cd lotiva
```

### 2. Front-end

```bash
npm install
npm run dev
```

O front estará disponível em `http://localhost:4200`

### 3. Back-end

```bash
cd lotiva-back
npm install
```

Crie o arquivo `.env` na raiz do `lotiva-back` com o seguinte conteúdo:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lotiva
JWT_SECRET=sua_chave_secreta_aqui
```

Popule o banco com dados iniciais:

```bash
node src/seed.js
```

Suba o servidor:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

---

## Endpoints da API

### Autenticação
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| POST | `/auth/login` | Login e geração de token JWT | Público |

### Usuários
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/usuarios` | Lista todos os usuários | Autenticado |
| GET | `/usuarios/:id` | Busca usuário por ID | Autenticado |
| POST | `/usuarios` | Cria novo usuário | Admin |
| PUT | `/usuarios/:id` | Edita usuário | Admin |
| PATCH | `/usuarios/:id/desativar` | Desativa usuário | Admin |

> Rotas em desenvolvimento: loteamentos, lotes, vendas, clientes, contratos e relatórios financeiros.

---

## Perfis de acesso

| Perfil | Permissões |
|--------|-----------|
| `admin` | Acesso total — gerencia usuários, loteamentos, lotes, vendas e relatórios |
| `corretor` | Acesso parcial — registra vendas e gerencia clientes |

---

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `PORT` | Porta do servidor (padrão: 3000) |
| `MONGODB_URI` | String de conexão com o MongoDB |
| `JWT_SECRET` | Chave secreta para assinatura dos tokens JWT |

---

## Usuários padrão (seed)

Após rodar o `seed.js`, os seguintes usuários estarão disponíveis:

| Nome | Email | Senha | Perfil |
|------|-------|-------|--------|
| Carlos Silva | carlos@lotiva.com | 123456 | Admin |
| Fernanda Costa | fernanda@lotiva.com | 123456 | Corretor |

> ⚠️ Altere as senhas em ambiente de produção.
