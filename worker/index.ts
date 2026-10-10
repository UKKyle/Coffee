type D1Database = any;

type Env = {
  DB: D1Database;
  ADMIN_TOTP_SECRET?: string;
};

const SESSION_HOURS = 8;
const CART_COOKIE = 'sd_cart';
const ADMIN_COOKIE = 'sd_admin';

const launchCatalogue = [
  ['a1-shot-glass-60','A1-SHOTGLASS60','espresso-shot-glass-60ml','Espresso Shot Glass — 60ml',595,'','Espresso','A simple 60ml shot glass for pulling and measuring espresso.','','glass',239,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-shot-pot-60','A1-SHOTPOT60','stainless-espresso-shot-cup-60ml','Stainless Espresso Shot Cup — 60ml',695,'','Espresso','Compact stainless shot cup for espresso, split shots and measuring output.','','cup',299,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-shot-pot-90','A1-SHOTPOT90','stainless-espresso-shot-cup-90ml','Stainless Espresso Shot Cup — 90ml',795,'','Espresso','A 90ml stainless shot cup with extra room for longer pulls and split shots.','','cup',329,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-shot-pot-180','A1-SHOTPOT180','stainless-espresso-shot-cup-180ml','Stainless Espresso Shot Cup — 180ml',795,'','Espresso','A larger stainless shot cup for espresso, milk prep and small serves.','','cup',359,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-tamper-48-57','TAMPER01','dual-size-espresso-tamper-48-57mm','Dual-Size Espresso Tamper — 48/57mm',595,'','Espresso','Lightweight double-ended tamper with 48mm and 57mm bases for domestic espresso baskets.','48mm / 57mm','cup',204,'A1 Coffee','TAMPER01','https://a1coffee.net/products/coffee-tamper-48mm-57mm','Manual dropship','UK delivery'],
  ['a1-frothing-thermometer','THERMO','milk-frothing-thermometer','Milk Frothing Thermometer',1295,'','Espresso','Clip-on milk thermometer for monitoring steaming temperature in jugs up to 1 litre.','Milk jugs up to 1L','cup',839,'A1 Coffee','THERMO','https://a1coffee.net/collections/machines-equipment/products/milk-frothing-thermometer','Manual dropship','UK delivery'],
  ['a1-milk-jug-600','JUG02','stainless-milk-jug-600ml','Stainless Milk Jug — 600ml',1495,'','Espresso','600ml stainless milk jug with etched measurements and a narrow pouring spout.','','cup',959,'A1 Coffee','JUG02','https://a1coffee.net/products/milk-frothing-jug-600ml','Manual dropship','UK delivery'],
  ['a1-milk-jug-1l','A1-JUG1L','stainless-milk-jug-1l','Stainless Milk Jug — 1L',1695,'','Espresso','Large stainless milk jug for steaming multiple drinks or larger milk volumes.','','cup',1079,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-cleaning-brush','A1-CLEANBRUSH','espresso-cleaning-brush','Espresso Cleaning Brush',1495,'','Setup','Brush for cleaning espresso group heads and hard-to-reach coffee residue.','','cup',959,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-e61-seal','A1-E61SEAL','e61-silicone-group-seal','E61 Silicone Group Seal',695,'','Setup','Replacement silicone group seal for compatible E61 espresso machines.','E61 group heads','cup',359,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-cafelat-mat','A1-CAFELATMAT','cafelat-corner-tamping-mat','Cafelat Corner Tamping Mat',2795,'','Setup','Corner tamping mat designed to protect worktops and provide a stable tamping surface.','','cup',2039,'A1 Coffee','','https://a1coffee.net/collections/machines-equipment','Manual dropship','UK delivery'],
  ['a1-simply-pump','PUMP02','simply-syrup-pump','Simply Syrup Pump',695,'','Iced','Reusable portion pump made for Simply 1 litre syrup bottles.','Simply 1L syrups','pump',359,'A1 Coffee','PUMP02','https://a1coffee.net/products/syrup-pump-for-1-litre-ibc-syrups','Manual dropship','UK delivery'],
  ['a1-simply-vanilla','VANILLASYRUP','simply-vanilla-syrup-1l','Simply Vanilla Syrup — 1L',1195,'','Iced','Vanilla syrup for lattes, iced coffee, milkshakes and desserts.','','bag',839,'A1 Coffee','VANILLASYRUP','https://a1coffee.net/products/vanilla-flavouring-syrup-1-litre','Manual dropship','UK delivery'],
  ['a1-simply-caramel','A1-CARAMEL','simply-caramel-syrup-1l','Simply Caramel Syrup — 1L',1195,'','Iced','Caramel syrup for hot or iced coffee and milk drinks.','','bag',839,'A1 Coffee','','https://a1coffee.net/collections/syrups-flavours-simply-simply-1-litre-syrups','Manual dropship','UK delivery'],
  ['a1-simply-salted-caramel','CARAMELSYRUP08','simply-salted-caramel-syrup-1l','Simply Salted Caramel Syrup — 1L',1195,'','Iced','Salted caramel syrup for lattes, iced coffee and hot chocolate.','','bag',839,'A1 Coffee','CARAMELSYRUP08','https://a1coffee.net/products/salted-caramel-flavouring-syrup-1-litre','Manual dropship','UK delivery'],
  ['a1-simply-hazelnut','HAZELNUTSYRUP','simply-hazelnut-syrup-1l','Simply Hazelnut Syrup — 1L',1195,'','Iced','Hazelnut-flavour syrup for coffee, milk drinks and desserts.','','bag',839,'A1 Coffee','HAZELNUTSYRUP','https://a1coffee.net/products/hazelnut-flavouring-syrup-1-litre','Manual dropship','UK delivery'],
  ['a1-simply-gingerbread','GINGERBREADSYRUP','simply-gingerbread-syrup-1l','Simply Gingerbread Syrup — 1L',1195,'','Iced','Gingerbread syrup for coffee, hot chocolate and seasonal drinks.','','bag',839,'A1 Coffee','GINGERBREADSYRUP','https://a1coffee.net/collections/syrups-flavours/products/gingerbread-syrup-1-litre','Manual dropship','UK delivery'],
  ['a1-planet-java-matcha','MATCHAPLANET','planet-java-matcha-100g','Planet Java Matcha — 100g',1095,'','Matcha','Resealable 100g pouch of matcha green tea powder for hot or iced matcha drinks.','','bag',719,'A1 Coffee','MATCHAPLANET','https://a1coffee.net/collections/tea-tea-types-green-tea/products/planet-java-matcha-green-tea-powder-100g-bag','Manual dropship','UK delivery'],
  ['a1-zuma-matcha','COSYMATCHA','zuma-matcha-100g','Zuma Matcha — 100g',1395,'','Matcha','100g resealable pouch of Zuma matcha powder for lattes and iced drinks.','','bag',899,'A1 Coffee','COSYMATCHA','https://a1coffee.net/collections/tea-tea-types-green-tea/products/cosy-matcha-tea-100g','Manual dropship','UK delivery'],
  ['a1-perfect-ted-strawberry','MATCHATEDSTRAW','perfect-ted-strawberry-matcha-75g','Perfect Ted Strawberry Matcha — 75g',1695,'','Matcha','Strawberry-flavoured ceremonial-grade matcha blend in a 75g resealable pouch.','','bag',1199,'A1 Coffee','MATCHATEDSTRAW','https://a1coffee.net/collections/superfood-latte-mixes/products/perfect-ted-ceremonial-grade-strawberry-matcha-75g-bag','Manual dropship','UK delivery'],
  ['a1-perfect-ted-vanilla','MATCHATEDVAN','perfect-ted-vanilla-matcha-75g','Perfect Ted Vanilla Matcha — 75g',1695,'','Matcha','Vanilla-flavoured ceremonial-grade matcha blend in a 75g resealable pouch.','','bag',1199,'A1 Coffee','MATCHATEDVAN','https://a1coffee.net/products/perfect-ted-ceremonial-grade-vanilla-matcha-75g-bag','Manual dropship','UK delivery'],
  ['a1-perfect-ted-blueberry','A1-MATCHATEDBLUE','perfect-ted-blueberry-matcha-75g','Perfect Ted Blueberry Matcha — 75g',1695,'','Matcha','Blueberry-flavoured matcha blend in a 75g resealable pouch.','','bag',1199,'A1 Coffee','','https://a1coffee.net/collections/matcha','Manual dropship','UK delivery'],
  ['a1-java-all-day','A1-JAVAALLDAY','java-caffe-all-day-coffee','Java Caffe All Day Coffee',795,'','Coffee','Everyday roasted coffee from the Java Caffe range. Choose grind and pack size before publication.','','bag',399,'A1 Coffee','','https://a1coffee.net/collections/java-caffe','Manual dropship','UK delivery'],
  ['a1-java-brazil','JAVACAFFE14','java-caffe-brazilian-smooth-roast','Java Caffe Brazilian Smooth Roast',895,'','Coffee','Brazilian single-origin coffee with chocolate and red berry tasting notes.','','bag',439,'A1 Coffee','JAVACAFFE14','https://a1coffee.net/collections/hand-roasted-coffee-beans/products/java-caffe-brazilian-smooth-roast-coffee-beans-1kg','Manual dropship','UK delivery'],
  ['a1-java-latte-blend','A1-JAVALATTE','java-caffe-latte-blend','Java Caffe Latte Blend',895,'','Coffee','Roasted coffee blend selected as a base for milk drinks. Choose grind and pack size before publication.','','bag',479,'A1 Coffee','','https://a1coffee.net/collections/java-caffe','Manual dropship','UK delivery'],
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
CREATE TABLE IF NOT EXISTS product_media (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  data BLOB NOT NULL,
  byte_size INTEGER NOT NULL,
  original_name TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' }, key, 256);
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
  const placeholderCleanup = await db.prepare("SELECT value FROM settings WHERE key='placeholder_catalogue_removed_v1'").first();
  if (!placeholderCleanup) {
    const placeholderIds = ['puck-screen','wdt-tool','dosing-funnel','dosing-cup','latte-glass','syrup-pump','matcha-whisk','house-beans'];
    const deleteCartItems = db.prepare('DELETE FROM cart_items WHERE product_id=?');
    const deleteProducts = db.prepare('DELETE FROM products WHERE id=?');
    await db.batch(placeholderIds.map(id => deleteCartItems.bind(id)));
    await db.batch(placeholderIds.map(id => deleteProducts.bind(id)));
    await db.prepare("INSERT OR REPLACE INTO settings(key,value) VALUES ('placeholder_catalogue_removed_v1','done')").run();
  }

  const launchMarker = await db.prepare("SELECT value FROM settings WHERE key='a1_launch_catalogue_v1'").first();
  if (!launchMarker) {
    const stmt = db.prepare(`INSERT OR IGNORE INTO products
      (id,variant_id,slug,name,price_pence,tag,category,description,compatibility,visual,stock_status,stock_on_hand,supplier,supplier_sku,supplier_url,cost_pence,fulfilment_method,lead_time,enabled,sort_order)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    await db.batch(launchCatalogue.map((p, i) => stmt.bind(
      p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8] || null,p[9],'out',0,
      p[11],p[12] || null,p[13] || null,p[10],p[14],p[15],0,100+i
    )));
    await db.prepare("INSERT OR REPLACE INTO settings(key,value) VALUES ('a1_launch_catalogue_v1','imported')").run();
  }

  const liveMarker = await db.prepare("SELECT value FROM settings WHERE key='a1_launch_live_v1'").first();
  if (!liveMarker) {
    await db.prepare("UPDATE products SET enabled=1, updated_at=CURRENT_TIMESTAMP WHERE supplier='A1 Coffee'").run();
    await db.prepare("UPDATE products SET tag='' WHERE supplier='A1 Coffee'").run();
    const tagStmt = db.prepare("UPDATE products SET tag='Just landed', updated_at=CURRENT_TIMESTAMP WHERE id=?");
    await db.batch([
      tagStmt.bind('a1-tamper-48-57'),
      tagStmt.bind('a1-milk-jug-600'),
      tagStmt.bind('a1-perfect-ted-strawberry'),
    ]);
    await db.prepare("INSERT OR REPLACE INTO settings(key,value) VALUES ('a1_launch_live_v1','active')").run();
  }
}

function isDropshipProduct(row: any) {
  return String(row.fulfilment_method || '').toLowerCase().includes('dropship');
}

function publicStockStatus(row: any) {
  if (row.enabled && isDropshipProduct(row)) return 'in';
  return row.stock_status;
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
    stock: publicStockStatus(row),
    image: row.image_url || undefined,
    stockOnHand: row.stock_on_hand,
    sortOrder: row.sort_order,
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

function hasInternalAccess(request: Request) {
  const url = new URL(request.url);
  if (url.hostname.toLowerCase() !== 'internal.standarddose.co.uk') return false;
  if (!request.headers.get('cf-access-jwt-assertion')) return false;
  const origin = request.headers.get('origin');
  return !origin || origin === 'https://internal.standarddose.co.uk';
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
    const product = await env.DB.prepare('SELECT id, stock_status, stock_on_hand, fulfilment_method, enabled FROM products WHERE id=? AND enabled=1').bind(productId).first();
    if (!product || (!isDropshipProduct(product) && (product.stock_status === 'out' || product.stock_on_hand <= 0))) return json({ error:'Product unavailable' }, { status:409 });
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

  if (path === '/api/admin/security/status' && method === 'GET') {
    const security = await getSecurity(env.DB);
    return json({ configured:Boolean(security) });
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

    if (!security) {
      return json({ error:'Admin security setup required', setupRequired:true }, { status:409 });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const code = String(body.code || '').replace(/\s+/g,'');
    const hash = await passwordHash(password, security.password_salt);
    const totpSecret = String(env.ADMIN_TOTP_SECRET || '');
    valid = Boolean(totpSecret)
      && email === String(security.approved_email).toLowerCase()
      && hash === security.password_hash
      && await verifyTotp(totpSecret, code);

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
    const response = json({ ok:true, csrfToken:csrf, setupRequired:false });
    response.headers.append('set-cookie', secureCookie(ADMIN_COOKIE, token, SESSION_HOURS*60*60));
    return response;
  }

  if (path === '/api/admin/security/bootstrap' && method === 'GET') {
    if (!hasInternalAccess(request)) return json({ error:'Unauthorized' }, { status:401 });
    const security = await getSecurity(env.DB);
    return json({ configured:Boolean(security), totpReady:Boolean(env.ADMIN_TOTP_SECRET) });
  }

  if (path === '/api/admin/security/setup' && method === 'POST') {
    if (!hasInternalAccess(request)) return json({ error:'Unauthorized' }, { status:401 });
    if (await getSecurity(env.DB)) return json({ error:'Security is already configured' }, { status:409 });

    const body = await request.json() as any;
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const code = String(body.code || '').replace(/\s+/g,'');
    const secret = String(env.ADMIN_TOTP_SECRET || '');

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error:'Enter a valid email address' }, { status:400 });
    if (password.length < 14) return json({ error:'Use a password of at least 14 characters' }, { status:400 });
    if (!secret) return json({ error:'Authentication is not configured' }, { status:503 });
    if (!(await verifyTotp(secret, code))) return json({ error:'Authentication code is not valid' }, { status:400 });

    const salt = randomHex(16);
    const hash = await passwordHash(password, salt);
    await env.DB.prepare(`INSERT INTO admin_security(id,approved_email,password_salt,password_hash,totp_secret)
      VALUES (1,?,?,?,?)`).bind(email,salt,hash,'managed-secret').run();

    await env.DB.prepare('DELETE FROM admin_sessions').run();
    const token = crypto.randomUUID() + crypto.randomUUID();
    const csrf = crypto.randomUUID();
    const expires = new Date(Date.now()+SESSION_HOURS*60*60*1000).toISOString();
    await env.DB.prepare('INSERT INTO admin_sessions(token,csrf_token,expires_at) VALUES (?,?,?)').bind(token,csrf,expires).run();

    const response = json({ ok:true, approvedEmail:email, csrfToken:csrf });
    response.headers.append('set-cookie', secureCookie(ADMIN_COOKIE, token, SESSION_HOURS*60*60));
    return response;
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

  if (path === '/api/admin/media' && method === 'POST') {
    const auth = await requireAdmin(request, env, true);
    if (auth.error) return auth.error;

    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return json({ error:'Choose an image to upload' }, { status:400 });

    const allowed = new Set(['image/jpeg','image/png','image/webp','image/avif']);
    if (!allowed.has(file.type)) return json({ error:'Use a JPG, PNG, WebP or AVIF image' }, { status:415 });
    if (file.size <= 0) return json({ error:'The selected file is empty' }, { status:400 });
    if (file.size > 1_800_000) return json({ error:'Image is too large after optimisation. Please choose a smaller image.' }, { status:413 });

    const id = crypto.randomUUID();
    const bytes = await file.arrayBuffer();
    await env.DB.prepare(`INSERT INTO product_media(id,content_type,data,byte_size,original_name)
      VALUES (?,?,?,?,?)`).bind(id,file.type,bytes,file.size,file.name.slice(0,180)).run();

    return json({
      id,
      url: `https://standarddose.co.uk/media/${id}`,
      name: file.name,
      size: file.size,
    }, { status:201 });
  }

  if (path === '/api/admin/products' && method === 'GET') {
    const auth = await requireAdmin(request, env);
    if (auth.error) return auth.error;
    const { results = [] } = await env.DB.prepare('SELECT * FROM products ORDER BY sort_order, name').all();
    return json({ products:results.map((r:any)=>({ ...mapProduct(r), enabled:Boolean(r.enabled), supplier:r.supplier, supplierSku:r.supplier_sku, supplierUrl:r.supplier_url, cost:r.cost_pence == null ? null : r.cost_pence/100, fulfilmentMethod:r.fulfilment_method, leadTime:r.lead_time, sortOrder:r.sort_order })) });
  }

  if (path === '/api/admin/products' && method === 'POST') {
    const auth = await requireAdmin(request, env, true);
    if (auth.error) return auth.error;
    const body = await request.json() as any;
    const name = String(body.name || '').trim();
    const slug = String(body.slug || '').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const variantId = String(body.variantId || slug || crypto.randomUUID()).trim();
    const id = String(body.id || slug || crypto.randomUUID()).trim();
    const category = String(body.category || 'Setup').trim();
    const description = String(body.description || '').trim();
    const tag = String(body.tag || '').trim();
    const compatibility = String(body.compatibility || '').trim() || null;
    const image = String(body.image || '').trim() || null;
    const stockOnHand = Math.max(0, Math.floor(Number(body.stockOnHand || 0)));
    const stock = stockOnHand <= 0 ? 'out' : stockOnHand <= 10 ? 'low' : 'in';
    const pricePence = Math.round(Number(body.price || 0) * 100);
    const compareAtPence = body.compareAt === '' || body.compareAt == null ? null : Math.round(Number(body.compareAt) * 100);
    const sortRow = await env.DB.prepare('SELECT COALESCE(MAX(sort_order),-1)+1 AS n FROM products').first();
    const sortOrder = body.sortOrder == null ? Number(sortRow?.n || 0) : Math.max(0, Math.floor(Number(body.sortOrder)));
    if (!name || !slug || !variantId || pricePence < 0) return json({ error:'Name, slug, SKU and valid price are required' }, { status:400 });

    await env.DB.prepare(`INSERT INTO products
      (id,variant_id,slug,name,price_pence,compare_at_pence,tag,category,description,compatibility,visual,stock_status,image_url,stock_on_hand,supplier,supplier_sku,supplier_url,cost_pence,fulfilment_method,lead_time,enabled,sort_order)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(id,variantId,slug,name,pricePence,compareAtPence,tag,category,description,compatibility,'cup',stock,image,stockOnHand,
        String(body.supplier || '').trim() || null,String(body.supplierSku || '').trim() || null,String(body.supplierUrl || '').trim() || null,
        body.cost === '' || body.cost == null ? null : Math.round(Number(body.cost)*100),
        String(body.fulfilmentMethod || '').trim() || null,String(body.leadTime || '').trim() || null,body.enabled === false ? 0 : 1,sortOrder).run();

    const row = await env.DB.prepare('SELECT * FROM products WHERE id=?').bind(id).first();
    return json({ product:{ ...mapProduct(row), enabled:Boolean(row.enabled) } }, { status:201 });
  }

  if (path === '/api/admin/products/bulk' && method === 'POST') {
    const auth = await requireAdmin(request, env, true);
    if (auth.error) return auth.error;
    const body = await request.json() as any;
    const ids = Array.isArray(body.ids) ? body.ids.map((id:any)=>String(id)).filter(Boolean).slice(0,100) : [];
    const action = String(body.action || '');
    if (!ids.length) return json({ error:'Select at least one product' }, { status:400 });
    if (!['publish','archive'].includes(action)) return json({ error:'Unsupported bulk action' }, { status:400 });
    const enabled = action === 'publish' ? 1 : 0;
    const stmt = env.DB.prepare('UPDATE products SET enabled=?, updated_at=CURRENT_TIMESTAMP WHERE id=?');
    await env.DB.batch(ids.map((id:string)=>stmt.bind(enabled,id)));
    return json({ ok:true, updated:ids.length });
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
      stock_on_hand: body.stockOnHand == null ? existing.stock_on_hand : Math.max(0, Math.floor(Number(body.stockOnHand))),
      image_url: body.image ?? existing.image_url,
      supplier: body.supplier ?? existing.supplier,
      supplier_sku: body.supplierSku ?? existing.supplier_sku,
      supplier_url: body.supplierUrl ?? existing.supplier_url,
      cost_pence: body.cost == null ? existing.cost_pence : Math.round(Number(body.cost)*100),
      fulfilment_method: body.fulfilmentMethod ?? existing.fulfilment_method,
      lead_time: body.leadTime ?? existing.lead_time,
      enabled: body.enabled == null ? existing.enabled : body.enabled ? 1 : 0,
      compare_at_pence: body.compareAt === '' ? null : body.compareAt == null ? existing.compare_at_pence : Math.round(Number(body.compareAt)*100),
      sort_order: body.sortOrder == null ? existing.sort_order : Math.max(0, Math.floor(Number(body.sortOrder))),
      slug: body.slug == null ? existing.slug : String(body.slug).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
      variant_id: body.variantId == null ? existing.variant_id : String(body.variantId).trim(),
    };
    const stockStatus = next.stock_on_hand <= 0 ? 'out' : next.stock_on_hand <= 10 ? 'low' : 'in';
    await env.DB.prepare(`UPDATE products SET name=?,variant_id=?,slug=?,price_pence=?,compare_at_pence=?,tag=?,category=?,description=?,compatibility=?,stock_status=?,stock_on_hand=?,image_url=?,supplier=?,supplier_sku=?,supplier_url=?,cost_pence=?,fulfilment_method=?,lead_time=?,enabled=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`)
      .bind(next.name,next.variant_id,next.slug,next.price_pence,next.compare_at_pence,next.tag,next.category,next.description,next.compatibility,stockStatus,next.stock_on_hand,next.image_url,next.supplier,next.supplier_sku,next.supplier_url,next.cost_pence,next.fulfilment_method,next.lead_time,next.enabled,next.sort_order,id).run();
    const row = await env.DB.prepare('SELECT * FROM products WHERE id=?').bind(id).first();
    return json({ product:mapProduct(row) });
  }

  return json({ error:'Not found' }, { status:404 });
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/media/')) {
      await ensureSchema(env.DB);
      const id = decodeURIComponent(url.pathname.slice('/media/'.length));
      if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response('Not found', { status:404 });
      const media = await env.DB.prepare('SELECT content_type,data FROM product_media WHERE id=?').bind(id).first();
      if (!media) return new Response('Not found', { status:404 });
      const headers = new Headers({
        'content-type': String(media.content_type),
        'cache-control': 'public, max-age=31536000, immutable',
        'x-content-type-options': 'nosniff',
      });
      return new Response(media.data, { headers });
    }

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
