type D1Database = any;

type Env = {
  DB: D1Database;
};

const ADMIN_PASSWORD_SHA256 = 'c65c1e5b717230deba8add4273766ab9d8fb5ed14788a7181bed7defac103704';
const SESSION_HOURS = 8;
const CART_COOKIE = 'sd_cart';
const ADMIN_COOKIE = 'sd_admin';

const seedProducts = [
  ['puck-screen','puck-screen','58mm-puck-screen','58mm Puck Screen',595,'Best seller','Espresso','A fine stainless screen designed to distribute water more evenly and keep the group head cleaner.','58mm baskets','screen','in'],
  ['wdt-tool','wdt-tool','needle-wdt-tool','Needle WDT Tool',995,'Dial-in essential','Espresso','A weighted, fine-needle distribution tool for breaking clumps and levelling your puck before tamping.','All espresso baskets','wdt','in'],
  ['dosing-funnel','dosing-funnel','magnetic-dosing-funnel','Magnetic Dosing Funnel',895,'Under £10','Espresso','Low-profile magnetic dosing funnel that keeps grounds in the basket while you grind and distribute.','58mm portafilters','funnel','in'],
  ['dosing-cup','dosing-cup','stainless-dosing-cup','Stainless Dosing Cup',1195,'Setup upgrade','Setup','Brushed stainless dosing cup with a clean lip for transferring grounds without mess.','58mm workflows','cup','in'],
  ['latte-glass','latte-glass','ribbed-iced-latte-glass','Ribbed Iced Latte Glass',795,'Just landed','Iced','Tall ribbed glass for iced lattes, cold brew and anything layered.','','glass','low'],
  ['syrup-pump','syrup-pump','minimal-syrup-pump','Minimal Syrup Pump',495,'£5 shelf','Iced','Simple reusable syrup pump sized for compact coffee stations.','','pump','in'],
  ['matcha-whisk','matcha-whisk','bamboo-matcha-whisk','Bamboo Matcha Whisk',1295,'Ritual essential','Matcha','Traditional bamboo whisk for smoother matcha and a cleaner morning ritual.','','whisk','in'],
  ['house-beans','house-beans','house-espresso-250g','House Espresso — 250g',1095,'Repeat order','Coffee','A balanced everyday espresso profile selected for milk drinks and straight shots.','','bag','in'],
] as const;

const schema = `
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  variant_id TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price_pence INTEGER NOT NULL,
  compare_at_pence INTEGER,
  tag TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  compatibility TEXT,
  visual TEXT NOT NULL DEFAULT 'cup',
  stock_status TEXT NOT NULL DEFAULT 'in',
  image_url TEXT,
  stock_on_hand INTEGER NOT NULL DEFAULT 0,
  supplier TEXT,
  supplier_sku TEXT,
  supplier_url TEXT,
  cost_pence INTEGER,
  fulfilment_method TEXT,
  lead_time TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS carts (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS cart_items (
  cart_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (cart_id, product_id)
);
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  csrf_token TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  window_started_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS admin_security (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  approved_email TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  totp_secret TEXT NOT NULL,
  configured_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT OR IGNORE INTO settings(key,value) VALUES ('standard_delivery_pence','399');
INSERT OR IGNORE INTO settings(key,value) VALUES ('free_delivery_threshold_pence','3000');
`;

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'no-store');
  return new Response(JSON.stringify(data), { ...init, headers });
}

function parseCookies(request: Request) {
  const out: Record<string,string> = {};
  for (const part of (request.headers.get('cookie') || '').split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k) out[k] = decodeURIComponent(rest.join('='));
  }
  return out;
}

function secureCookie(name: string, value: string, maxAge: number) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,'0')).join('');
}

function bytesToHex(bytes: Uint8Array) {
  return [...bytes].map(b => b.toString(16).padStart(2,'0')).join('');
}

function randomHex(bytes = 16) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return bytesToHex(data);
}

async function passwordHash(password: string, saltHex: string) {
  const salt = new Uint8Array((saltHex.match(/.{1,2}/g) || []).map(x => parseInt(x, 16)));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', salt, iterations:210000, hash:'SHA-256' }, key, 256);
  return bytesToHex(new Uint8Array(bits));
}

const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function randomBase32(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i=0;i<length;i++) out += BASE32[bytes[i] & 31];
  return out;
}

