const html = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow,noarchive" />
<title>STANDARD DOSE — Admin</title>
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111;background:#f3f3ef}*{box-sizing:border-box}body{margin:0}.shell{min-height:100vh;display:grid;grid-template-columns:230px 1fr}.side{background:#111;color:#fff;padding:28px 20px;display:flex;flex-direction:column;gap:28px}.brand{font-weight:900;letter-spacing:-.04em;font-size:22px}.sub{font-size:11px;letter-spacing:.18em;color:#8f8f8f}.nav{display:grid;gap:8px}.nav button{all:unset;cursor:pointer;padding:12px 10px;border-radius:8px;font-weight:700}.nav button.active,.nav button:hover{background:#242424}.spacer{flex:1}.logout{background:#262626;border:0;color:#fff;padding:12px;border-radius:8px;cursor:pointer}.main{padding:38px;max-width:1400px;width:100%}.top{display:flex;justify-content:space-between;align-items:end;margin-bottom:30px}.top h1{margin:0;font-size:42px;letter-spacing:-.05em}.top p{margin:7px 0 0;color:#777}.pill{background:#d9ff3f;padding:9px 12px;border-radius:999px;font-weight:900;font-size:12px}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card{background:#fff;border:1px solid #dddcd5;border-radius:14px;padding:20px}.metric{font-size:36px;font-weight:900;letter-spacing:-.05em}.label{font-size:12px;color:#777;text-transform:uppercase;letter-spacing:.08em}.panel{margin-top:18px;background:#fff;border:1px solid #dddcd5;border-radius:14px;overflow:hidden}.panel-head{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-bottom:1px solid #eee}.panel-head h2{margin:0;font-size:18px}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;min-width:900px}th,td{text-align:left;padding:14px 18px;border-bottom:1px solid #eee;font-size:14px}th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#777}tr:last-child td{border-bottom:0}.stock{font-weight:800}.low{color:#a25b00}.out{color:#b42318}.edit{border:1px solid #ccc;background:#fff;border-radius:8px;padding:7px 10px;cursor:pointer}.login{min-height:100vh;display:grid;place-items:center;background:#111;padding:24px}.login-card{width:min(420px,100%);background:#fff;border-radius:16px;padding:28px}.login-card h1{margin:0 0 8px;font-size:32px;letter-spacing:-.05em}.login-card p{color:#777;margin:0 0 24px}.login-card label{display:block;font-size:12px;font-weight:800;margin-bottom:7px}.login-card input{width:100%;padding:13px;border:1px solid #ccc;border-radius:9px;font:inherit}.login-card button,.save{width:100%;margin-top:14px;padding:13px;border:0;border-radius:9px;background:#d9ff3f;font-weight:900;cursor:pointer}.error{color:#b42318;margin-top:12px;font-size:13px}.modal{position:fixed;inset:0;background:#0008;display:grid;place-items:center;padding:20px}.modal-card{background:#fff;width:min(680px,100%);max-height:90vh;overflow:auto;border-radius:16px;padding:24px}.modal-head{display:flex;justify-content:space-between;align-items:center}.modal-head h2{margin:0}.close{border:0;background:transparent;font-size:28px;cursor:pointer}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}.field label{display:block;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;color:#666}.field input,.field select,.field textarea{width:100%;padding:11px;border:1px solid #ccc;border-radius:8px;font:inherit}.field textarea{min-height:96px;resize:vertical}.span2{grid-column:1/-1}.save{width:auto;padding:11px 18px}.status{font-size:12px;color:#666;margin-left:10px}@media(max-width:900px){.shell{grid-template-columns:1fr}.side{display:none}.main{padding:22px}.cards{grid-template-columns:1fr 1fr}.top h1{font-size:34px}.grid{grid-template-columns:1fr}.span2{grid-column:auto}}@media(max-width:520px){.cards{grid-template-columns:1fr}}
</style>
</head>
<body>
<div id="app"></div>
<script>
const app=document.getElementById('app');
let csrf='';let products=[];let dashboard=null;
const money=n=>'£'+Number(n||0).toFixed(2);
const esc=v=>String(v??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','\"':'&quot;'}[c]));
async function api(path,opts={}){const r=await fetch(path,{credentials:'include',...opts,headers:{'content-type':'application/json',...(csrf?{'x-csrf-token':csrf}:{}),...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw new Error(data.error||'Request failed');return data}
function loginView(msg=''){
  app.innerHTML='<div class="login"><form class="login-card" id="loginForm"><div class="sub">STANDARD DOSE</div><h1>Admin</h1><p>Manage products, stock and store settings.</p><label>Password</label><input id="password" type="password" autocomplete="current-password" required autofocus/><button>Sign in</button>'+(msg?'<div class="error">'+esc(msg)+'</div>':'')+'</form></div>';
  document.getElementById('loginForm').onsubmit=async e=>{e.preventDefault();try{const d=await api('/api/admin/login',{method:'POST',body:JSON.stringify({password:document.getElementById('password').value})});csrf=d.csrfToken;await load();}catch(err){loginView(err.message)}}
}
async function check(){try{const d=await api('/api/admin/session');csrf=d.csrfToken;await load()}catch{loginView()}}
async function load(){const results=await Promise.all([api('/api/admin/dashboard'),api('/api/admin/products')]);dashboard=results[0];products=results[1].products;render()}
function render(){
  const rows=products.map(p=>'<tr><td><strong>'+esc(p.name)+'</strong><br><span class="sub">'+esc(p.variantId)+'</span></td><td>'+esc(p.category)+'</td><td>'+money(p.price)+'</td><td class="stock '+esc(p.stock)+'">'+Number(p.stockOnHand||0)+' · '+esc(p.stock)+'</td><td>'+esc(p.supplier||'—')+'</td><td>'+(p.enabled?'Live':'Hidden')+'</td><td><button class="edit" data-id="'+esc(p.id)+'">Edit</button></td></tr>').join('');
  app.innerHTML='<div class="shell"><aside class="side"><div><div class="brand">STANDARD DOSE</div><div class="sub">ADMIN</div></div><div class="nav"><button class="active">Overview</button><button id="productsNav">Products</button><button disabled>Orders — next</button><button disabled>Settings — next</button></div><div class="spacer"></div><button class="logout" id="logout">Sign out</button></aside><main class="main"><div class="top"><div><h1>Store overview</h1><p>Cloudflare-native commerce backend.</p></div><div class="pill">£0 INFRA TARGET</div></div><div class="cards"><div class="card"><div class="label">Live products</div><div class="metric">'+Number(dashboard.products||0)+'</div></div><div class="card"><div class="label">Low stock</div><div class="metric">'+Number(dashboard.lowStock||0)+'</div></div><div class="card"><div class="label">Orders</div><div class="metric">'+Number(dashboard.orders||0)+'</div></div><div class="card"><div class="label">Revenue</div><div class="metric">'+money(dashboard.revenue)+'</div></div></div><section class="panel" id="products"><div class="panel-head"><h2>Products</h2><span>'+products.length+' total</span></div><div class="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Supplier</th><th>Status</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div></section></main></div>';
  document.getElementById('logout').onclick=logout;
  document.getElementById('productsNav').onclick=()=>document.getElementById('products').scrollIntoView({behavior:'smooth'});
  document.querySelectorAll('.edit').forEach(b=>b.onclick=()=>editProduct(b.dataset.id));
}
function editProduct(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const wrap=document.createElement('div');wrap.className='modal';
  wrap.innerHTML='<form class="modal-card"><div class="modal-head"><div><div class="sub">EDIT PRODUCT</div><h2>'+esc(p.name)+'</h2></div><button type="button" class="close">×</button></div><div class="grid"><div class="field span2"><label>Name</label><input name="name" value="'+esc(p.name)+'"></div><div class="field"><label>Price (£)</label><input name="price" type="number" step="0.01" min="0" value="'+Number(p.price||0)+'"></div><div class="field"><label>Category</label><input name="category" value="'+esc(p.category)+'"></div><div class="field"><label>Stock on hand</label><input name="stockOnHand" type="number" min="0" value="'+Number(p.stockOnHand||0)+'"></div><div class="field"><label>Stock state</label><select name="stock"><option value="in" '+(p.stock==='in'?'selected':'')+'>In stock</option><option value="low" '+(p.stock==='low'?'selected':'')+'>Low stock</option><option value="out" '+(p.stock==='out'?'selected':'')+'>Out of stock</option></select></div><div class="field"><label>Supplier</label><input name="supplier" value="'+esc(p.supplier||'')+'"></div><div class="field"><label>Supplier SKU</label><input name="supplierSku" value="'+esc(p.supplierSku||'')+'"></div><div class="field span2"><label>Supplier URL</label><input name="supplierUrl" value="'+esc(p.supplierUrl||'')+'"></div><div class="field"><label>Cost (£)</label><input name="cost" type="number" step="0.01" min="0" value="'+(p.cost??'')+'"></div><div class="field"><label>Lead time</label><input name="leadTime" value="'+esc(p.leadTime||'')+'"></div><div class="field"><label>Fulfilment</label><input name="fulfilmentMethod" value="'+esc(p.fulfilmentMethod||'')+'"></div><div class="field"><label>Badge</label><input name="tag" value="'+esc(p.tag||'')+'"></div><div class="field span2"><label>Description</label><textarea name="description">'+esc(p.description||'')+'</textarea></div><div class="field span2"><label><input name="enabled" type="checkbox" '+(p.enabled?'checked':'')+'> Published on storefront</label></div></div><button class="save">Save changes</button><span class="status"></span></form>';
  document.body.appendChild(wrap);
  wrap.querySelector('.close').onclick=()=>wrap.remove();
  wrap.onclick=e=>{if(e.target===wrap)wrap.remove()};
  wrap.querySelector('form').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const payload=Object.fromEntries(f.entries());payload.enabled=f.get('enabled')==='on';payload.price=Number(payload.price);payload.stockOnHand=Number(payload.stockOnHand);if(payload.cost!=='')payload.cost=Number(payload.cost);else delete payload.cost;const status=wrap.querySelector('.status');status.textContent='Saving…';try{await api('/api/admin/products/'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify(payload)});status.textContent='Saved';await load();wrap.remove()}catch(err){status.textContent=err.message}}
}
async function logout(){try{await api('/api/admin/logout',{method:'POST'})}catch{}csrf='';loginView()}
check();
</script>
</body>
</html>`;

export function adminResponse() {
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, private',
      'x-robots-tag': 'noindex, nofollow, noarchive',
      'content-security-policy': "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; img-src 'self' https: data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
      'x-frame-options': 'DENY',
      'referrer-policy': 'no-referrer',
    },
  });
}
