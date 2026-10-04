import { vendureDashboardPlugin } from '@vendure/dashboard/plugin';
import { defineConfig } from 'vite';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export default defineConfig({
  build: {
    outDir: join(__dirname, 'dist/dashboard'),
    emptyOutDir: false,
  },
  plugins: [
    vendureDashboardPlugin({
      vendureConfigPath: pathToFileURL('./src/vendure-config.ts'),
      api: process.env.NODE_ENV === 'production'
        ? { host: 'auto', port: 'auto' }
        : { host: 'http://localhost', port: 3000 },
      gqlOutputPath: './src/gql',
    }),
  ],
  resolve: {
    alias: {
      '@/gql': resolve(__dirname, './src/gql/graphql.ts'),
    },
  },
});