function base32Decode(input: string) {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g,'');
  let bits = '';
  for (const ch of clean) bits += BASE32.indexOf(ch).toString(2).padStart(5,'0');
  const out: number[] = [];
  for (let i=0;i+8<=bits.length;i+=8) out.push(parseInt(bits.slice(i,i+8),2));
  return new Uint8Array(out);
}

async function totpCode(secret: string, counter: number) {
  const key = await crypto.subtle.importKey('raw', base32Decode(secret), { name:'HMAC', hash:'SHA-1' }, false, ['sign']);
  const msg = new ArrayBuffer(8);
  const view = new DataView(msg);
  view.setUint32(0, Math.floor(counter / 0x100000000));
  view.setUint32(4, counter >>> 0);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, msg));
  const offset = sig[sig.length - 1] & 15;
  const bin = ((sig[offset] & 0x7f) << 24) | ((sig[offset+1] & 0xff) << 16) | ((sig[offset+2] & 0xff) << 8) | (sig[offset+3] & 0xff);
  return String(bin % 1000000).padStart(6,'0');
}

async function verifyTotp(secret: string, code: string) {
  if (!/^\d{6}$/.test(code)) return false;
  const counter = Math.floor(Date.now()/30000);
  for (const delta of [-1,0,1]) if (await totpCode(secret, counter+delta) === code) return true;
  return false;
}

async function getSecurity(db: D1Database) {
  return await db.prepare('SELECT approved_email,password_salt,password_hash,totp_secret FROM admin_security WHERE id=1').first();
}

