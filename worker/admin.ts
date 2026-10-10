const html = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow,noarchive" />
<title>STANDARD DOSE — Admin</title>
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif;color:#111;background:#0b0b0c;--bg:#f5f5f3;--card:#fff;--ink:#1d1d1f;--muted:#6e6e73;--soft:#f2f2ef;--line:#e5e5df;--accent:#d9ff3f;--danger:#b42318;--warning:#9a5a00;--shadow:0 18px 60px rgba(0,0,0,.10);--shadow-lg:0 28px 90px rgba(0,0,0,.24)}
*{box-sizing:border-box}html,body{min-height:100%}body{margin:0;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}button,input,select,textarea{font:inherit}button{color:inherit}
.shell{min-height:100vh;display:grid;grid-template-columns:248px minmax(0,1fr);background:var(--bg)}
.side{position:sticky;top:0;height:100vh;background:#0d0d0e;color:#fff;padding:26px 18px 20px;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.06)}
.brand-wrap{padding:6px 10px 28px}.brand{font-weight:800;letter-spacing:-.035em;font-size:20px}.sub{font-size:10px;letter-spacing:.20em;color:#8e8e93;text-transform:uppercase}.brand-wrap .sub{margin-top:5px}
.nav{display:grid;gap:6px}.nav button{appearance:none;border:0;background:transparent;color:#aaa;padding:12px 12px;border-radius:11px;text-align:left;font-weight:650;font-size:14px;cursor:pointer;transition:background .15s,color .15s}.nav button:hover{background:#1b1b1d;color:#fff}.nav button.active{background:#242426;color:#fff}.nav button:disabled{opacity:.42;cursor:default}
.spacer{flex:1}.logout{border:0;background:#1b1b1d;color:#f5f5f7;padding:12px 14px;border-radius:11px;cursor:pointer;font-weight:650;text-align:left;transition:background .15s}.logout:hover{background:#242426}
.main{padding:48px clamp(28px,4vw,64px) 64px;max-width:1560px;width:100%;margin:0 auto}
.top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:34px}.top h1{margin:0;font-size:44px;line-height:1;letter-spacing:-.055em;font-weight:780}.top p{margin:10px 0 0;color:var(--muted);font-size:15px}.top-meta{font-size:12px;color:var(--muted);white-space:nowrap}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px 22px 20px;box-shadow:0 1px 0 rgba(0,0,0,.02)}.metric{font-size:36px;font-weight:760;letter-spacing:-.045em;margin-top:10px}.label{font-size:11px;color:#86868b;text-transform:uppercase;letter-spacing:.12em;font-weight:700}
.panel{margin-top:18px;background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden}.panel-head{display:flex;justify-content:space-between;align-items:center;padding:20px 22px;border-bottom:1px solid var(--line);gap:16px}.panel-head h2{margin:0;font-size:18px;letter-spacing:-.02em}.panel-head span{font-size:13px;color:var(--muted)}.panel-actions{display:flex;align-items:center;gap:10px}.primary{border:0;background:#111;color:#fff;border-radius:11px;padding:9px 13px;font-weight:700;cursor:pointer}.primary:hover{background:#262626}.thumb{width:44px;height:44px;border-radius:10px;object-fit:cover;background:#f1f1ee;border:1px solid var(--line);display:block}.product-cell{display:flex;align-items:center;gap:12px}.row-actions{display:flex;gap:6px}.mini{border:1px solid #d8d8d2;background:#fff;border-radius:9px;padding:7px 9px;cursor:pointer}.mini:hover{background:#f5f5f2}.danger{color:#b42318}.helper{font-size:12px;color:var(--muted);line-height:1.45;margin-top:6px}.image-preview{width:100%;aspect-ratio:16/9;border:1px solid var(--line);border-radius:14px;background:#f5f5f2;object-fit:cover;display:none}.image-preview.show{display:block}
.table-wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%;min-width:920px}th,td{text-align:left;padding:17px 22px;border-bottom:1px solid var(--line);font-size:14px;vertical-align:middle}th{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#8e8e93;font-weight:750;background:#fafaf8}tr:last-child td{border-bottom:0}tbody tr{transition:background .12s}tbody tr:hover{background:#fafaf8}.product-title{font-weight:700;letter-spacing:-.01em}.product-sku{display:block;margin-top:4px;font-size:11px;color:#9a9a9f;letter-spacing:.08em}.money{font-variant-numeric:tabular-nums}.stock{font-weight:650}.low{color:var(--warning)}.out{color:var(--danger)}.status-pill{display:inline-flex;align-items:center;height:26px;padding:0 9px;border-radius:999px;background:#edf8e6;color:#2f6b20;font-size:11px;font-weight:750}.status-pill.hidden{background:#f1f1ef;color:#777}.edit{border:1px solid #d2d2cc;background:#fff;border-radius:10px;padding:8px 12px;cursor:pointer;font-weight:650;transition:background .12s,border-color .12s}.edit:hover{background:#f5f5f2;border-color:#bdbdb7}
.login{min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 14%,rgba(255,255,255,.06),transparent 34%),#0b0b0c;padding:28px 20px}.login-card{width:min(460px,100%);background:rgba(255,255,255,.99);border:1px solid rgba(255,255,255,.16);border-radius:28px;padding:36px 34px 32px;box-shadow:var(--shadow-lg)}.login-card .sub{margin-bottom:10px;color:#8e8e93}.login-card h1{margin:0 0 28px;font-size:39px;line-height:1;letter-spacing:-.055em;font-weight:780}.login-card label{display:block;font-size:13px;font-weight:700;margin:19px 0 9px;color:#1d1d1f}.login-card input{width:100%;height:54px;padding:0 15px;border:1px solid #d2d2d7;border-radius:14px;background:#fff;font-size:16px;outline:none;transition:border-color .15s,box-shadow .15s}.login-card input:focus{border-color:#8e8e93;box-shadow:0 0 0 4px rgba(0,0,0,.065)}.login-card button,.save{width:100%;margin-top:24px;height:52px;border:0;border-radius:14px;background:var(--accent);font-weight:780;font-size:16px;cursor:pointer;transition:transform .12s,filter .12s}.login-card button:hover,.save:hover{filter:brightness(.98)}.login-card button:active,.save:active{transform:scale(.994)}.error{color:var(--danger);margin-top:14px;font-size:13px;line-height:1.45}
.modal{position:fixed;z-index:100;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(10px);display:grid;place-items:center;padding:24px}.modal-card{background:#fff;width:min(760px,100%);max-height:92vh;overflow:auto;border-radius:24px;padding:28px;box-shadow:var(--shadow-lg)}.modal-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:18px;border-bottom:1px solid var(--line)}.modal-head h2{margin:5px 0 0;font-size:28px;letter-spacing:-.04em}.close{width:36px;height:36px;border:0;background:#f2f2ef;border-radius:50%;font-size:22px;line-height:1;cursor:pointer}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 16px;margin-top:22px}.field label{display:block;font-size:11px;font-weight:750;text-transform:uppercase;letter-spacing:.08em;margin-bottom:7px;color:#777}.field input,.field select,.field textarea{width:100%;min-height:46px;padding:11px 12px;border:1px solid #d2d2cc;border-radius:11px;background:#fff;outline:none}.field input:focus,.field select:focus,.field textarea:focus{border-color:#8e8e93;box-shadow:0 0 0 3px rgba(0,0,0,.055)}.field textarea{min-height:112px;resize:vertical}.field input[type=checkbox]{width:18px;min-height:18px;height:18px;vertical-align:middle;margin-right:8px}.span2{grid-column:1/-1}.modal-actions{display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-top:24px;padding-top:18px;border-top:1px solid var(--line)}.save{width:auto;min-width:132px;margin:0;padding:0 18px}.status{font-size:12px;color:var(--muted);margin-right:auto}
@media(max-width:1000px){.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.shell{grid-template-columns:210px 1fr}.main{padding:36px 26px 50px}}
@media(max-width:760px){.shell{grid-template-columns:1fr}.side{position:relative;height:auto;display:block;padding:18px}.brand-wrap{padding:0 0 14px}.nav{grid-template-columns:1fr 1fr}.nav button:nth-child(n+3){display:none}.spacer,.logout{display:none}.main{padding:26px 18px 40px}.top{align-items:flex-start}.top h1{font-size:36px}.top-meta{display:none}.cards{grid-template-columns:1fr 1fr}.grid{grid-template-columns:1fr}.span2{grid-column:auto}.modal{padding:10px}.modal-card{border-radius:20px;padding:22px}}
@media(max-width:520px){.cards{grid-template-columns:1fr}.login-card{padding:30px 24px 26px;border-radius:24px}.login-card h1{font-size:35px}.top{margin-bottom:24px}}
</style>
</head>
<body>
<div id="app"></div>
<script>
const app=document.getElementById('app');
let csrf='';let products=[];let dashboard=null;let securityConfigured=false;
const money=n=>'£'+Number(n||0).toFixed(2);
const esc=v=>String(v??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','\"':'&quot;'}[c]));
async function api(path,opts={}){const r=await fetch(path,{credentials:'include',...opts,headers:{'content-type':'application/json',...(csrf?{'x-csrf-token':csrf}:{}),...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw new Error(data.error||'Request failed');return data}
async function showLogin(msg=''){
  try{securityConfigured=(await api('/api/admin/security/status')).configured}catch{}
  if(!securityConfigured)return setupView(msg);
  const fields='<label>Email</label><input id="email" type="email" autocomplete="username" required autofocus/><label>Password</label><input id="password" type="password" autocomplete="current-password" required/><label>Authentication code</label><input id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required/>';
  app.innerHTML='<div class="login"><form class="login-card" id="loginForm"><div class="sub">STANDARD DOSE</div><h1>Admin</h1>'+fields+'<button>Sign in</button>'+(msg?'<div class="error">'+esc(msg)+'</div>':'')+'</form></div>';
  document.getElementById('loginForm').onsubmit=async e=>{e.preventDefault();try{
    const body={email:document.getElementById('email').value,password:document.getElementById('password').value,code:document.getElementById('code').value};
    const d=await api('/api/admin/login',{method:'POST',body:JSON.stringify(body)});csrf=d.csrfToken;await load();
  }catch(err){showLogin(err.message)}}
}
async function setupView(msg=''){
  try{
    const d=await api('/api/admin/security/bootstrap');
    if(d.configured){securityConfigured=true;return showLogin()}
    app.innerHTML='<div class="login"><form class="login-card" id="setupForm"><div class="sub">STANDARD DOSE</div><h1>Admin</h1><label>Email</label><input id="setupEmail" type="email" autocomplete="email" required autofocus/><label>Password</label><input id="setupPassword" type="password" autocomplete="new-password" minlength="14" required/><label>Authentication code</label><input id="setupCode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required/><button>Continue</button>'+(msg?'<div class="error">'+esc(msg)+'</div>':'')+'</form></div>';
    document.getElementById('setupForm').onsubmit=async e=>{e.preventDefault();try{
      const created=await api('/api/admin/security/setup',{method:'POST',body:JSON.stringify({email:document.getElementById('setupEmail').value,password:document.getElementById('setupPassword').value,code:document.getElementById('setupCode').value})});
      csrf=created.csrfToken;securityConfigured=true;await load();
    }catch(err){setupView(err.message)}}
  }catch(err){showLogin(err.message)}
}
async function check(){try{const d=await api('/api/admin/session');csrf=d.csrfToken;if(d.setupRequired)await setupView();else await load()}catch{showLogin()}}
async function load(){const results=await Promise.all([api('/api/admin/dashboard'),api('/api/admin/products')]);dashboard=results[0];products=results[1].products;render()}
function stockLabel(p){return p.stock==='out'?'Out of stock':p.stock==='low'?'Low stock':'In stock'}
function render(){
  const rows=products.map(p=>'<tr><td><div class="product-cell">'+(p.image?'<img class="thumb" src="'+esc(p.image)+'" alt="">':'<div class="thumb"></div>')+'<div><span class="product-title">'+esc(p.name)+'</span><span class="product-sku">'+esc(p.variantId)+'</span></div></div></td><td>'+esc(p.category)+'</td><td class="money">'+money(p.price)+'</td><td class="stock '+esc(p.stock)+'">'+Number(p.stockOnHand||0)+' · '+stockLabel(p)+'</td><td>'+esc(p.supplier||'—')+'</td><td><span class="status-pill '+(p.enabled?'':'hidden')+'">'+(p.enabled?'Live':'Hidden')+'</span></td><td><div class="row-actions"><button class="mini move" data-id="'+esc(p.id)+'" data-dir="-1" title="Move up">↑</button><button class="mini move" data-id="'+esc(p.id)+'" data-dir="1" title="Move down">↓</button><button class="edit" data-id="'+esc(p.id)+'">Edit</button></div></td></tr>').join('');
  app.innerHTML='<div class="shell"><aside class="side"><div class="brand-wrap"><div class="brand">STANDARD DOSE</div><div class="sub">Admin</div></div><div class="nav"><button class="active">Overview</button><button id="productsNav">Products</button><button disabled>Orders</button><button disabled>Settings</button></div><div class="spacer"></div><button class="logout" id="logout">Sign out</button></aside><main class="main"><div class="top"><div><h1>Overview</h1><p>Store performance and catalogue.</p></div><div class="top-meta">STANDARD DOSE</div></div><div class="cards"><div class="card"><div class="label">Live products</div><div class="metric">'+Number(dashboard.products||0)+'</div></div><div class="card"><div class="label">Low stock</div><div class="metric">'+Number(dashboard.lowStock||0)+'</div></div><div class="card"><div class="label">Orders</div><div class="metric">'+Number(dashboard.orders||0)+'</div></div><div class="card"><div class="label">Revenue</div><div class="metric">'+money(dashboard.revenue)+'</div></div></div><section class="panel" id="products"><div class="panel-head"><div><h2>Products</h2><span>'+products.length+' products</span></div><div class="panel-actions"><button class="primary" id="addProduct">Add product</button></div></div><div class="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Supplier</th><th>Status</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div></section></main></div>';
  document.getElementById('logout').onclick=logout;
  document.getElementById('productsNav').onclick=()=>document.getElementById('products').scrollIntoView({behavior:'smooth'});
  document.getElementById('addProduct').onclick=()=>productModal();
  document.querySelectorAll('.edit').forEach(b=>b.onclick=()=>productModal(products.find(p=>p.id===b.dataset.id)));
  document.querySelectorAll('.move').forEach(b=>b.onclick=()=>moveProduct(b.dataset.id,Number(b.dataset.dir)));
}
function slugify(v){return String(v||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
async function moveProduct(id,dir){
  const ordered=[...products].sort((a,b)=>Number(a.sortOrder||0)-Number(b.sortOrder||0));
  const i=ordered.findIndex(p=>p.id===id), j=i+dir;if(i<0||j<0||j>=ordered.length)return;
  const a=ordered[i],b=ordered[j];
  await Promise.all([
    api('/api/admin/products/'+encodeURIComponent(a.id),{method:'PATCH',body:JSON.stringify({sortOrder:b.sortOrder})}),
    api('/api/admin/products/'+encodeURIComponent(b.id),{method:'PATCH',body:JSON.stringify({sortOrder:a.sortOrder})})
  ]);
  await load();
}
function productModal(p=null){
  const isNew=!p;
  p=p||{name:'',variantId:'',slug:'',price:'',compareAt:'',category:'Setup',stockOnHand:0,supplier:'',supplierSku:'',supplierUrl:'',cost:'',leadTime:'',fulfilmentMethod:'',tag:'',description:'',compatibility:'',image:'',enabled:true,sortOrder:products.length};
  const wrap=document.createElement('div');wrap.className='modal';
  wrap.innerHTML='<form class="modal-card"><div class="modal-head"><div><div class="sub">'+(isNew?'NEW PRODUCT':'EDIT PRODUCT')+'</div><h2>'+(isNew?'Add product':esc(p.name))+'</h2></div><button type="button" class="close">×</button></div><div class="grid">'
  +'<div class="field span2"><label>Name</label><input name="name" value="'+esc(p.name)+'" required></div>'
  +'<div class="field"><label>Slug</label><input name="slug" value="'+esc(p.slug||'')+'" required><div class="helper">Public product URL identifier.</div></div>'
  +'<div class="field"><label>SKU</label><input name="variantId" value="'+esc(p.variantId||'')+'" required></div>'
  +'<div class="field"><label>Price (£)</label><input name="price" type="number" step="0.01" min="0" value="'+(p.price??'')+'" required></div>'
  +'<div class="field"><label>Compare at (£)</label><input name="compareAt" type="number" step="0.01" min="0" value="'+(p.compareAt??'')+'"></div>'
  +'<div class="field"><label>Category</label><select name="category">'+['Espresso','Iced','Matcha','Coffee','Setup'].map(x=>'<option '+(p.category===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div>'
  +'<div class="field"><label>Stock on hand</label><input name="stockOnHand" type="number" min="0" value="'+Number(p.stockOnHand||0)+'"><div class="helper">0 = out, 1–10 = low, 11+ = in stock.</div></div>'
  +'<div class="field span2"><label>Image URL</label><input name="image" value="'+esc(p.image||'')+'" placeholder="https://..."><div class="helper">Image upload storage is the next media step; for now paste the final hosted image URL.</div></div>'
  +(p.image?'<div class="field span2"><img class="image-preview show" src="'+esc(p.image)+'" alt=""></div>':'')
  +'<div class="field"><label>Supplier</label><input name="supplier" value="'+esc(p.supplier||'')+'"></div>'
  +'<div class="field"><label>Supplier SKU</label><input name="supplierSku" value="'+esc(p.supplierSku||'')+'"></div>'
  +'<div class="field span2"><label>Supplier URL</label><input name="supplierUrl" value="'+esc(p.supplierUrl||'')+'"></div>'
  +'<div class="field"><label>Cost (£)</label><input name="cost" type="number" step="0.01" min="0" value="'+(p.cost??'')+'"></div>'
  +'<div class="field"><label>Lead time</label><input name="leadTime" value="'+esc(p.leadTime||'')+'"></div>'
  +'<div class="field"><label>Fulfilment</label><input name="fulfilmentMethod" value="'+esc(p.fulfilmentMethod||'')+'"></div>'
  +'<div class="field"><label>Badge</label><input name="tag" value="'+esc(p.tag||'')+'"></div>'
  +'<div class="field span2"><label>Compatibility</label><input name="compatibility" value="'+esc(p.compatibility||'')+'"></div>'
  +'<div class="field span2"><label>Description</label><textarea name="description">'+esc(p.description||'')+'</textarea></div>'
  +'<div class="field"><label>Sort order</label><input name="sortOrder" type="number" min="0" value="'+Number(p.sortOrder||0)+'"></div>'
  +'<div class="field"><label><input name="enabled" type="checkbox" '+(p.enabled?'checked':'')+'> Published on storefront</label></div>'
  +'</div><div class="modal-actions">'+(!isNew?'<button type="button" class="mini danger" id="archiveProduct">'+(p.enabled?'Archive':'Keep archived')+'</button>':'')+'<span class="status"></span><button class="save">'+(isNew?'Create product':'Save changes')+'</button></div></form>';
  document.body.appendChild(wrap);
  const form=wrap.querySelector('form');
  wrap.querySelector('.close').onclick=()=>wrap.remove();
  wrap.onclick=e=>{if(e.target===wrap)wrap.remove()};
  const nameInput=form.elements.name,slugInput=form.elements.slug,skuInput=form.elements.variantId;
  if(isNew)nameInput.addEventListener('input',()=>{if(!slugInput.dataset.touched)slugInput.value=slugify(nameInput.value);if(!skuInput.dataset.touched)skuInput.value=slugify(nameInput.value)});
  slugInput.addEventListener('input',()=>slugInput.dataset.touched='1');skuInput.addEventListener('input',()=>skuInput.dataset.touched='1');
  const archive=wrap.querySelector('#archiveProduct');
  if(archive)archive.onclick=async()=>{if(!p.enabled)return;archive.disabled=true;try{await api('/api/admin/products/'+encodeURIComponent(p.id),{method:'PATCH',body:JSON.stringify({enabled:false})});await load();wrap.remove()}catch(err){archive.disabled=false;wrap.querySelector('.status').textContent=err.message}};
  form.onsubmit=async e=>{e.preventDefault();const fd=new FormData(form);const payload=Object.fromEntries(fd.entries());payload.enabled=fd.get('enabled')==='on';payload.price=Number(payload.price);payload.stockOnHand=Number(payload.stockOnHand);payload.sortOrder=Number(payload.sortOrder||0);if(payload.compareAt!=='')payload.compareAt=Number(payload.compareAt);if(payload.cost!=='')payload.cost=Number(payload.cost);const status=wrap.querySelector('.status');status.textContent=isNew?'Creating…':'Saving…';try{const path=isNew?'/api/admin/products':'/api/admin/products/'+encodeURIComponent(p.id);await api(path,{method:isNew?'POST':'PATCH',body:JSON.stringify(payload)});await load();wrap.remove()}catch(err){status.textContent=err.message}};
}
async function logout(){try{await api('/api/admin/logout',{method:'POST'})}catch{}csrf='';showLogin()}
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
