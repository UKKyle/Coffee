import path from 'node:path';
import {
  DefaultJobQueuePlugin,
  DefaultSchedulerPlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  LanguageCode,
  VendureConfig,
} from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DashboardPlugin } from '@vendure/dashboard/plugin';

const storefrontOrigins = (process.env.STOREFRONT_ORIGINS || 'http://localhost:5173,https://coffee.mrkyleoreilly.workers.dev')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

export const config: VendureConfig = {
  apiOptions: {
    port: +(process.env.PORT || 3000),
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    csrfPrevention: true,
    cors: {
      origin: storefrontOrigins,
      credentials: true,
    },
  },
  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME || 'superadmin',
      password: process.env.SUPERADMIN_PASSWORD || 'change-me-before-production',
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET || 'replace-this-cookie-secret-before-production',
    },
  },
  dbConnectionOptions: {
    type: 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrations: [path.join(__dirname, 'migrations/*.+(js|ts)')],
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'standard_dose',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  defaultLanguageCode: LanguageCode.en,
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: process.env.ASSET_UPLOAD_DIR || path.join(__dirname, '../static/assets'),
      assetUrlPrefix: process.env.ASSET_URL_PREFIX,
    }),
    DashboardPlugin.init({
      route: 'dashboard',
      appDir: path.join(__dirname, 'dashboard'),
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSchedulerPlugin.init(),
    DefaultSearchPlugin.init({
      bufferUpdates: false,
      indexStockStatus: true,
    }),
  ],
};
