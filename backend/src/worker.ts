import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapWorker } from '@vendure/core';
import { config } from './vendure-config';

bootstrapWorker(config)
  .then(worker => worker.startJobQueue())
  .then(() => console.log('STANDARD DOSE Vendure worker started'))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
