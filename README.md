# Sistema Integrado da Mineradora

Projeto final de Front-end utilizando React, Vite, Supabase e Netlify.

## O que o sistema possui

- Página inicial
- Cadastro, listagem, edição e exclusão de cidades
- Cadastro, listagem, edição e exclusão de equipamentos
- Cadastro, listagem, edição e exclusão de funcionários
- Cadastro, listagem, edição e exclusão de serviços
- Integração com banco de dados Supabase

## Tabelas usadas no Supabase

```sql
CREATE TABLE cidades (
  id serial primary key,
  nome text
);

CREATE TABLE equipamentos (
  id serial primary key,
  nome text,
  setor text
);

CREATE TABLE funcionarios (
  id serial primary key,
  nome text,
  cargo text
);

CREATE TABLE servicos (
  id serial primary key,
  descricao text,
  responsavel text
);
```

## Como configurar

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
```

Depois rode:

```bash
npm install
npm run dev
```

## Publicação no Netlify

Configurações:

- Build command: `npm run build`
- Publish directory: `dist`

No Netlify, cadastre também as variáveis de ambiente:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Observação

Este projeto usa React conectado diretamente ao Supabase, sem backend separado, pois o objetivo da entrega é apresentar o front-end funcionando com banco de dados real e hospedagem no Netlify.
