# Hospital Panel Backend

Express, TypeScript, Prisma, and PostgreSQL API for the Hospital admin panel.

## Local development

```bash
cd backend
cp .env.example .env
npm ci
npm run prisma:generate
npm run prisma:migrate
npm run admin:seed
npm run dev
```

Set `CLIENT_URLS` in `backend/.env` to the Hospital panel URL. For local development it can be `http://localhost:3000`.

## Production deployment

Deploy this folder as a Node service. Configure these variables as host secrets, never in Git:

| Variable | Required | Notes |
| --- | --- | --- |
| `NODE_ENV` | Yes | Set to `production`. |
| `DATABASE_URL` | Yes | Hosted PostgreSQL connection string. |
| `CLIENT_URLS` | Yes | Comma-separated Hospital panel origins, such as `https://admin.example.com`. |
| `JWT_SECRET` | Yes | Unique secret of at least 32 characters; generate with `openssl rand -base64 48`. |
| `JWT_EXPIRES_IN` | No | Defaults to `8h`. |
| `PORT` | Host dependent | Most providers supply this automatically. |

Use these deployment commands:

```bash
npm ci
npm run prisma:generate
npm run build
npm run prisma:deploy
npm start
```

Run `npm run admin:seed` once after migrations to create or update the initial administrator. It reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from secret environment variables.

The readiness endpoint is `GET /api/health`; it returns HTTP 503 if PostgreSQL is unavailable.
