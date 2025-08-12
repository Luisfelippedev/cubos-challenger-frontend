## Panda Filmes — Cubos.io Challenge (Frontend)

Aplicação frontend denominada Panda Filmes, permite o gerenciamento dos filmes favoritos do usuário. Construída com Next.js (App Router), React, Tailwind CSS e React Query. Inclui autenticação (signin/signup) e CRUD de filmes.

### 🚀 Deploy
- Produção: https://cubos-challenger-frontend.vercel.app

### Sobre
Frontend do teste técnico da Cubos.io para gerenciamento de filmes. Consome uma API externa configurada via variável de ambiente.

### Stack
- Next.js 15 (App Router) / React 19
- Tailwind CSS 4
- React Hook Form + Zod
- React Query (@tanstack/react-query)
- Axios

### Funcionalidades
- Autenticação: Signin e Signup
- Listagem paginada de filmes com filtros
- Criação, edição, detalhamento e exclusão de filmes
- Tema claro/escuro e UI responsiva

### Ambiente e Variáveis
Crie um arquivo `.env.local` na raiz com:

```env
API_BASE_URL=http://localhost:3001
```

Observações:
- `API_BASE_URL` é lida em `src/@core/services/api/axios.ts` e exposta via `next.config.mjs`.
- O token JWT é salvo em cookie `token` e enviado no header `Authorization` automaticamente.

### Como rodar localmente
1. Instale as dependências:
```bash
yarn
# ou
npm install
```
2. Execute o servidor de desenvolvimento:
```bash
yarn dev
# ou
npm run dev
```
3. Acesse: http://localhost:3001

Build/produção local:
```bash
npm run build && npm start
# ou
yarn build && yarn start
```

### Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

### Estrutura de pastas (resumo)
```
src/
  @core/
    components/...
    hooks/...
    providers/...
    services/api/axios.ts
    utils/...
  app/
    (public)/signin, signup
    (private)/movies
  features/
    auth/...
    movies/...
```