async function ensureSchema(db: D1Database) {
  const statements = schema
    .split(';')
    .map(statement => statement.trim())
    .filter(Boolean)
    .map(statement => db.prepare(statement));
  if (statements.length) await db.batch(statements);
  const row = await db.prepare('SELECT COUNT(*) AS c FROM products').first();
  if (Number(row?.c || 0) === 0) {
    const stmt = db.prepare(`INSERT INTO products
      (id,variant_id,slug,name,price_pence,tag,category,description,compatibility,visual,stock_status,stock_on_hand,sort_order)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    await db.batch(seedProducts.map((p, i) => stmt.bind(p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8] || null,p[9],p[10],p[10] === 'out' ? 0 : p[10] === 'low' ? 6 : 50,i)));
  }
}

function mapProduct(row: any) {
  return {
    id: row.id,
    variantId: row.variant_id,
    slug: row.slug,
    name: row.name,
    price: row.price_pence / 100,
    compareAt: row.compare_at_pence == null ? undefined : row.compare_at_pence / 100,
    tag: row.tag,
    category: row.category,
    description: row.description,
    compatibility: row.compatibility || undefined,
    visual: row.visual,
    stock: row.stock_status,
    image: row.image_url || undefined,
    stockOnHand: row.stock_on_hand,
  };
}

async function getOrCreateCart(request: Request, env: Env) {
  const cookies = parseCookies(request);
  let id = cookies[CART_COOKIE];
  let fresh = false;
  if (!id || !(await env.DB.prepare('SELECT id FROM carts WHERE id=?').bind(id).first())) {
    id = crypto.randomUUID();
    fresh = true;
    await env.DB.prepare('INSERT INTO carts(id) VALUES (?)').bind(id).run();
  }
  return { id, fresh };
}

async function buildCart(cartId: string, env: Env) {
  const { results = [] } = await env.DB.prepare(`SELECT ci.product_id, ci.quantity, p.*
    FROM cart_items ci JOIN products p ON p.id=ci.product_id
    WHERE ci.cart_id=? AND p.enabled=1 ORDER BY p.sort_order`).bind(cartId).all();
  const lines = results.map((r: any) => ({
    lineId: r.product_id,
    product: mapProduct(r),
    qty: r.quantity,
    lineTotal: (r.price_pence * r.quantity) / 100,
  }));
  const subtotalPence = results.reduce((sum: number, r: any) => sum + r.price_pence * r.quantity, 0);
  const totalQuantity = results.reduce((sum: number, r: any) => sum + r.quantity, 0);
  const deliveryRow = await env.DB.prepare("SELECT value FROM settings WHERE key='standard_delivery_pence'").first();
  const freeRow = await env.DB.prepare("SELECT value FROM settings WHERE key='free_delivery_threshold_pence'").first();
  const deliveryPence = Number(deliveryRow?.value || 399);
  const thresholdPence = Number(freeRow?.value || 3000);
  const shippingPence = subtotalPence === 0 || subtotalPence >= thresholdPence ? 0 : deliveryPence;
  return {
    id: cartId,
    lines,
    totalQuantity,
    subtotal: subtotalPence / 100,
    shipping: shippingPence / 100,
    total: (subtotalPence + shippingPence) / 100,
  };
}

async function getAdminSession(request: Request, env: Env) {
  const token = parseCookies(request)[ADMIN_COOKIE];
  if (!token) return null;
  const row = await env.DB.prepare('SELECT token, csrf_token, expires_at FROM admin_sessions WHERE token=?').bind(token).first();
  if (!row || Date.parse(row.expires_at) <= Date.now()) return null;
  return row;
}

async function requireAdmin(request: Request, env: Env, csrf = false) {
  const session = await getAdminSession(request, env);
  if (!session) return { error: json({ error:'Unauthorized' }, { status:401 }) };
  if (csrf && request.headers.get('x-csrf-token') !== session.csrf_token) {
    return { error: json({ error:'Invalid CSRF token' }, { status:403 }) };
  }
  return { session };
}

async function loginRateKey(request: Request) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  return await sha256(ip);
}

async function handleApi(request: Request, env: Env) {
  await ensureSchema(env.DB);
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  if (path === '/api/products' && method === 'GET') {
    const { results = [] } = await env.DB.prepare('SELECT * FROM products WHERE enabled=1 ORDER BY sort_order, name').all();
    return json({ products: results.map(mapProduct) });
  }

  if (path === '/api/shipping' && method === 'GET') {
    const { results = [] } = await env.DB.prepare("SELECT key,value FROM settings WHERE key IN ('standard_delivery_pence','free_delivery_threshold_pence')").all();
    const settings = Object.fromEntries(results.map((r:any) => [r.key, Number(r.value)]));
    return json({ standardDelivery: (settings.standard_delivery_pence || 399)/100, freeDeliveryThreshold: (settings.free_delivery_threshold_pence || 3000)/100 });
  }

  if (path === '/api/cart' && method === 'GET') {
    const cart = await getOrCreateCart(request, env);
    const response = json(await buildCart(cart.id, env));
    if (cart.fresh) response.headers.append('set-cookie', secureCookie(CART_COOKIE, cart.id, 60*60*24*30));
    return response;
  }

  if (path === '/api/cart/items' && method === 'POST') {
    const body = await request.json() as any;
    const productId = String(body.productId || '');
    const quantity = Math.max(1, Math.min(25, Number(body.quantity || 1)));
    const product = await env.DB.prepare('SELECT id, stock_status, stock_on_hand FROM products WHERE id=? AND enabled=1').bind(productId).first();
    if (!product || product.stock_status === 'out' || product.stock_on_hand <= 0) return json({ error:'Product unavailable' }, { status:409 });
    const cart = await getOrCreateCart(request, env);
    await env.DB.prepare(`INSERT INTO cart_items(cart_id,product_id,quantity) VALUES (?,?,?)
      ON CONFLICT(cart_id,product_id) DO UPDATE SET quantity=MIN(quantity+excluded.quantity,25)`).bind(cart.id, productId, quantity).run();
    await env.DB.prepare('UPDATE carts SET updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(cart.id).run();
    const response = json(await buildCart(cart.id, env));
    if (cart.fresh) response.headers.append('set-cookie', secureCookie(CART_COOKIE, cart.id, 60*60*24*30));
    return response;
  }

  const cartLineMatch = path.match(/^\/api\/cart\/items\/([^/]+)$/);
  if (cartLineMatch && (method === 'PATCH' || method === 'DELETE')) {
    const cart = await getOrCreateCart(request, env);
    const productId = decodeURIComponent(cartLineMatch[1]);
    if (method === 'DELETE') {
      await env.DB.prepare('DELETE FROM cart_items WHERE cart_id=? AND product_id=?').bind(cart.id, productId).run();
    } else {
      const body = await request.json() as any;
      const quantity = Math.max(0, Math.min(25, Number(body.quantity || 0)));
      if (quantity <= 0) await env.DB.prepare('DELETE FROM cart_items WHERE cart_id=? AND product_id=?').bind(cart.id, productId).run();
      else await env.DB.prepare('UPDATE cart_items SET quantity=? WHERE cart_id=? AND product_id=?').bind(quantity, cart.id, productId).run();
    }
    const response = json(await buildCart(cart.id, env));
    if (cart.fresh) response.headers.append('set-cookie', secureCookie(CART_COOKIE, cart.id, 60*60*24*30));
    return response;
  }

  if (path === '/api/admin/login' && method === 'POST') {
    const key = await loginRateKey(request);
    const attempt = await env.DB.prepare('SELECT count, window_started_at FROM login_attempts WHERE key=?').bind(key).first();
    const now = Date.now();
    if (attempt && now - Date.parse(attempt.window_started_at) < 15*60*1000 && attempt.count >= 5) {
      return json({ error:'Too many login attempts. Try again later.' }, { status:429 });
    }

    const body = await request.json() as any;
    const security = await getSecurity(env.DB);
    let valid = false;

    if (security) {
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const code = String(body.code || '').replace(/\s+/g,'');
      const hash = await passwordHash(password, security.password_salt);
      valid = email === String(security.approved_email).toLowerCase()
        && hash === security.password_hash
        && await verifyTotp(security.totp_secret, code);
    } else {
      const hash = await sha256(String(body.password || ''));
      valid = hash === ADMIN_PASSWORD_SHA256;
    }

    if (!valid) {
      const sameWindow = attempt && now - Date.parse(attempt.window_started_at) < 15*60*1000;
      const windowStart = sameWindow ? attempt.window_started_at : new Date().toISOString();
      const count = sameWindow ? Number(attempt.count)+1 : 1;
      await env.DB.prepare(`INSERT INTO login_attempts(key,count,window_started_at) VALUES (?,?,?)
        ON CONFLICT(key) DO UPDATE SET count=excluded.count, window_started_at=excluded.window_started_at`).bind(key,count,windowStart).run();
      return json({ error:'Invalid email, password or authenticator code' }, { status:401 });
    }

    await env.DB.prepare('DELETE FROM login_attempts WHERE key=?').bind(key).run();
    const token = crypto.randomUUID() + crypto.randomUUID();
    const csrf = crypto.randomUUID();
    const expires = new Date(Date.now()+SESSION_HOURS*60*60*1000).toISOString();
    await env.DB.prepare('INSERT INTO admin_sessions(token,csrf_token,expires_at) VALUES (?,?,?)').bind(token,csrf,expires).run();
    const response = json({ ok:true, csrfToken:csrf, setupRequired:!security });
    response.headers.append('set-cookie', secureCookie(ADMIN_COOKIE, token, SESSION_HOURS*60*60));
    return response;
  }

  if (path === '/api/admin/security/bootstrap' && method === 'GET') {
    const auth = await requireAdmin(request, env);
    if (auth.error) return auth.error;
    const security = await getSecurity(env.DB);
    if (security) return json({ configured:true });
    const secret = randomBase32(32);
    return json({ configured:false, secret });
  }

  if (path === '/api/admin/security/setup' && method === 'POST') {
    const auth = await requireAdmin(request, env, true);
    if (auth.error) return auth.error;
    if (await getSecurity(env.DB)) return json({ error:'Security is already configured' }, { status:409 });

    const body = await request.json() as any;
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const secret = String(body.secret || '').replace(/\s+/g,'').toUpperCase();
    const code = String(body.code || '').replace(/\s+/g,'');

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error:'Enter a valid approved email address' }, { status:400 });
    if (password.length < 14) return json({ error:'Use a password of at least 14 characters' }, { status:400 });
    if (!/^[A-Z2-7]{24,64}$/.test(secret)) return json({ error:'Invalid authenticator secret' }, { status:400 });
    if (!(await verifyTotp(secret, code))) return json({ error:'Authenticator code is not valid' }, { status:400 });

    const salt = randomHex(16);
    const hash = await passwordHash(password, salt);
    await env.DB.prepare(`INSERT INTO admin_security(id,approved_email,password_salt,password_hash,totp_secret)
      VALUES (1,?,?,?,?)`).bind(email,salt,hash,secret).run();
    await env.DB.prepare('DELETE FROM admin_sessions WHERE token<>?').bind(auth.session.token).run();
    return json({ ok:true, approvedEmail:email });
  }

  if (path === '/api/admin/session' && method === 'GET') {
    const auth = await requireAdmin(request, env);
    if (auth.error) return auth.error;
    const security = await getSecurity(env.DB);
    return json({ authenticated:true, csrfToken:auth.session.csrf_token, setupRequired:!security, approvedEmail:security?.approved_email || null });
  }

  if (path === '/api/admin/logout' && method === 'POST') {
    const auth = await requireAdmin(request, env, true);
    if (auth.error) return auth.error;
    await env.DB.prepare('DELETE FROM admin_sessions WHERE token=?').bind(auth.session.token).run();
    const response = json({ ok:true });
    response.headers.append('set-cookie', secureCookie(ADMIN_COOKIE, '', 0));
    return response;
  }

  if (path === '/api/admin/dashboard' && method === 'GET') {
    const auth = await requireAdmin(request, env);
    if (auth.error) return auth.error;
    const products = await env.DB.prepare('SELECT COUNT(*) AS c FROM products WHERE enabled=1').first();
    const low = await env.DB.prepare("SELECT COUNT(*) AS c FROM products WHERE enabled=1 AND (stock_status='low' OR stock_on_hand<=10)").first();
    return json({ products:Number(products?.c||0), lowStock:Number(low?.c||0), orders:0, revenue:0 });
  }

  if (path === '/api/admin/products' && method === 'GET') {
    const auth = await requireAdmin(request, env);
    if (auth.error) return auth.error;
    const { results = [] } = await env.DB.prepare('SELECT * FROM products ORDER BY sort_order, name').all();
    return json({ products:results.map((r:any)=>({ ...mapProduct(r), enabled:Boolean(r.enabled), supplier:r.supplier, supplierSku:r.supplier_sku, supplierUrl:r.supplier_url, cost:r.cost_pence == null ? null : r.cost_pence/100, fulfilmentMethod:r.fulfilment_method, leadTime:r.lead_time })) });
  }

  const adminProductMatch = path.match(/^\/api\/admin\/products\/([^/]+)$/);
  if (adminProductMatch && method === 'PATCH') {
    const auth = await requireAdmin(request, env, true);
    if (auth.error) return auth.error;
    const id = decodeURIComponent(adminProductMatch[1]);
    const body = await request.json() as any;
    const existing = await env.DB.prepare('SELECT * FROM products WHERE id=?').bind(id).first();
    if (!existing) return json({ error:'Not found' }, { status:404 });
    const next = {
      name: body.name ?? existing.name,
      price_pence: body.price == null ? existing.price_pence : Math.round(Number(body.price)*100),
      tag: body.tag ?? existing.tag,
      category: body.category ?? existing.category,
      description: body.description ?? existing.description,
      compatibility: body.compatibility ?? existing.compatibility,
      stock_status: body.stock ?? existing.stock_status,
      stock_on_hand: body.stockOnHand == null ? existing.stock_on_hand : Math.max(0, Number(body.stockOnHand)),
      image_url: body.image ?? existing.image_url,
      supplier: body.supplier ?? existing.supplier,
      supplier_sku: body.supplierSku ?? existing.supplier_sku,
      supplier_url: body.supplierUrl ?? existing.supplier_url,
      cost_pence: body.cost == null ? existing.cost_pence : Math.round(Number(body.cost)*100),
      fulfilment_method: body.fulfilmentMethod ?? existing.fulfilment_method,
      lead_time: body.leadTime ?? existing.lead_time,
      enabled: body.enabled == null ? existing.enabled : body.enabled ? 1 : 0,
    };
    await env.DB.prepare(`UPDATE products SET name=?,price_pence=?,tag=?,category=?,description=?,compatibility=?,stock_status=?,stock_on_hand=?,image_url=?,supplier=?,supplier_sku=?,supplier_url=?,cost_pence=?,fulfilment_method=?,lead_time=?,enabled=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`)
      .bind(next.name,next.price_pence,next.tag,next.category,next.description,next.compatibility,next.stock_status,next.stock_on_hand,next.image_url,next.supplier,next.supplier_sku,next.supplier_url,next.cost_pence,next.fulfilment_method,next.lead_time,next.enabled,id).run();
    const row = await env.DB.prepare('SELECT * FROM products WHERE id=?').bind(id).first();
    return json({ product:mapProduct(row) });
  }

  return json({ error:'Not found' }, { status:404 });
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      try {
        return await handleApi(request, env);
      } catch (error) {
        console.error(error);
        return json({ error:'Internal server error' }, { status:500 });
      }
    }
    return new Response(null, { status:404 });
  },
} satisfies ExportedHandler<Env>;
