# Sistema Final Web - Mineradora

Projeto com frontend em React, backend em Node.js/Express e banco de dados Supabase.

## Estrutura

```text
SistemaFinalWeb-nodejs/
├── frontend/   # React + Vite
└── backend/    # Node.js + Express + Supabase
```

## Banco de dados no Supabase

As tabelas esperadas são:

```sql
create table if not exists cidades (
  id serial primary key,
  nome text
);

create table if not exists equipamentos (
  id serial primary key,
  nome text,
  setor text
);

create table if not exists funcionarios (
  id serial primary key,
  nome text,
  cargo text
);

create table if not exists servicos (
  id serial primary key,
  descricao text,
  responsavel text
);
```

## Configurar backend

Entre na pasta `backend`, copie `.env.example` para `.env` e preencha:

```env
PORT=3001
SUPABASE_URL=https://ykwwsxrryvksgfomrytl.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY_AQUI
```

A `SUPABASE_SERVICE_ROLE_KEY` deve ficar apenas no backend. Não envie essa chave para o GitHub.

Instale e rode:

```bash
cd backend
npm install
npm run dev
```

## Configurar frontend

Entre na pasta `frontend`, copie `.env.example` para `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

Instale e rode:

```bash
cd frontend
npm install
npm run dev
```

## Fluxo da aplicação

```text
React → Node.js/Express → Supabase → PostgreSQL
```

O React não acessa mais o Supabase diretamente. Ele chama as rotas do backend:

- `GET /api/equipamentos`
- `POST /api/equipamentos`
- `PUT /api/equipamentos/:id`
- `DELETE /api/equipamentos/:id`

O mesmo padrão existe para `cidades`, `funcionarios` e `servicos`.

## Deploy

- Frontend: Netlify
- Backend: Render ou Railway

Ao publicar o backend, altere a variável do frontend:

```env
VITE_API_URL=https://URL-DO-SEU-BACKEND/api
```
