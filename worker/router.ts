import commerceWorker from './index';
import { adminResponse } from './admin';

type Env = {
  DB: any;
  ASSETS: { fetch(request: Request): Promise<Response> };
  ADMIN_TOTP_SECRET?: string;
};

const INTERNAL_HOST = 'internal.standarddose.co.uk';

function notFound() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow, noarchive',
    },
  });
}

function accessRequired() {
  return new Response('Access denied', {
    status: 403,
    headers: {
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow, noarchive',
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const isInternal = host === INTERNAL_HOST;
    const isAdminApi = url.pathname === '/api/admin' || url.pathname.startsWith('/api/admin/');
    const isAdminPath = url.pathname === '/admin' || url.pathname === '/admin/' || url.pathname.startsWith('/admin/');

    // Internal admin is available only on the dedicated hostname and only
    // after Cloudflare Access has authenticated the request.
    if (isInternal) {
      const accessAssertion = request.headers.get('cf-access-jwt-assertion');
      if (!accessAssertion) return accessRequired();

      if (url.pathname === '/' || isAdminPath) {
        return adminResponse();
      }

      if (isAdminApi) {
        return commerceWorker.fetch(request, env, ctx as any);
      }

      return notFound();
    }

    // Never expose admin UI or admin APIs from the public storefront host.
    if (isAdminPath || isAdminApi) {
      return notFound();
    }

    if (url.pathname.startsWith('/api/')) {
      return commerceWorker.fetch(request, env, ctx as any);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
