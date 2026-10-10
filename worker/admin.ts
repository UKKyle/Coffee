const html = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow,noarchive" />
<title>Standard Dose Admin</title>
<style>
:root{
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif;
  --bg:#f7f7f8;--surface:#fff;--surface-subtle:#fafafa;--sidebar:#f4f4f5;--text:#18181b;--muted:#71717a;
  --line:#e4e4e7;--line-strong:#d4d4d8;--hover:#f4f4f5;--selected:#f0f0f1;--primary:#18181b;--primary-hover:#27272a;
  --success-bg:#ecfdf3;--success:#067647;--warn-bg:#fffaeb;--warn:#b54708;--danger-bg:#fef3f2;--danger:#b42318;
  --radius:8px;--shadow:0 1px 2px rgba(0,0,0,.04),0 1px 3px rgba(0,0,0,.03)
}
*{box-sizing:border-box}html,body{min-height:100%}body{margin:0;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;font-size:14px}
button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.5}
svg{display:block}
.app-shell{min-height:100vh;display:grid;grid-template-columns:224px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:var(--sidebar);border-right:1px solid var(--line);display:flex;flex-direction:column;padding:14px 10px}
.brand{height:44px;display:flex;align-items:center;padding:0 10px;margin-bottom:14px}.brand-mark{width:26px;height:26px;border-radius:7px;background:#18181b;color:#fff;display:grid;place-items:center;font-size:11px;font-weight:800;letter-spacing:-.04em;margin-right:10px}.brand-name{font-size:13px;font-weight:700;letter-spacing:-.01em}
.nav-section{margin:14px 0 6px;padding:0 10px;color:#a1a1aa;text-transform:uppercase;font-size:10px;font-weight:700;letter-spacing:.08em}
.nav{display:grid;gap:2px}.nav-button{width:100%;height:36px;border:0;background:transparent;border-radius:6px;display:flex;align-items:center;gap:10px;padding:0 10px;color:#52525b;text-align:left;font-weight:500}.nav-button:hover{background:#ebebed;color:#27272a}.nav-button.active{background:#e4e4e7;color:#18181b;font-weight:600}.nav-button svg{width:16px;height:16px;stroke-width:1.8}.nav-button .soon{margin-left:auto;color:#a1a1aa;font-size:10px}
.sidebar-footer{margin-top:auto;border-top:1px solid var(--line);padding-top:10px}.store-link,.signout{width:100%;height:36px;border:0;background:transparent;border-radius:6px;display:flex;align-items:center;gap:10px;padding:0 10px;color:#52525b;text-align:left}.store-link:hover,.signout:hover{background:#ebebed;color:#18181b}
.workspace{min-width:0}
.topbar{height:56px;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:40}
.breadcrumbs{display:flex;align-items:center;gap:7px;color:#71717a;font-size:12px}.breadcrumbs strong{color:#27272a;font-weight:600}.top-actions{display:flex;align-items:center;gap:8px}
.icon-button{width:32px;height:32px;border:1px solid var(--line);background:#fff;border-radius:6px;display:grid;place-items:center}.icon-button:hover{background:var(--hover)}.icon-button svg{width:15px;height:15px}
.user-dot{width:28px;height:28px;border-radius:50%;background:#18181b;color:white;display:grid;place-items:center;font-size:10px;font-weight:700}
.page{padding:28px 32px 48px;max-width:1440px;margin:0 auto}
.page-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-bottom:20px}.page-heading h1{font-size:24px;line-height:1.2;margin:0;font-weight:650;letter-spacing:-.025em}.page-heading p{margin:5px 0 0;color:var(--muted);font-size:13px}
.actions{display:flex;align-items:center;gap:8px}.btn{height:34px;border-radius:6px;padding:0 12px;border:1px solid var(--line-strong);background:#fff;font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:7px}.btn:hover{background:var(--hover)}.btn-primary{background:var(--primary);color:#fff;border-color:var(--primary)}.btn-primary:hover{background:var(--primary-hover)}.btn-danger{color:var(--danger);border-color:#fecdca;background:#fff}.btn-danger:hover{background:var(--danger-bg)}.btn-quiet{border-color:transparent;background:transparent}.btn svg{width:14px;height:14px}
.surface{background:var(--surface);border:1px solid var(--line);border-radius:9px;box-shadow:var(--shadow);overflow:hidden}
.tabs{height:46px;display:flex;align-items:flex-end;padding:0 16px;border-bottom:1px solid var(--line);gap:18px}.tab{height:46px;border:0;background:transparent;padding:0 2px;border-bottom:2px solid transparent;color:#71717a;font-size:13px}.tab:hover{color:#27272a}.tab.active{border-bottom-color:#18181b;color:#18181b;font-weight:600}.tab-count{margin-left:5px;color:#a1a1aa;font-size:11px}
.toolbar{min-height:52px;padding:9px 12px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line)}.toolbar-left{flex:1;display:flex;align-items:center;gap:8px;min-width:0}.toolbar-right{display:flex;align-items:center;gap:8px}.search{position:relative;width:min(380px,100%)}.search svg{position:absolute;left:10px;top:9px;width:14px;height:14px;color:#a1a1aa}.search input{width:100%;height:32px;border:1px solid var(--line-strong);border-radius:6px;background:#fff;padding:0 34px 0 31px;outline:none;font-size:13px}.search input:focus{border-color:#a1a1aa;box-shadow:0 0 0 3px #f4f4f5}.search kbd{position:absolute;right:8px;top:7px;border:1px solid var(--line);border-bottom-color:#c7c7cc;background:#fafafa;border-radius:4px;color:#a1a1aa;font-size:10px;padding:2px 5px}
.select{height:32px;border:1px solid var(--line-strong);border-radius:6px;background:#fff;padding:0 28px 0 10px;font-size:12px;outline:none}
.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:960px}th{height:38px;padding:0 12px;text-align:left;background:#fafafa;color:#71717a;font-size:11px;font-weight:600;border-bottom:1px solid var(--line);white-space:nowrap}td{height:58px;padding:8px 12px;border-bottom:1px solid #eeeeef;vertical-align:middle;font-size:13px}tbody tr:last-child td{border-bottom:0}tbody tr{transition:background .1s}tbody tr:hover{background:#fafafa}.check-col{width:42px;text-align:center}.check-col input{width:15px;height:15px;accent-color:#18181b}.product-cell{display:flex;align-items:center;gap:10px;min-width:260px}.thumb{width:38px;height:38px;border:1px solid var(--line);border-radius:6px;background:#f4f4f5;object-fit:cover;flex:none}.product-main{min-width:0}.product-title{font-weight:600;color:#27272a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px}.product-sub{font-size:11px;color:#a1a1aa;margin-top:3px}.money{font-variant-numeric:tabular-nums}.muted{color:#71717a}.status{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600}.status:before{content:"";width:6px;height:6px;border-radius:50%;background:#98a2b3}.status.live{color:#067647}.status.live:before{background:#12b76a}.status.hidden{color:#71717a}.stock-low{color:#b54708}.stock-out{color:#b42318}.row-menu{width:30px;height:30px;border:0;background:transparent;border-radius:5px;color:#71717a;font-size:18px;line-height:1}.row-menu:hover{background:#f1f1f2;color:#18181b}
.selection-bar{min-height:52px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);background:#fafafa}.selection-bar strong{font-size:12px}.selection-actions{display:flex;gap:8px}
.table-footer{height:48px;padding:0 14px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;color:#71717a;font-size:12px}.pagination{display:flex;align-items:center;gap:6px}.page-btn{height:30px;border:1px solid var(--line);background:#fff;border-radius:5px;padding:0 9px;font-size:12px}.page-btn:hover:not(:disabled){background:#f4f4f5}
.empty{padding:64px 20px;text-align:center;color:#71717a}.empty strong{display:block;color:#27272a;font-size:14px;margin-bottom:5px}
.detail-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(280px,1fr);gap:16px;align-items:start}.stack{display:grid;gap:16px}.card{background:#fff;border:1px solid var(--line);border-radius:9px;box-shadow:var(--shadow)}.card-head{padding:16px 18px;border-bottom:1px solid var(--line)}.card-head h2{font-size:14px;margin:0;font-weight:650}.card-head p{margin:4px 0 0;color:#71717a;font-size:12px}.card-body{padding:18px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.field.span2{grid-column:1/-1}.field label{display:block;font-size:12px;font-weight:600;color:#3f3f46;margin-bottom:6px}.field input,.field textarea,.field select{width:100%;border:1px solid var(--line-strong);border-radius:6px;background:#fff;outline:none;font-size:13px;padding:0 10px}.field input,.field select{height:36px}.field textarea{min-height:116px;padding:9px 10px;resize:vertical;line-height:1.45}.field input:focus,.field textarea:focus,.field select:focus{border-color:#a1a1aa;box-shadow:0 0 0 3px #f4f4f5}.hint{font-size:11px;color:#a1a1aa;margin-top:5px;line-height:1.4}.switch-row{display:flex;align-items:center;justify-content:space-between;gap:18px}.switch-copy strong{display:block;font-size:13px}.switch-copy span{display:block;font-size:11px;color:#71717a;margin-top:3px}.switch{position:relative;width:34px;height:20px;flex:none}.switch input{opacity:0;width:0;height:0}.switch i{position:absolute;inset:0;border-radius:999px;background:#d4d4d8;transition:.15s}.switch i:after{content:"";position:absolute;width:16px;height:16px;left:2px;top:2px;background:#fff;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:.15s}.switch input:checked+i{background:#18181b}.switch input:checked+i:after{transform:translateX(14px)}
.media-preview{width:100%;aspect-ratio:4/3;border:1px dashed var(--line-strong);border-radius:7px;background:#fafafa;display:grid;place-items:center;overflow:hidden;color:#a1a1aa}.media-preview img{width:100%;height:100%;object-fit:cover}.media-empty{text-align:center;font-size:12px}.media-empty svg{width:20px;height:20px;margin:0 auto 7px}
.detail-back{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;color:#71717a;padding:0;margin-bottom:10px;font-size:12px}.detail-back:hover{color:#18181b}.detail-back svg{width:13px;height:13px}
.save-strip{position:sticky;bottom:16px;margin-top:16px;background:#18181b;color:#fff;border-radius:8px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,.22);z-index:20}.save-strip span{font-size:12px;color:#d4d4d8}.save-strip .btn{border-color:#3f3f46;background:#27272a;color:#fff}.save-strip .btn-primary{background:#fff;color:#18181b;border-color:#fff}
.menu-popover{position:fixed;z-index:100;width:180px;background:#fff;border:1px solid var(--line);border-radius:7px;box-shadow:0 8px 30px rgba(0,0,0,.12);padding:5px}.menu-popover button{width:100%;height:32px;border:0;background:#fff;border-radius:5px;text-align:left;padding:0 9px;font-size:12px}.menu-popover button:hover{background:#f4f4f5}.menu-popover .danger{color:#b42318}
.dialog{position:fixed;z-index:130;inset:0;background:rgba(24,24,27,.32);display:grid;place-items:center;padding:20px}.dialog-card{width:min(460px,100%);background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 24px 70px rgba(0,0,0,.2)}.dialog-head{padding:18px 20px;border-bottom:1px solid var(--line)}.dialog-head h2{margin:0;font-size:16px}.dialog-head p{margin:5px 0 0;color:#71717a;font-size:12px}.dialog-body{padding:18px 20px}.dialog-actions{padding:12px 20px;border-top:1px solid var(--line);display:flex;justify-content:flex-end;gap:8px}
.toast{position:fixed;right:20px;bottom:20px;z-index:200;background:#18181b;color:#fff;padding:10px 12px;border-radius:7px;font-size:12px;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.login{min-height:100vh;display:grid;place-items:center;background:#f7f7f8;padding:20px}.login-card{width:min(400px,100%);background:#fff;border:1px solid var(--line);border-radius:10px;padding:28px;box-shadow:var(--shadow)}.login-brand{display:flex;align-items:center;gap:9px;margin-bottom:28px}.login-card h1{font-size:20px;margin:0 0 6px}.login-card>p{color:#71717a;font-size:12px;margin:0 0 22px}.login-card label{display:block;font-size:12px;font-weight:600;margin:14px 0 6px}.login-card input{width:100%;height:38px;border:1px solid var(--line-strong);border-radius:6px;padding:0 10px;outline:none}.login-card input:focus{border-color:#a1a1aa;box-shadow:0 0 0 3px #f4f4f5}.login-card .btn{width:100%;justify-content:center;margin-top:20px;height:38px}.error{margin-top:12px;color:#b42318;font-size:12px}
.command{position:fixed;z-index:180;inset:0;background:rgba(24,24,27,.28);display:flex;align-items:flex-start;justify-content:center;padding-top:12vh}.command-card{width:min(620px,calc(100% - 24px));background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 24px 70px rgba(0,0,0,.2);overflow:hidden}.command-card input{width:100%;height:50px;border:0;border-bottom:1px solid var(--line);padding:0 15px;outline:none}.command-results{padding:6px;max-height:400px;overflow:auto}.command-item{width:100%;height:42px;border:0;background:#fff;border-radius:6px;padding:0 10px;display:flex;align-items:center;justify-content:space-between;text-align:left}.command-item:hover{background:#f4f4f5}.command-item small{color:#a1a1aa}
.home-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:16px}.metric-row{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}.metric{padding:16px 18px;border-right:1px solid var(--line)}.metric:last-child{border-right:0}.metric label{display:block;color:#71717a;font-size:11px;margin-bottom:8px}.metric strong{font-size:20px;font-weight:650}.task-list{display:grid}.task{padding:13px 18px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;align-items:center}.task:last-child{border-bottom:0}.task strong{font-size:13px}.task span{display:block;color:#71717a;font-size:11px;margin-top:3px}.task button{border:0;background:transparent;color:#52525b;font-size:12px}.task button:hover{color:#18181b;text-decoration:underline}
@media(max-width:980px){.app-shell{grid-template-columns:190px 1fr}.page{padding:24px 20px}.detail-grid,.home-grid{grid-template-columns:1fr}.metric-row{grid-template-columns:1fr 1fr}.metric:nth-child(2){border-right:0}.metric:nth-child(-n+2){border-bottom:1px solid var(--line)}}
@media(max-width:720px){.app-shell{grid-template-columns:1fr}.sidebar{display:none}.topbar{padding:0 14px}.page{padding:20px 14px}.page-heading{align-items:flex-start;flex-direction:column}.toolbar{align-items:stretch;flex-direction:column}.toolbar-left,.toolbar-right{width:100%;flex-wrap:wrap}.search{width:100%}.detail-grid{grid-template-columns:1fr}.form-grid{grid-template-columns:1fr}.field.span2{grid-column:auto}.metric-row{grid-template-columns:1fr}.metric{border-right:0!important;border-bottom:1px solid var(--line)}.metric:last-child{border-bottom:0}}
</style>
</head>
<body>
<div id="app"></div>
<script>
const app=document.getElementById('app');
let csrf='',products=[],dashboard=null,securityConfigured=false,view='products',editingId=null,dirty=false;
let searchQuery='',statusFilter='all',categoryFilter='all',sortMode='manual',page=1;const pageSize=20;let selected=new Set();

const icons={
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7 8 4 8-4"/><path d="M4 7v10l8 4 8-4V7"/><path d="M12 11v10"/></svg>',
  order:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3V9.6h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.2.4.6.8 1 1 .3.2.7.3 1.1.3h.1v4h-.1a1.7 1.7 0 0 0-1.1.4 1.7 1.7 0 0 0-1 1Z"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  command:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6a3 3 0 1 1-3-3v6a3 3 0 1 1 3-3Zm6 0a3 3 0 1 0 3-3v6a3 3 0 1 0-3-3ZM9 18a3 3 0 1 0-3 3v-6a3 3 0 1 0 3 3Zm6 0a3 3 0 1 1 3 3v-6a3 3 0 1 1-3 3Z"/></svg>'
};
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
const money=n=>'£'+Number(n||0).toFixed(2);

async function api(path,opts={}){
  const r=await fetch(path,{credentials:'include',...opts,headers:{'content-type':'application/json',...(csrf?{'x-csrf-token':csrf}:{}),...(opts.headers||{})}});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(data.error||'Request failed');
  return data
}

async function showLogin(msg=''){
  try{securityConfigured=(await api('/api/admin/security/status')).configured}catch{}
  if(!securityConfigured)return setupView(msg);
  app.innerHTML='<div class="login"><form class="login-card" id="loginForm"><div class="login-brand"><div class="brand-mark">SD</div><div class="brand-name">STANDARD DOSE</div></div><h1>Sign in to Admin</h1><p>Enter your admin credentials to continue.</p><label>Email</label><input id="email" type="email" autocomplete="username" required autofocus><label>Password</label><input id="password" type="password" autocomplete="current-password" required><label>Authentication code</label><input id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required><button class="btn btn-primary">Sign in</button>'+(msg?'<div class="error">'+esc(msg)+'</div>':'')+'</form></div>';
  document.getElementById('loginForm').onsubmit=async e=>{e.preventDefault();try{const d=await api('/api/admin/login',{method:'POST',body:JSON.stringify({email:email.value,password:password.value,code:code.value})});csrf=d.csrfToken;await load()}catch(err){showLogin(err.message)}}
}
async function setupView(msg=''){
  try{
    const d=await api('/api/admin/security/bootstrap');if(d.configured){securityConfigured=true;return showLogin()}
    app.innerHTML='<div class="login"><form class="login-card" id="setupForm"><div class="login-brand"><div class="brand-mark">SD</div><div class="brand-name">STANDARD DOSE</div></div><h1>Set up Admin</h1><p>Create the credentials for this store.</p><label>Email</label><input id="setupEmail" type="email" required autofocus><label>Password</label><input id="setupPassword" type="password" minlength="14" required><label>Authentication code</label><input id="setupCode" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" required><button class="btn btn-primary">Continue</button>'+(msg?'<div class="error">'+esc(msg)+'</div>':'')+'</form></div>';
    setupForm.onsubmit=async e=>{e.preventDefault();try{const created=await api('/api/admin/security/setup',{method:'POST',body:JSON.stringify({email:setupEmail.value,password:setupPassword.value,code:setupCode.value})});csrf=created.csrfToken;securityConfigured=true;await load()}catch(err){setupView(err.message)}}
  }catch(err){showLogin(err.message)}
}
async function check(){try{const d=await api('/api/admin/session');csrf=d.csrfToken;if(d.setupRequired)await setupView();else await load()}catch{showLogin()}}
async function load(){
  const results=await Promise.all([api('/api/admin/dashboard'),api('/api/admin/products')]);
  dashboard=results[0];products=results[1].products;selected=new Set([...selected].filter(id=>products.some(p=>p.id===id)));render()
}
function shell(content,crumb='Products'){
  return '<div class="app-shell"><aside class="sidebar"><div class="brand"><div class="brand-mark">SD</div><div class="brand-name">STANDARD DOSE</div></div><div class="nav-section">Store</div><div class="nav"><button class="nav-button '+(view==='home'?'active':'')+'" id="navHome">'+icons.home+'<span>Home</span></button><button class="nav-button '+(view==='products'||view==='detail'?'active':'')+'" id="navProducts">'+icons.box+'<span>Products</span></button><button class="nav-button" disabled>'+icons.order+'<span>Orders</span><span class="soon">Soon</span></button><button class="nav-button" disabled>'+icons.users+'<span>Customers</span><span class="soon">Soon</span></button></div><div class="nav-section">System</div><div class="nav"><button class="nav-button" disabled>'+icons.settings+'<span>Settings</span><span class="soon">Soon</span></button></div><div class="sidebar-footer"><button class="store-link" id="viewStore">'+icons.chevron+'<span>View storefront</span></button><button class="signout" id="logout">Sign out</button></div></aside><section class="workspace"><header class="topbar"><div class="breadcrumbs"><span>Standard Dose</span><span>/</span><strong>'+esc(crumb)+'</strong></div><div class="top-actions"><button class="icon-button" id="commandButton" title="Quick search">'+icons.search+'</button><div class="user-dot">SD</div></div></header>'+content+'</section></div>'
}
function wireShell(){
  document.getElementById('navHome').onclick=()=>{view='home';editingId=null;render()};
  document.getElementById('navProducts').onclick=()=>{view='products';editingId=null;dirty=false;render()};
  document.getElementById('viewStore').onclick=()=>window.open('https://standarddose.co.uk','_blank','noopener');
  document.getElementById('logout').onclick=logout;
  document.getElementById('commandButton').onclick=openCommand
}
function filtered(){
  const q=searchQuery.trim().toLowerCase();
  let list=products.filter(p=>(!q||[p.name,p.variantId,p.category,p.tag,p.supplier].join(' ').toLowerCase().includes(q))&&(statusFilter==='all'||(statusFilter==='live'?p.enabled:!p.enabled))&&(categoryFilter==='all'||p.category===categoryFilter));
  list=[...list].sort((a,b)=>sortMode==='name'?a.name.localeCompare(b.name):sortMode==='price-asc'?a.price-b.price:sortMode==='price-desc'?b.price-a.price:sortMode==='stock'?Number(a.stockOnHand||0)-Number(b.stockOnHand||0):Number(a.sortOrder||0)-Number(b.sortOrder||0));
  return list
}
function render(){
  if(view==='home')return renderHome();
  if(view==='detail')return renderDetail();
  return renderProducts()
}
function renderHome(){
  const hidden=products.filter(p=>!p.enabled).length,missing=products.filter(p=>!p.image).length,low=products.filter(p=>p.stock==='low'||p.stock==='out').length;
  const tasks=[];
  if(missing)tasks.push({title:'Add product imagery',copy:missing+' product'+(missing===1?'':'s')+' without a primary image',filter:'image'});
  if(low)tasks.push({title:'Review inventory',copy:low+' product'+(low===1?'':'s')+' low or out of stock',filter:'stock'});
  if(hidden)tasks.push({title:'Review hidden products',copy:hidden+' product'+(hidden===1?'':'s')+' not published',filter:'hidden'});
  const taskHtml=tasks.length?tasks.map(t=>'<div class="task"><div><strong>'+esc(t.title)+'</strong><span>'+esc(t.copy)+'</span></div><button class="task-open" data-filter="'+t.filter+'">Review</button></div>').join(''):'<div class="empty"><strong>Everything looks tidy</strong>No catalogue issues need attention.</div>';
  const content='<main class="page"><div class="page-heading"><div><h1>Home</h1><p>Store health and catalogue activity.</p></div></div><div class="home-grid"><section class="surface"><div class="metric-row"><div class="metric"><label>Products</label><strong>'+products.length+'</strong></div><div class="metric"><label>Live</label><strong>'+Number(dashboard.products||0)+'</strong></div><div class="metric"><label>Low stock</label><strong>'+Number(dashboard.lowStock||0)+'</strong></div><div class="metric"><label>Hidden</label><strong>'+hidden+'</strong></div></div><div class="card-head"><h2>Needs attention</h2><p>Catalogue items that may need a quick review.</p></div><div class="task-list">'+taskHtml+'</div></section><section class="card"><div class="card-head"><h2>Quick actions</h2><p>Common catalogue tasks.</p></div><div class="task-list"><div class="task"><div><strong>Create product</strong><span>Add a new item to the catalogue.</span></div><button id="homeCreate">Create</button></div><div class="task"><div><strong>Open catalogue</strong><span>Search, filter and manage products.</span></div><button id="homeProducts">Open</button></div></div></section></div></main>';
  app.innerHTML=shell(content,'Home');wireShell();homeCreate.onclick=openCreateDialog;homeProducts.onclick=()=>{view='products';render()};
  document.querySelectorAll('.task-open').forEach(b=>b.onclick=()=>{view='products';if(b.dataset.filter==='hidden')statusFilter='hidden';if(b.dataset.filter==='stock')sortMode='stock';render()})
}
function renderProducts(){
  const allCount=products.length,liveCount=products.filter(p=>p.enabled).length,hiddenCount=allCount-liveCount;
  const list=filtered(),pages=Math.max(1,Math.ceil(list.length/pageSize));if(page>pages)page=pages;
  const slice=list.slice((page-1)*pageSize,page*pageSize);
  const rows=slice.map(p=>'<tr data-row="'+esc(p.id)+'"><td class="check-col"><input class="rowcheck" type="checkbox" data-id="'+esc(p.id)+'" '+(selected.has(p.id)?'checked':'')+'></td><td><div class="product-cell">'+(p.image?'<img class="thumb" src="'+esc(p.image)+'" alt="">':'<div class="thumb"></div>')+'<div class="product-main"><div class="product-title">'+esc(p.name)+'</div><div class="product-sub">'+esc(p.variantId)+'</div></div></div></td><td><span class="status '+(p.enabled?'live':'hidden')+'">'+(p.enabled?'Active':'Hidden')+'</span></td><td class="'+(p.stock==='low'?'stock-low':p.stock==='out'?'stock-out':'')+'">'+Number(p.stockOnHand||0)+' in stock</td><td class="money">'+money(p.price)+'</td><td class="muted">'+esc(p.category)+'</td><td class="muted">'+esc(p.supplier||'—')+'</td><td><button class="row-menu" data-menu="'+esc(p.id)+'" aria-label="Product actions">•••</button></td></tr>').join('');
  const bulk=selected.size?'<div class="selection-bar"><strong>'+selected.size+' selected</strong><div class="selection-actions"><button class="btn" id="bulkClear">Clear</button><button class="btn" id="bulkArchive">Archive</button><button class="btn btn-primary" id="bulkPublish">Publish</button></div></div>':'<div class="toolbar"><div class="toolbar-left"><div class="search">'+icons.search+'<input id="productSearch" placeholder="Search products" value="'+esc(searchQuery)+'"><kbd>/</kbd></div><select class="select" id="categoryFilter"><option value="all">All categories</option>'+['Espresso','Iced','Matcha','Coffee','Setup'].map(x=>'<option '+(categoryFilter===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div><div class="toolbar-right"><select class="select" id="sortMode"><option value="manual">Manual order</option><option value="name" '+(sortMode==='name'?'selected':'')+'>Name A–Z</option><option value="price-asc" '+(sortMode==='price-asc'?'selected':'')+'>Price: low to high</option><option value="price-desc" '+(sortMode==='price-desc'?'selected':'')+'>Price: high to low</option><option value="stock" '+(sortMode==='stock'?'selected':'')+'>Stock: low to high</option></select></div></div>';
  const content='<main class="page"><div class="page-heading"><div><h1>Products</h1><p>Manage products, pricing, inventory and storefront visibility.</p></div><div class="actions"><button class="btn" disabled>Export</button><button class="btn btn-primary" id="createProduct">'+icons.plus+'Create product</button></div></div><section class="surface"><div class="tabs"><button class="tab '+(statusFilter==='all'?'active':'')+'" data-status="all">All <span class="tab-count">'+allCount+'</span></button><button class="tab '+(statusFilter==='live'?'active':'')+'" data-status="live">Active <span class="tab-count">'+liveCount+'</span></button><button class="tab '+(statusFilter==='hidden'?'active':'')+'" data-status="hidden">Hidden <span class="tab-count">'+hiddenCount+'</span></button></div>'+bulk+'<div class="table-wrap"><table><thead><tr><th class="check-col"><input id="selectPage" type="checkbox" '+(slice.length&&slice.every(p=>selected.has(p.id))?'checked':'')+'></th><th>Product</th><th>Status</th><th>Inventory</th><th>Price</th><th>Category</th><th>Supplier</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>'+(slice.length?'':'<div class="empty"><strong>No products found</strong>Try adjusting your search or filters.</div>')+'</div><div class="table-footer"><span>Showing '+(slice.length?((page-1)*pageSize+1):0)+'–'+Math.min(page*pageSize,list.length)+' of '+list.length+'</span><div class="pagination"><button class="page-btn" id="prevPage" '+(page<=1?'disabled':'')+'>Previous</button><span>Page '+page+' of '+pages+'</span><button class="page-btn" id="nextPage" '+(page>=pages?'disabled':'')+'>Next</button></div></div></section></main>';
  app.innerHTML=shell(content,'Products');wireShell();
  createProduct.onclick=openCreateDialog;
  document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{statusFilter=b.dataset.status;page=1;selected.clear();render()});
  if(!selected.size){
    productSearch.oninput=e=>{searchQuery=e.target.value;page=1;render();const s=document.getElementById('productSearch');if(s){s.focus();s.setSelectionRange(searchQuery.length,searchQuery.length)}};
    categoryFilter.onchange=e=>{categoryFilter=e.target.value;page=1;render()};
    sortMode.onchange=e=>{sortMode=e.target.value;page=1;render()}
  }else{
    bulkClear.onclick=()=>{selected.clear();render()};bulkArchive.onclick=()=>bulkAction('archive');bulkPublish.onclick=()=>bulkAction('publish')
  }
  selectPage.onchange=e=>{slice.forEach(p=>e.target.checked?selected.add(p.id):selected.delete(p.id));render()};
  document.querySelectorAll('.rowcheck').forEach(x=>x.onclick=e=>e.stopPropagation());
  document.querySelectorAll('.rowcheck').forEach(x=>x.onchange=()=>{x.checked?selected.add(x.dataset.id):selected.delete(x.dataset.id);render()});
  document.querySelectorAll('tr[data-row]').forEach(r=>r.onclick=e=>{if(e.target.closest('button,input'))return;openProduct(r.dataset.row)});
  document.querySelectorAll('.row-menu').forEach(b=>b.onclick=e=>{e.stopPropagation();openRowMenu(b,b.dataset.menu)});
  prevPage.onclick=()=>{page--;render()};nextPage.onclick=()=>{page++;render()}
}
function openRowMenu(button,id){
  document.querySelector('.menu-popover')?.remove();
  const p=products.find(x=>x.id===id);if(!p)return;
  const rect=button.getBoundingClientRect(),menu=document.createElement('div');menu.className='menu-popover';menu.style.top=(rect.bottom+5)+'px';menu.style.left=Math.max(8,rect.right-180)+'px';
  menu.innerHTML='<button data-action="edit">Edit product</button><button data-action="toggle">'+(p.enabled?'Archive product':'Publish product')+'</button>';
  document.body.appendChild(menu);
  menu.querySelector('[data-action="edit"]').onclick=()=>{menu.remove();openProduct(id)};
  menu.querySelector('[data-action="toggle"]').onclick=async()=>{await api('/api/admin/products/'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify({enabled:!p.enabled})});menu.remove();showToast(p.enabled?'Product archived':'Product published');await load()};
  setTimeout(()=>document.addEventListener('click',()=>menu.remove(),{once:true}),0)
}
function openProduct(id){editingId=id;view='detail';dirty=false;render()}
function renderDetail(){
  const p=products.find(x=>x.id===editingId);if(!p){view='products';return renderProducts()}
  const content='<main class="page"><button class="detail-back" id="backProducts">'+icons.back+'Products</button><div class="page-heading"><div><h1>'+esc(p.name)+'</h1><p>'+esc(p.variantId)+' · '+esc(p.category)+'</p></div><div class="actions"><span class="status '+(p.enabled?'live':'hidden')+'">'+(p.enabled?'Active':'Hidden')+'</span><button class="btn" id="moreProduct">•••</button><button class="btn btn-primary" id="saveTop">Save</button></div></div><form id="productForm"><div class="detail-grid"><div class="stack"><section class="card"><div class="card-head"><h2>General</h2><p>Customer-facing product information.</p></div><div class="card-body"><div class="form-grid"><div class="field span2"><label>Title</label><input name="name" value="'+esc(p.name)+'" required></div><div class="field span2"><label>Description</label><textarea name="description">'+esc(p.description||'')+'</textarea></div></div></div></section><section class="card"><div class="card-head"><h2>Media</h2><p>Primary image shown on the storefront.</p></div><div class="card-body"><div class="media-preview" id="mediaPreview">'+(p.image?'<img src="'+esc(p.image)+'" alt="">':'<div class="media-empty">'+icons.image+'No product image</div>')+'</div><div class="field" style="margin-top:12px"><label>Image URL</label><input name="image" value="'+esc(p.image||'')+'" placeholder="https://"></div></div></section><section class="card"><div class="card-head"><h2>Pricing</h2><p>Storefront pricing and internal unit cost.</p></div><div class="card-body"><div class="form-grid"><div class="field"><label>Price</label><input name="price" type="number" step="0.01" min="0" value="'+Number(p.price||0)+'" required></div><div class="field"><label>Compare-at price</label><input name="compareAt" type="number" step="0.01" min="0" value="'+(p.compareAt??'')+'"></div><div class="field"><label>Cost per item</label><input name="cost" type="number" step="0.01" min="0" value="'+(p.cost??'')+'"><div class="hint">Private. Never shown on the storefront.</div></div></div></div></section></div><div class="stack"><section class="card"><div class="card-head"><h2>Status</h2></div><div class="card-body"><div class="switch-row"><div class="switch-copy"><strong>Published</strong><span>Visible on the storefront.</span></div><label class="switch"><input name="enabled" type="checkbox" '+(p.enabled?'checked':'')+'><i></i></label></div></div></section><section class="card"><div class="card-head"><h2>Inventory</h2></div><div class="card-body"><div class="field"><label>Stock on hand</label><input name="stockOnHand" type="number" min="0" value="'+Number(p.stockOnHand||0)+'"><div class="hint">0 = out of stock · 1–10 = low stock</div></div></div></section><section class="card"><div class="card-head"><h2>Organisation</h2></div><div class="card-body"><div class="form-grid"><div class="field span2"><label>Category</label><select name="category">'+['Espresso','Iced','Matcha','Coffee','Setup'].map(x=>'<option '+(p.category===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div><div class="field span2"><label>Badge</label><input name="tag" value="'+esc(p.tag||'')+'"></div><div class="field span2"><label>Compatibility</label><input name="compatibility" value="'+esc(p.compatibility||'')+'"></div><div class="field span2"><label>Sort order</label><input name="sortOrder" type="number" min="0" value="'+Number(p.sortOrder||0)+'"></div></div></div></section><section class="card"><div class="card-head"><h2>Identifiers</h2></div><div class="card-body"><div class="form-grid"><div class="field span2"><label>SKU</label><input name="variantId" value="'+esc(p.variantId||'')+'" required></div><div class="field span2"><label>Slug</label><input name="slug" value="'+esc(p.slug||'')+'" required></div></div></div></section><section class="card"><div class="card-head"><h2>Supplier</h2><p>Private fulfilment information.</p></div><div class="card-body"><div class="form-grid"><div class="field span2"><label>Supplier</label><input name="supplier" value="'+esc(p.supplier||'')+'"></div><div class="field span2"><label>Supplier SKU</label><input name="supplierSku" value="'+esc(p.supplierSku||'')+'"></div><div class="field span2"><label>Supplier URL</label><input name="supplierUrl" value="'+esc(p.supplierUrl||'')+'"></div><div class="field"><label>Lead time</label><input name="leadTime" value="'+esc(p.leadTime||'')+'"></div><div class="field"><label>Fulfilment</label><input name="fulfilmentMethod" value="'+esc(p.fulfilmentMethod||'')+'"></div></div></div></section></div></div><div class="save-strip" id="saveStrip" style="display:none"><span>Unsaved changes</span><div class="actions"><button class="btn" type="button" id="discardChanges">Discard</button><button class="btn btn-primary" type="submit">Save changes</button></div></div></form></main>';
  app.innerHTML=shell(content,'Products / '+p.name);wireShell();
  const form=document.getElementById('productForm'),saveStrip=document.getElementById('saveStrip');
  const markDirty=()=>{dirty=true;saveStrip.style.display='flex'};form.addEventListener('input',markDirty);form.addEventListener('change',markDirty);
  form.elements.image.addEventListener('change',()=>{const v=form.elements.image.value.trim();mediaPreview.innerHTML=v?'<img src="'+esc(v)+'" alt="">':'<div class="media-empty">'+icons.image+'No product image</div>'});
  backProducts.onclick=()=>{if(dirty&&!confirm('Discard unsaved changes?'))return;view='products';editingId=null;dirty=false;render()};
  discardChanges.onclick=()=>{dirty=false;renderDetail()};
  saveTop.onclick=()=>saveProduct(form,p);
  form.onsubmit=e=>{e.preventDefault();saveProduct(form,p)};
  moreProduct.onclick=e=>{openDetailMenu(e.currentTarget,p)}
}
async function saveProduct(form,p){
  const fd=new FormData(form),payload=Object.fromEntries(fd.entries());
  payload.enabled=fd.get('enabled')==='on';payload.price=Number(payload.price);payload.stockOnHand=Number(payload.stockOnHand);payload.sortOrder=Number(payload.sortOrder||0);
  if(payload.compareAt!=='')payload.compareAt=Number(payload.compareAt);else payload.compareAt='';
  if(payload.cost!=='')payload.cost=Number(payload.cost);else delete payload.cost;
  try{await api('/api/admin/products/'+encodeURIComponent(p.id),{method:'PATCH',body:JSON.stringify(payload)});dirty=false;showToast('Changes saved');await load();editingId=p.id;view='detail';render()}catch(err){showToast(err.message)}
}
function openDetailMenu(button,p){
  document.querySelector('.menu-popover')?.remove();
  const rect=button.getBoundingClientRect(),menu=document.createElement('div');menu.className='menu-popover';menu.style.top=(rect.bottom+5)+'px';menu.style.left=Math.max(8,rect.right-180)+'px';
  menu.innerHTML='<button id="toggleDetail">'+(p.enabled?'Archive product':'Publish product')+'</button>';
  document.body.appendChild(menu);toggleDetail.onclick=async()=>{await api('/api/admin/products/'+encodeURIComponent(p.id),{method:'PATCH',body:JSON.stringify({enabled:!p.enabled})});menu.remove();showToast(p.enabled?'Product archived':'Product published');await load();editingId=p.id;view='detail';render()}
}
function slugify(v){return String(v||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function openCreateDialog(){
  const wrap=document.createElement('div');wrap.className='dialog';
  wrap.innerHTML='<form class="dialog-card" id="createForm"><div class="dialog-head"><h2>Create product</h2><p>Start with the essentials. You can add pricing, media and inventory next.</p></div><div class="dialog-body"><div class="form-grid"><div class="field span2"><label>Title</label><input name="name" required autofocus></div><div class="field span2"><label>Category</label><select name="category">'+['Espresso','Iced','Matcha','Coffee','Setup'].map(x=>'<option>'+x+'</option>').join('')+'</select></div><div class="field span2"><label>SKU</label><input name="variantId" required><div class="hint">Generated automatically from the title; edit if needed.</div></div></div></div><div class="dialog-actions"><button class="btn" type="button" id="cancelCreate">Cancel</button><button class="btn btn-primary">Create product</button></div></form>';
  document.body.appendChild(wrap);const form=wrap.querySelector('form'),name=form.elements.name,sku=form.elements.variantId;let skuTouched=false;
  name.oninput=()=>{if(!skuTouched)sku.value=slugify(name.value)};sku.oninput=()=>skuTouched=true;
  cancelCreate.onclick=()=>wrap.remove();wrap.onclick=e=>{if(e.target===wrap)wrap.remove()};
  form.onsubmit=async e=>{e.preventDefault();const title=name.value.trim(),slug=slugify(title);try{const d=await api('/api/admin/products',{method:'POST',body:JSON.stringify({name:title,slug,variantId:sku.value.trim(),category:form.elements.category.value,price:0,stockOnHand:0,enabled:false,description:'',tag:''})});wrap.remove();await load();editingId=d.product.id;view='detail';dirty=false;render()}catch(err){showToast(err.message)}}
}
async function bulkAction(action){const ids=[...selected];await api('/api/admin/products/bulk',{method:'POST',body:JSON.stringify({ids,action})});selected.clear();showToast(action==='publish'?'Products published':'Products archived');await load()}
function openCommand(){
  if(document.querySelector('.command'))return;
  const wrap=document.createElement('div');wrap.className='command';wrap.innerHTML='<div class="command-card"><input id="commandInput" placeholder="Search products or actions…"><div class="command-results" id="commandResults"></div></div>';document.body.appendChild(wrap);
  const input=commandInput,results=commandResults;
  const paint=()=>{const q=input.value.toLowerCase().trim(),matches=products.filter(p=>!q||[p.name,p.variantId,p.category].join(' ').toLowerCase().includes(q)).slice(0,8);results.innerHTML='<button class="command-item" data-action="create"><strong>Create product</strong><small>Action</small></button><button class="command-item" data-action="products"><strong>Open products</strong><small>Navigation</small></button>'+matches.map(p=>'<button class="command-item" data-id="'+esc(p.id)+'"><strong>'+esc(p.name)+'</strong><small>'+esc(p.variantId)+'</small></button>').join('');results.querySelector('[data-action="create"]').onclick=()=>{wrap.remove();openCreateDialog()};results.querySelector('[data-action="products"]').onclick=()=>{wrap.remove();view='products';render()};results.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{wrap.remove();openProduct(b.dataset.id)})};
  paint();input.oninput=paint;input.focus();wrap.onclick=e=>{if(e.target===wrap)wrap.remove()};input.onkeydown=e=>{if(e.key==='Escape')wrap.remove()}
}
function showToast(message){document.querySelector('.toast')?.remove();const t=document.createElement('div');t.className='toast';t.textContent=message;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
async function logout(){try{await api('/api/admin/logout',{method:'POST'})}catch{}csrf='';showLogin()}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(document.querySelector('.app-shell'))openCommand()}else if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){const s=document.getElementById('productSearch');if(s){e.preventDefault();s.focus()}}});
check();
</script>
</body>
</html>`;

export function adminResponse() {
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, private',
      'x-robots-tag': 'noindex, nofollow,noarchive',
      'content-security-policy': "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; img-src 'self' https: data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
      'x-frame-options': 'DENY',
      'referrer-policy': 'no-referrer',
    },
  });
}
