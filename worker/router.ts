import commerceWorker from './index';
import { adminResponse } from './admin';

type Env = {
  DB: any;
  ASSETS: { fetch(request: Request): Promise<Response> };
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === '/admin' || url.pathname === '/admin/' || url.pathname.startsWith('/admin/')) {
      return adminResponse();
    }

    if (url.pathname.startsWith('/api/')) {
      return commerceWorker.fetch(request, env, ctx as any);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
