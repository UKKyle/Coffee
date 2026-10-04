import commerceWorker from './index';
import { adminResponse } from './admin';

type Env = {
  DB: any;
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // Admin must be handled by the Worker before the SPA fallback serves index.html.
    if (url.pathname === '/admin' || url.pathname === '/admin/' || url.pathname.startsWith('/admin/')) {
      return adminResponse();
    }

    return commerceWorker.fetch(request, env, ctx as any);
  },
} satisfies ExportedHandler<Env>;
