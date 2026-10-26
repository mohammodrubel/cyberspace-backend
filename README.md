# Cyberspace Backend

REST API backend for the Cyberspace platform, built with **Express 5**, **Prisma ORM**, and **PostgreSQL**. It serves products, categories, inquiries, news, partners, home-page content, banners, settings, and admin users to the Cyberspace frontend.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **ORM:** Prisma Client (`prisma-client-js`)
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh tokens), bcrypt password hashing
- **File storage:** Cloudinary (image/PDF uploads)
- **Validation:** Zod

## Data Model (Prisma)

| Model | Purpose |
|---|---|
| `Product` | Product catalog item (SKU, brand, category, price, stock), synced per `syncedAt` |
| `ProductTranslation` | Per-language (`AZ`/`EN`/`RU`) name + description for a product |
| `Inquiry` | Customer inquiry on a product (name, phone, message, status), optionally assigned to / submitted by a user |
| `User` | Admin/sales accounts with `ADMIN` or `SALES` role |
| `Setting` | Key/boolean app settings |
| `Banner` | Hero banner slides (title/subtitle/desc per language, CTA buttons, image, order, active flag) |
| `Partner` | Partner/brand logos shown on the site |
| `News` | News articles (slug, image, author, publish status/date) |
| `NewsTranslation` | Per-language title/category/excerpt/body for a news article |
| `HomeContent` | Arbitrary JSON content blocks for the home page, keyed by `key` |
| `Category` | Product categories (slug, per-language name, image, order) |

### Enums

- `Lang`: `AZ`, `EN`, `RU`
- `InquiryStatus`: `NEW`, `IN_PROGRESS`, `DONE`
- `Role`: `ADMIN`, `SALES`
- `NewsStatus`: `DRAFT`, `PUBLISHED`

### Relations

- `Product` → many `ProductTranslation`, many `Inquiry`
- `Inquiry` → one `Product`, optional `User` (`submittedBy`)
- `News` → many `NewsTranslation`

## API Routes

Mounted under the server base path, see `src/app/routes/index.ts`:

| Path | Module |
|---|---|
| `/auth` | Login/refresh/logout |
| `/user` | Admin user management |
| `/products` | Product catalog |
| `/inquiries` | Customer inquiries |
| `/settings` | App settings |
| `/banners` | Hero banners |
| `/partners` | Partner logos |
| `/news` | News articles |
| `/home-content` | Home page JSON content |
| `/upload` | Image/PDF upload (Cloudinary) |
| `/categories` | Product categories |

## Getting Started

### Prerequisites

- Node.js (LTS)
- PostgreSQL database (this project uses Neon)
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=9000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"

BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_TOKEN_SECRET="<random-secret>"
JWT_REFRESH_TOKEN_SECRET="<random-secret>"
JWT_ACCESS_TOKEN_EXPIRES_IN="7d"
JWT_REFRESH_TOKEN_EXPIRES_IN="90d"

STRIPE_SECRET_KEY="<stripe-secret-key>"
PUBLISH_KEY="<stripe-publishable-key>"
```

Never commit `.env` or real secrets to version control.

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Apply the schema to the database

```bash
npx prisma migrate dev
```

For deployment:

```bash
npx prisma migrate deploy
```

### 5. (Optional) Seed data

```bash
npm run seed
```

### 6. Run the server

```bash
npm run dev     # ts-node-dev, hot reload
npm run build   # compile to dist/
npm start        # run compiled dist/server.js
```

Server listens on `PORT` (default `9000`).

## Prisma Commands

```bash
npx prisma generate        # regenerate client
npx prisma migrate dev     # create + apply a dev migration
npx prisma migrate deploy  # apply migrations in production
npx prisma studio          # browse data in GUI
npx prisma validate        # validate schema.prisma
```

## Scripts

| Script | Description |
|---|---|
| `dev` | Run with `ts-node-dev` (hot reload) |
| `build` | Compile TypeScript to `dist/` |
| `start` | Run compiled server |
| `clean` | Remove `dist/` |
| `lint` / `lint:fix` | ESLint check/fix |
| `format` | Prettier format |
| `seed` | Run `seed/seed.ts` |

## Project Structure

```
src/
  app/
    config/          env config
    errors/          AppError, Zod error handler
    middlewares/      auth, validateRequest, error handlers
    modules/          auth, user, product, category, inquiry,
                      setting, banner, partner, news, homeContent, upload
    routes/           route aggregator
    utils/            response helpers, pagination, Cloudinary upload
  app.ts
  server.ts
prisma/
  schema.prisma
  migrations/
```
