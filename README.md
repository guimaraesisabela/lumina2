# Lumina 🎬🎵

Sistema web de gestão para espaços culturais independentes, desenvolvido para centralizar o controle de eventos, sessões de cinema, shows ao vivo, artistas, salas e ingressos em uma única plataforma.

---

## Sobre o projeto

Espaços culturais independentes costumam gerenciar suas operações de forma fragmentada — planilhas, cadernos, sistemas diferentes para cada área. O Lumina nasce pra resolver isso.

Com ele, a equipe de um espaço cultural consegue cadastrar e organizar suas salas, programar sessões de cinema e shows, controlar a venda de ingressos e acompanhar a performance de cada evento, tudo em um só lugar.

---

## Funcionalidades

- **Gestão de Usuários** — cadastro e controle de administradores e organizadores de eventos, com perfis de acesso diferenciados
- **Gestão de Espaços** — cadastro de salas e ambientes do espaço cultural, com capacidade, tipo e status
- **Programação de Eventos** — cadastro de sessões de cinema e shows ao vivo, com data, horário, capacidade e valor do ingresso
- **Gestão de Atrações** — cadastro de filmes e artistas/bandas vinculados aos eventos
- **Controle de Ingressos** — venda e controle de ocupação por evento, com atualização automática de disponibilidade
- **Relatórios** — eventos mais populares, receita por tipo de evento e ocupação das salas

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
lumina/
├── src/                        # Front-end Angular
│   └── app/
│       ├── pages/
│       │   ├── user-management/        # Gestão de usuários
│       │   ├── espacos/                # Cadastro de salas e espaços
│       │   ├── eventos/                # Programação de eventos
│       │   ├── atracoes/               # Filmes e artistas
│       │   ├── ingressos/              # Controle de ingressos
│       │   └── reports/                # Relatórios
│       └── shared/
│           └── components/             # Componentes reutilizáveis
│
└── lumina-back/                # Back-end Node.js
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
git clone https://github.com/guimaraesisabela/lumina.git
cd lumina
```

### 2. Front-end

```bash
npm install
npm run dev
```

O front estará disponível em `http://localhost:4200`

### 3. Back-end

```bash
cd lumina-back
npm install
```

Crie o arquivo `.env` na raiz do `lumina-back` com o seguinte conteúdo:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lumina
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

### Espaços
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/espacos` | Lista todos os espaços | Autenticado |
| GET | `/espacos/:id` | Busca espaço por ID | Autenticado |
| POST | `/espacos` | Cria novo espaço | Admin |
| PUT | `/espacos/:id` | Edita espaço | Admin |
| DELETE | `/espacos/:id` | Remove espaço | Admin |

### Eventos
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/eventos` | Lista todos os eventos | Autenticado |
| GET | `/eventos/:id` | Busca evento por ID | Autenticado |
| GET | `/espacos/:id/eventos` | Lista eventos de um espaço | Autenticado |
| POST | `/eventos` | Cria novo evento | Admin |
| PUT | `/eventos/:id` | Edita evento | Admin |
| PATCH | `/eventos/:id/status` | Atualiza status do evento | Admin |

### Ingressos
| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| GET | `/ingressos` | Lista ingressos | Autenticado |
| POST | `/ingressos` | Registra venda de ingresso | Admin, Organizador |
| PATCH | `/ingressos/:id/cancelar` | Cancela ingresso | Admin |

> Endpoints de atrações e relatórios em desenvolvimento.

---

## Perfis de acesso

| Perfil | Permissões |
|--------|-----------|
| `admin` | Acesso total — gerencia usuários, espaços, eventos, atrações e relatórios |
| `organizador` | Acesso parcial — programa eventos e controla ingressos |

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
| Carlos Silva | carlos@lumina.com | 123456 | Admin |
| Fernanda Costa | fernanda@lumina.com | 123456 | Organizador |

> ⚠️ Altere as senhas em ambiente de produção.
