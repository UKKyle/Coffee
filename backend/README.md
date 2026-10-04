# STANDARD DOSE commerce backend

Vendure 3.7.3 powers catalogue, inventory, active orders (cart), customers and the future checkout flow.

## Local development

1. Create a PostgreSQL database called `standard_dose`.
2. Copy `.env.example` to `.env` and set the database/auth values.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate the initial schema migration against an empty PostgreSQL database:
   ```bash
   npm run migrate:generate -- initial-schema
   ```
5. Start the API:
   ```bash
   npm run dev
   ```
6. In another terminal start the worker:
   ```bash
   npm run dev:worker
   ```

The Shop API is available at `http://localhost:3000/shop-api`.

## Connect the storefront

Set this in the storefront build environment:

```bash
VITE_VENDURE_SHOP_API=https://YOUR-VENDURE-HOST/shop-api
```

If this variable is absent, the Cloudflare storefront deliberately continues using the Phase 2 demo catalogue/cart. This means the public review site stays usable while the commerce service is being deployed.

## Production rules

- PostgreSQL only for production.
- Keep `DB_SYNCHRONIZE=false` and use committed migrations.
- Replace all example credentials/secrets.
- Run both the Vendure server and worker.
- Restrict `STOREFRONT_ORIGINS` to production domains.
- Replace the dummy payment handler when Stripe is connected.
- Move asset storage to object storage before catalogue images become production-critical.
