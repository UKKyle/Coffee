import 'reflect-metadata';
import 'dotenv/config';
import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

async function start() {
  if (process.env.RUN_MIGRATIONS !== 'false') {
    await runMigrations(config);
  }
  await bootstrap(config);
  console.log(`STANDARD DOSE Vendure Shop API running on port ${config.apiOptions.port}`);
}

start().catch(error => {
  console.error(error);
  process.exit(1);
});
