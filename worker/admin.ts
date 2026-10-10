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
  --bg:#14242c;--bg-deep:#102029;--sidebar:#203943;--sidebar-hover:#294751;--sidebar-active:#31535f;
  --surface:#182d36;--surface-2:#1c333d;--surface-3:#213944;--field:#132730;
  --text:#e8f1f4;--text-strong:#f6fbfc;--muted:#94aeb8;--muted-2:#6f8994;
  --line:#29444e;--line-strong:#365864;--accent:#29c2f2;--accent-2:#6edcff;--accent-soft:rgba(41,194,242,.12);
  --success:#65d6a2;--success-bg:rgba(101,214,162,.12);--warn:#f1b45d;--warn-bg:rgba(241,180,93,.12);
  --danger:#ff8f8f;--danger-bg:rgba(255,143,143,.12);--shadow:0 14px 40px rgba(0,0,0,.18)
}
*{box-sizing:border-box}html,body{min-height:100%}
body{margin:0;background:linear-gradient(180deg,#13242c 0,#112129 100%);color:var(--text);-webkit-font-smoothing:antialiased;font-size:14px}
button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.42}svg{display:block}

.app-shell{min-height:100vh;display:grid;grid-template-columns:258px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:linear-gradient(180deg,#213c47 0,#1d3640 100%);border-right:1px solid rgba(255,255,255,.04);display:flex;flex-direction:column;padding:17px 14px 16px;box-shadow:8px 0 28px rgba(0,0,0,.08)}
.brand{height:48px;display:flex;align-items:center;padding:0 12px;margin-bottom:10px}
.brand-mark{width:30px;height:30px;border-radius:8px;background:linear-gradient(145deg,#42d6ff,#159cc8);color:#05222c;display:grid;place-items:center;font-size:10px;font-weight:900;letter-spacing:.02em;margin-right:10px;box-shadow:0 8px 18px rgba(30,187,231,.16)}
.brand-name{font-size:15px;font-weight:760;letter-spacing:-.02em;color:#f3fbfd}
.channel{height:38px;border:1px solid rgba(255,255,255,.06);background:rgba(5,24,31,.22);border-radius:8px;display:flex;align-items:center;gap:9px;padding:0 11px;margin:2px 4px 14px;color:#d8e7eb}
.channel-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px rgba(41,194,242,.09)}
.channel span{font-size:12px;font-weight:600}.channel small{margin-left:auto;color:#6f8994;font-size:10px}
.nav-section{margin:18px 0 6px;padding:0 12px;color:#78949f;text-transform:uppercase;font-size:10px;font-weight:750;letter-spacing:.1em}
.nav{display:grid;gap:2px}.nav-button{width:100%;height:35px;border:0;background:transparent;border-radius:7px;display:flex;align-items:center;gap:10px;padding:0 11px;color:#b9ccd3;text-align:left;font-weight:500;font-size:13px}
.nav-button:hover{background:rgba(255,255,255,.045);color:#f4fbfd}.nav-button.active{background:rgba(41,194,242,.11);color:#f6fcfe;box-shadow:inset 2px 0 0 var(--accent)}
.nav-button svg{width:15px;height:15px;stroke-width:1.7;color:#87a7b2}.nav-button.active svg{color:var(--accent-2)}
.nav-button .soon{margin-left:auto;color:#68848f;font-size:9px;text-transform:uppercase;letter-spacing:.06em}
.sidebar-footer{margin-top:auto;border-top:1px solid rgba(255,255,255,.05);padding-top:10px}.store-link,.signout{width:100%;height:36px;border:0;background:transparent;border-radius:7px;display:flex;align-items:center;gap:10px;padding:0 11px;color:#9eb6bf;text-align:left;font-size:12px}.store-link:hover,.signout:hover{background:rgba(255,255,255,.045);color:#eef8fb}.store-link svg{width:14px;height:14px}

.workspace{min-width:0;background:radial-gradient(circle at 82% 0,rgba(32,111,135,.10),transparent 28%),var(--bg-deep)}
.topbar{height:64px;background:rgba(15,31,39,.92);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.045);display:flex;align-items:center;justify-content:space-between;padding:0 28px;position:sticky;top:0;z-index:40}
.breadcrumbs{display:flex;align-items:center;gap:8px;color:#66848f;font-size:12px}.breadcrumbs strong{color:#c8d9de;font-weight:600}
.top-actions{display:flex;align-items:center;gap:10px}.icon-button{width:34px;height:34px;border:1px solid var(--line);background:#18313b;border-radius:8px;display:grid;place-items:center;color:#9cb4bd}.icon-button:hover{background:#203d48;border-color:#3a5964;color:#fff}.icon-button svg{width:15px;height:15px}
.user-chip{height:34px;border:1px solid var(--line);background:#18313b;border-radius:999px;display:flex;align-items:center;gap:8px;padding:0 10px 0 5px;color:#dfecef}.user-dot{width:24px;height:24px;border-radius:50%;background:linear-gradient(145deg,#31cfff,#139dc9);color:#062732;display:grid;place-items:center;font-size:9px;font-weight:800}.user-chip span{font-size:12px;font-weight:600}

.page{padding:34px 38px 56px;max-width:1540px;margin:0 auto}
.page-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-bottom:22px}.page-heading h1{font-size:25px;line-height:1.2;margin:0;font-weight:650;letter-spacing:-.03em;color:var(--text-strong)}.page-heading p{margin:6px 0 0;color:var(--muted);font-size:13px}
.actions{display:flex;align-items:center;gap:8px}.btn{height:35px;border-radius:7px;padding:0 12px;border:1px solid var(--line-strong);background:#18313b;font-size:12px;font-weight:650;display:inline-flex;align-items:center;gap:7px;color:#d8e8ed;box-shadow:0 1px 1px rgba(0,0,0,.12)}
.btn:hover{background:#213e49;border-color:#47707e}.btn-primary{background:linear-gradient(180deg,#2bc7f7,#1caad5);color:#052631;border-color:#36cbf9}.btn-primary:hover{background:linear-gradient(180deg,#4bd5ff,#23b5e1)}.btn-danger{color:var(--danger);border-color:#68474b;background:#203139}.btn svg{width:14px;height:14px}

.surface,.card{background:linear-gradient(180deg,#192f38 0,#172b34 100%);border:1px solid var(--line);border-radius:7px;box-shadow:0 8px 28px rgba(0,0,0,.12);overflow:hidden}
.tabs{height:47px;display:flex;align-items:flex-end;padding:0 17px;border-bottom:1px solid var(--line);gap:21px}.tab{height:47px;border:0;background:transparent;padding:0 1px;border-bottom:2px solid transparent;color:#78949f;font-size:12px}.tab:hover{color:#d9e8ec}.tab.active{border-bottom-color:var(--accent);color:#e8f6fa;font-weight:650}.tab-count{margin-left:5px;color:#607c87;font-size:10px}
.toolbar{min-height:55px;padding:10px 13px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);background:rgba(12,30,38,.17)}.toolbar-left{flex:1;display:flex;align-items:center;gap:8px;min-width:0}.toolbar-right{display:flex;align-items:center;gap:8px}
.search{position:relative;width:min(420px,100%)}.search svg{position:absolute;left:10px;top:9px;width:14px;height:14px;color:#63818d}.search input{width:100%;height:34px;border:1px solid var(--line-strong);border-radius:7px;background:#10252e;padding:0 34px 0 31px;outline:none;font-size:12px;color:#e9f4f7}.search input::placeholder{color:#5d7984}.search input:focus{border-color:#4f8799;box-shadow:0 0 0 3px rgba(41,194,242,.08)}.search kbd{position:absolute;right:8px;top:7px;border:1px solid #36515c;background:#19313a;border-radius:4px;color:#708d98;font-size:9px;padding:2px 5px}
.select{height:34px;border:1px solid var(--line-strong);border-radius:7px;background:#10252e;padding:0 28px 0 10px;font-size:11px;outline:none;color:#c7d8de}

.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:980px}th{height:40px;padding:0 13px;text-align:left;background:#152a33;color:#78949f;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.055em;border-bottom:1px solid var(--line);white-space:nowrap}td{height:60px;padding:8px 13px;border-bottom:1px solid rgba(63,92,102,.34);vertical-align:middle;font-size:12px;color:#c6d8de}tbody tr:last-child td{border-bottom:0}tbody tr{transition:background .12s}tbody tr:hover{background:#1b3540}
.check-col{width:42px;text-align:center}.check-col input{width:15px;height:15px;accent-color:#29c2f2}.product-cell{display:flex;align-items:center;gap:11px;min-width:270px}.thumb{width:40px;height:40px;border:1px solid #38535e;border-radius:7px;background:#10242d;object-fit:cover;flex:none}.product-main{min-width:0}.product-title{font-weight:650;color:#eff8fa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:300px}.product-sub{font-size:10px;color:#6e8b96;margin-top:4px}.money{font-variant-numeric:tabular-nums;color:#e8f3f6}.muted{color:#7f9aa4}.margin-good{color:#7de0b5;font-weight:650}.margin-ok{color:#f1bd73;font-weight:650}.margin-low{color:#ff9898;font-weight:650}.source-link{display:inline-flex;align-items:center;gap:5px;margin-top:7px;color:#6fdcff;font-size:10px;text-decoration:none}.source-link:hover{color:#a4ecff;text-decoration:underline}.pricing-summary{margin-top:14px;padding-top:14px;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.pricing-summary div{background:#132730;border:1px solid var(--line);border-radius:7px;padding:10px}.pricing-summary span{display:block;font-size:9px;color:#6f8994;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}.pricing-summary strong{font-size:13px;color:#edf7f9}.status{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:650}.status:before{content:"";width:6px;height:6px;border-radius:50%;background:#6e8791}.status.live{color:#8ce2ba}.status.live:before{background:#4fd29b;box-shadow:0 0 0 3px rgba(79,210,155,.08)}.status.hidden{color:#819ba5}.stock-low{color:#f1bd73}.stock-out{color:#ff9898}.row-menu{width:30px;height:30px;border:0;background:transparent;border-radius:6px;color:#6f8b95;font-size:18px;line-height:1}.row-menu:hover{background:#25424d;color:#dfeff3}
.selection-bar{min-height:55px;padding:9px 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);background:#1b343e}.selection-bar strong{font-size:11px;color:#dbeaf0}.selection-actions{display:flex;gap:8px}
.table-footer{height:49px;padding:0 14px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;color:#6f8994;font-size:11px;background:#152a33}.pagination{display:flex;align-items:center;gap:7px}.page-btn{height:30px;border:1px solid var(--line);background:#18313b;color:#a7bdc5;border-radius:6px;padding:0 9px;font-size:11px}.page-btn:hover:not(:disabled){background:#23414c;color:#fff}.empty{padding:66px 20px;text-align:center;color:#78949f}.empty strong{display:block;color:#dbe9ed;font-size:13px;margin-bottom:5px}

.detail-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(300px,.95fr);gap:18px;align-items:start}.stack{display:grid;gap:18px}
.card-head{padding:17px 19px;border-bottom:1px solid var(--line)}.card-head h2{font-size:13px;margin:0;font-weight:680;color:#eaf5f8}.card-head p{margin:5px 0 0;color:#728e98;font-size:11px}.card-body{padding:19px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.field.span2{grid-column:1/-1}.field label{display:block;font-size:11px;font-weight:650;color:#a9bec6;margin-bottom:6px}.field input,.field textarea,.field select{width:100%;border:1px solid var(--line-strong);border-radius:7px;background:#10252e;outline:none;font-size:12px;padding:0 10px;color:#e9f4f7}.field input,.field select{height:36px}.field textarea{min-height:118px;padding:9px 10px;resize:vertical;line-height:1.5}.field input:focus,.field textarea:focus,.field select:focus{border-color:#4d8497;box-shadow:0 0 0 3px rgba(41,194,242,.08)}.hint{font-size:10px;color:#68858f;margin-top:5px;line-height:1.4}
.switch-row{display:flex;align-items:center;justify-content:space-between;gap:18px}.switch-copy strong{display:block;font-size:12px;color:#e6f1f4}.switch-copy span{display:block;font-size:10px;color:#6f8994;margin-top:4px}.switch{position:relative;width:35px;height:20px;flex:none}.switch input{opacity:0;width:0;height:0}.switch i{position:absolute;inset:0;border-radius:999px;background:#35505b;transition:.15s}.switch i:after{content:"";position:absolute;width:16px;height:16px;left:2px;top:2px;background:#dbe9ed;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.35);transition:.15s}.switch input:checked+i{background:#1db6e4}.switch input:checked+i:after{transform:translateX(15px);background:#fff}
.media-preview{width:100%;aspect-ratio:4/3;border:1px dashed #3b5964;border-radius:7px;background:#10242d;display:grid;place-items:center;overflow:hidden;color:#68858f}.media-preview img{width:100%;height:100%;object-fit:cover}.media-empty{text-align:center;font-size:11px}.media-empty svg{width:21px;height:21px;margin:0 auto 8px}
.detail-back{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;color:#75919c;padding:0;margin-bottom:11px;font-size:11px}.detail-back:hover{color:#dcecef}.detail-back svg{width:13px;height:13px}
.save-strip{position:sticky;bottom:16px;margin-top:18px;background:#0e2028;color:#fff;border:1px solid #36515c;border-radius:8px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 14px 36px rgba(0,0,0,.3);z-index:20}.save-strip span{font-size:11px;color:#98b0b9}.save-strip .btn{background:#19323c}.save-strip .btn-primary{background:linear-gradient(180deg,#2bc7f7,#1caad5);color:#052631}

.menu-popover{position:fixed;z-index:100;width:188px;background:#19313a;border:1px solid #36515c;border-radius:8px;box-shadow:0 14px 34px rgba(0,0,0,.30);padding:5px}.menu-popover button{width:100%;height:33px;border:0;background:transparent;color:#c5d7dd;border-radius:6px;text-align:left;padding:0 9px;font-size:11px}.menu-popover button:hover{background:#23434e;color:#fff}
.dialog{position:fixed;z-index:130;inset:0;background:rgba(3,14,18,.58);backdrop-filter:blur(6px);display:grid;place-items:center;padding:20px}.dialog-card{width:min(470px,100%);background:#172d36;border:1px solid #36515c;border-radius:9px;box-shadow:0 28px 70px rgba(0,0,0,.38)}.dialog-head{padding:18px 20px;border-bottom:1px solid var(--line)}.dialog-head h2{margin:0;font-size:15px;color:#eef8fa}.dialog-head p{margin:5px 0 0;color:#75919c;font-size:11px}.dialog-body{padding:18px 20px}.dialog-actions{padding:12px 20px;border-top:1px solid var(--line);display:flex;justify-content:flex-end;gap:8px}
.toast{position:fixed;right:20px;bottom:20px;z-index:200;background:#0e2028;color:#eaf5f8;border:1px solid #36515c;padding:10px 12px;border-radius:8px;font-size:11px;box-shadow:0 14px 36px rgba(0,0,0,.30)}

.login{min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 0,rgba(41,194,242,.08),transparent 35%),#102029;padding:20px}.login-card{width:min(410px,100%);background:#172d36;border:1px solid #35515d;border-radius:10px;padding:30px;box-shadow:0 30px 80px rgba(0,0,0,.32)}.login-brand{display:flex;align-items:center;gap:9px;margin-bottom:28px}.login-card h1{font-size:20px;margin:0 0 6px;color:#f4fbfd}.login-card>p{color:#78949f;font-size:11px;margin:0 0 22px}.login-card label{display:block;font-size:11px;font-weight:650;margin:14px 0 6px;color:#a8bcc4}.login-card input{width:100%;height:38px;border:1px solid #36515c;border-radius:7px;padding:0 10px;outline:none;background:#10252e}.login-card input:focus{border-color:#4f8799;box-shadow:0 0 0 3px rgba(41,194,242,.08)}.login-card .btn{width:100%;justify-content:center;margin-top:20px;height:38px}.error{margin-top:12px;color:#ff9a9a;font-size:11px}
.command{position:fixed;z-index:180;inset:0;background:rgba(4,15,20,.52);backdrop-filter:blur(5px);display:flex;align-items:flex-start;justify-content:center;padding-top:12vh}.command-card{width:min(620px,calc(100% - 24px));background:#172d36;border:1px solid #36515c;border-radius:10px;box-shadow:0 28px 70px rgba(0,0,0,.38);overflow:hidden}.command-card input{width:100%;height:52px;border:0;border-bottom:1px solid var(--line);padding:0 15px;outline:none;background:#142a33}.command-results{padding:6px;max-height:400px;overflow:auto}.command-item{width:100%;height:42px;border:0;background:transparent;color:#d1e1e6;border-radius:6px;padding:0 10px;display:flex;align-items:center;justify-content:space-between;text-align:left}.command-item:hover{background:#23414c}.command-item small{color:#6f8994}

.home-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:18px}.metric-row{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}.metric{padding:18px 19px;border-right:1px solid var(--line)}.metric:last-child{border-right:0}.metric label{display:block;color:#78949f;font-size:10px;text-transform:uppercase;letter-spacing:.07em;margin-bottom:9px}.metric strong{font-size:22px;font-weight:650;color:#eaf5f8}.task-list{display:grid}.task{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;align-items:center}.task:last-child{border-bottom:0}.task strong{font-size:12px;color:#dcebee}.task span{display:block;color:#718e98;font-size:10px;margin-top:4px}.task button{border:0;background:rgba(41,194,242,.08);color:#6fdcff;border-radius:6px;padding:6px 9px;font-size:10px}.task button:hover{background:rgba(41,194,242,.14);color:#9be8ff}


/* Shopify-inspired information architecture, retaining Standard Dose dark commerce theme */
.app-shell{grid-template-columns:240px minmax(0,1fr)}
.sidebar{background:#0b0b0c;border-right:1px solid #222225;padding:12px 10px 14px;box-shadow:none}
.brand{height:44px;margin:0 2px 10px;padding:0 8px}.brand-mark{width:28px;height:28px;border-radius:7px}.brand-name{font-size:13px}
.channel{display:none}
.nav-section{display:none}
.nav{gap:2px}.nav-button{height:34px;border-radius:8px;color:#d1d1d4;padding:0 10px}.nav-button:hover{background:#1d1d20;color:#fff}.nav-button.active{background:linear-gradient(180deg,#343438,#2b2b2e);box-shadow:inset 0 0 0 1px rgba(255,255,255,.045);color:#fff}.nav-button.active svg{color:#fff}.nav-button svg{color:#8f8f96}
.nav-group{margin-bottom:2px}.nav-sub{display:grid;gap:1px;margin:2px 0 6px 34px}.nav-sub button{height:31px;border:0;background:transparent;color:#9b9ba1;border-radius:7px;text-align:left;padding:0 8px;font-size:12px}.nav-sub button:hover{color:#fff;background:#171719}.nav-sub button.active{color:#fff;background:#202023}
.sidebar-footer{border-top:1px solid #232326}.store-link,.signout{color:#aaaab0}.store-link:hover,.signout:hover{background:#1a1a1d;color:#fff}
.workspace{background:radial-gradient(circle at 80% 0,rgba(32,111,135,.08),transparent 28%),var(--bg-deep)}
.product-editor{display:grid;grid-template-columns:minmax(0,1.75fr) minmax(280px,.72fr);gap:20px;align-items:start}
.editor-main,.editor-side{display:grid;gap:16px}.editor-side{position:sticky;top:82px}
.editor-card{background:linear-gradient(180deg,#192f38,#172b34);border:1px solid var(--line);border-radius:9px;box-shadow:0 8px 28px rgba(0,0,0,.11);overflow:hidden}
.editor-section{padding:18px 19px}.editor-section+.editor-section{border-top:1px solid var(--line)}
.editor-section h2{font-size:13px;margin:0 0 14px;color:#edf7f9}.editor-section p.section-copy{font-size:10px;color:#718d97;margin:-8px 0 14px}
.editor-media{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:start}
.editor-media .media-preview{aspect-ratio:1/1}
.status-select{width:100%;height:36px;border:1px solid var(--line-strong);background:#10252e;border-radius:7px;padding:0 10px;color:#e9f4f7;outline:none}
.publish-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.publish-row strong{font-size:12px;color:#e9f3f6}.publish-row span{display:block;font-size:10px;color:#718d97;margin-top:4px}
.editor-header{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:18px}.editor-header-left{display:flex;align-items:flex-start;gap:10px}.editor-header .detail-back{margin:5px 0 0}.editor-title h1{margin:0;font-size:22px;line-height:1.25;color:#f3fafc;letter-spacing:-.025em}.editor-title p{margin:5px 0 0;color:#78949f;font-size:11px}
.status-badge{display:inline-flex;align-items:center;height:20px;padding:0 7px;border-radius:999px;font-size:9px;font-weight:750;margin-left:7px;vertical-align:3px;background:#263f48;color:#8aa5ae}.status-badge.active{background:rgba(92,219,164,.16);color:#7de0b5}
.editor-actions{display:flex;gap:8px}.editor-actions .btn{height:34px}
.create-note{font-size:10px;color:#6e8994;margin-top:6px}
@media(max-width:1020px){.app-shell{grid-template-columns:200px 1fr}.page{padding:28px 22px}.detail-grid,.home-grid,.product-editor{grid-template-columns:1fr}.editor-side{position:static}.metric-row{grid-template-columns:1fr 1fr}}
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
const marginPct=(price,cost)=>{const p=Number(price||0),k=Number(cost||0);return !p||!Number.isFinite(p)||!Number.isFinite(k)?null:((p-k)/p)*100};
const marginClass=value=>value==null?'muted':value>=45?'margin-good':value>=35?'margin-ok':'margin-low';

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
async function check(){try{const d=await api('/api/admin/session');csrf=d.csrfToken;if(d.setupRequired)await setupView();else{const path=location.pathname;if(path==='/admin/products/new'){view='create'}else{const m=path.match(/^\/admin\/products\/([^/]+)$/);if(m){view='detail';editingId=decodeURIComponent(m[1])}else if(path.startsWith('/admin/products')){view='products'}else if(path==='/admin'||path==='/admin/'){view='home'}}await load()}}catch{showLogin()}}
async function load(){
  const results=await Promise.all([api('/api/admin/dashboard'),api('/api/admin/products')]);
  dashboard=results[0];products=results[1].products;selected=new Set([...selected].filter(id=>products.some(p=>p.id===id)));render()
}
function shell(content,crumb='Products'){
  const productsOpen=view==='products'||view==='detail'||view==='create';
  return '<div class="app-shell"><aside class="sidebar"><div class="brand"><div class="brand-mark">SD</div><div class="brand-name">STANDARD DOSE</div></div><div class="nav"><button class="nav-button '+(view==='home'?'active':'')+'" id="navHome">'+icons.home+'<span>Home</span></button><div class="nav-group"><button class="nav-button '+(productsOpen?'active':'')+'" id="navProducts">'+icons.box+'<span>Products</span></button>'+(productsOpen?'<div class="nav-sub"><button class="'+(view==='products'?'active':'')+'" id="navAllProducts">All products</button></div>':'')+'</div></div><div class="sidebar-footer"><button class="store-link" id="viewStore">'+icons.chevron+'<span>View storefront</span></button><button class="signout" id="logout">Sign out</button></div></aside><section class="workspace"><header class="topbar"><div class="breadcrumbs"><span>Admin</span><span>/</span><strong>'+esc(crumb)+'</strong></div><div class="top-actions"><button class="icon-button" id="commandButton" title="Quick search">'+icons.search+'</button><div class="user-chip"><div class="user-dot">SD</div><span>Admin</span></div></div></header>'+content+'</section></div>'
}
function wireShell(){
  document.getElementById('navHome').onclick=()=>{view='home';editingId=null;history.pushState({},'', '/admin');render()};
  document.getElementById('navProducts').onclick=()=>{view='products';editingId=null;dirty=false;sortMode='manual';history.pushState({},'', '/admin/products');render()};
  const all=document.getElementById('navAllProducts');if(all)all.onclick=()=>{view='products';sortMode='manual';history.pushState({},'', '/admin/products');render()};
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
  if(view==='create')return renderCreate();
  return renderProducts()
}
function renderHome(){
  const hidden=products.filter(p=>!p.enabled).length,missing=products.filter(p=>!p.image).length,low=products.filter(p=>p.stock==='low'||p.stock==='out').length;
  const tasks=[];
  if(missing)tasks.push({title:'Add product imagery',copy:missing+' product'+(missing===1?'':'s')+' without a primary image',filter:'image'});
  if(low)tasks.push({title:'Review inventory',copy:low+' product'+(low===1?'':'s')+' low or out of stock',filter:'stock'});
  if(hidden)tasks.push({title:'Review hidden products',copy:hidden+' product'+(hidden===1?'':'s')+' not published',filter:'hidden'});
  const taskHtml=tasks.length?tasks.map(t=>'<div class="task"><div><strong>'+esc(t.title)+'</strong><span>'+esc(t.copy)+'</span></div><button class="task-open" data-filter="'+t.filter+'">Review</button></div>').join(''):'<div class="empty"><strong>Everything looks tidy</strong>No catalogue issues need attention.</div>';
  const content='<main class="page"><div class="page-heading"><div><h1>Dashboard</h1><p>Store health and catalogue activity.</p></div></div><div class="home-grid"><section class="surface"><div class="metric-row"><div class="metric"><label>Products</label><strong>'+products.length+'</strong></div><div class="metric"><label>Live</label><strong>'+Number(dashboard.products||0)+'</strong></div><div class="metric"><label>Low stock</label><strong>'+Number(dashboard.lowStock||0)+'</strong></div><div class="metric"><label>Hidden</label><strong>'+hidden+'</strong></div></div><div class="card-head"><h2>Needs attention</h2><p>Catalogue items that may need a quick review.</p></div><div class="task-list">'+taskHtml+'</div></section><section class="card"><div class="card-head"><h2>Quick actions</h2><p>Common catalogue tasks.</p></div><div class="task-list"><div class="task"><div><strong>Create product</strong><span>Add a new item to the catalogue.</span></div><button id="homeCreate">Create</button></div><div class="task"><div><strong>Open catalogue</strong><span>Search, filter and manage products.</span></div><button id="homeProducts">Open</button></div></div></section></div></main>';
  app.innerHTML=shell(content,'Dashboard');wireShell();homeCreate.onclick=openCreateDialog;homeProducts.onclick=()=>{view='products';render()};
  document.querySelectorAll('.task-open').forEach(b=>b.onclick=()=>{view='products';if(b.dataset.filter==='hidden')statusFilter='hidden';if(b.dataset.filter==='stock')sortMode='stock';render()})
}
function renderProducts(){
  const allCount=products.length,liveCount=products.filter(p=>p.enabled).length,hiddenCount=allCount-liveCount;
  const list=filtered(),pages=Math.max(1,Math.ceil(list.length/pageSize));if(page>pages)page=pages;
  const slice=list.slice((page-1)*pageSize,page*pageSize);
  const rows=slice.map(p=>'<tr data-row="'+esc(p.id)+'"><td class="check-col"><input class="rowcheck" type="checkbox" data-id="'+esc(p.id)+'" '+(selected.has(p.id)?'checked':'')+'></td><td><div class="product-cell">'+(p.image?'<img class="thumb" src="'+esc(p.image)+'" alt="">':'<div class="thumb"></div>')+'<div class="product-main"><div class="product-title">'+esc(p.name)+'</div><div class="product-sub">'+esc(p.variantId)+'</div></div></div></td><td><span class="status '+(p.enabled?'live':'hidden')+'">'+(p.enabled?'Active':'Hidden')+'</span></td><td class="'+(p.stock==='low'?'stock-low':p.stock==='out'?'stock-out':'')+'">'+Number(p.stockOnHand||0)+' in stock</td><td class="money">'+money(p.price)+'</td><td class="'+marginClass(marginPct(p.price,p.cost))+'">'+(marginPct(p.price,p.cost)==null?'—':marginPct(p.price,p.cost).toFixed(1)+'%')+'</td><td class="muted">'+esc(p.category)+'</td><td class="muted">'+esc(p.supplier||'—')+'</td><td><button class="row-menu" data-menu="'+esc(p.id)+'" aria-label="Product actions">•••</button></td></tr>').join('');
  const bulk=selected.size?'<div class="selection-bar"><strong>'+selected.size+' selected</strong><div class="selection-actions"><button class="btn" id="bulkClear">Clear</button><button class="btn" id="bulkArchive">Archive</button><button class="btn btn-primary" id="bulkPublish">Publish</button></div></div>':'<div class="toolbar"><div class="toolbar-left"><div class="search">'+icons.search+'<input id="productSearch" placeholder="Search products" value="'+esc(searchQuery)+'"><kbd>/</kbd></div><select class="select" id="categoryFilter"><option value="all">All categories</option>'+['Espresso','Iced','Matcha','Coffee','Setup'].map(x=>'<option '+(categoryFilter===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div><div class="toolbar-right"><select class="select" id="sortMode"><option value="manual">Manual order</option><option value="name" '+(sortMode==='name'?'selected':'')+'>Name A–Z</option><option value="price-asc" '+(sortMode==='price-asc'?'selected':'')+'>Price: low to high</option><option value="price-desc" '+(sortMode==='price-desc'?'selected':'')+'>Price: high to low</option><option value="stock" '+(sortMode==='stock'?'selected':'')+'>Stock: low to high</option></select></div></div>';
  const content='<main class="page"><div class="page-heading"><div><h1>Products</h1><p>Manage products, pricing, inventory and storefront visibility.</p></div><div class="actions"><button class="btn btn-primary" id="createProduct">'+icons.plus+'Create product</button></div></div><section class="surface"><div class="tabs"><button class="tab '+(statusFilter==='all'?'active':'')+'" data-status="all">All <span class="tab-count">'+allCount+'</span></button><button class="tab '+(statusFilter==='live'?'active':'')+'" data-status="live">Active <span class="tab-count">'+liveCount+'</span></button><button class="tab '+(statusFilter==='hidden'?'active':'')+'" data-status="hidden">Hidden <span class="tab-count">'+hiddenCount+'</span></button></div>'+bulk+'<div class="table-wrap"><table><thead><tr><th class="check-col"><input id="selectPage" type="checkbox" '+(slice.length&&slice.every(p=>selected.has(p.id))?'checked':'')+'></th><th>Product</th><th>Status</th><th>Inventory</th><th>Price</th><th>Margin</th><th>Category</th><th>Supplier</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>'+(slice.length?'':'<div class="empty"><strong>No products found</strong>Try adjusting your search or filters.</div>')+'</div><div class="table-footer"><span>Showing '+(slice.length?((page-1)*pageSize+1):0)+'–'+Math.min(page*pageSize,list.length)+' of '+list.length+'</span><div class="pagination"><button class="page-btn" id="prevPage" '+(page<=1?'disabled':'')+'>Previous</button><span>Page '+page+' of '+pages+'</span><button class="page-btn" id="nextPage" '+(page>=pages?'disabled':'')+'>Next</button></div></div></section></main>';
  app.innerHTML=shell(content,'Products');wireShell();
  createProduct.onclick=()=>openCreate();
  document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{statusFilter=b.dataset.status;page=1;selected.clear();render()});
  if(!selected.size){
    productSearch.oninput=e=>{searchQuery=e.target.value;page=1;render();const s=document.getElementById('productSearch');if(s){s.focus();s.setSelectionRange(searchQuery.length,searchQuery.length)}};
    const categorySelect=document.getElementById('categoryFilter');
    const sortSelect=document.getElementById('sortMode');
    categorySelect.onchange=e=>{categoryFilter=e.target.value;page=1;render()};
    sortSelect.onchange=e=>{sortMode=e.target.value;page=1;render()}
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
function openProduct(id){editingId=id;view='detail';dirty=false;history.pushState({},'', '/admin/products/'+encodeURIComponent(id));render()}
function openCreate(){editingId=null;view='create';dirty=false;history.pushState({},'', '/admin/products/new');render()}
function editorMarkup(p,isNew){
  const title=isNew?'Add product':esc(p.name);
  const statusActive=!isNew&&p.enabled;
  const subtitle=isNew?'Create a new catalogue item.':esc(p.variantId||'')+' · '+esc(p.category||'');
  return '<main class="page"><div class="editor-header"><div class="editor-header-left"><button class="detail-back" id="backProducts">'+icons.back+'Products</button><div class="editor-title"><h1>'+title+(isNew?'':'<span class="status-badge '+(statusActive?'active':'')+'">'+(statusActive?'Active':'Draft')+'</span>')+'</h1><p>'+subtitle+'</p></div></div><div class="editor-actions">'+(!isNew?'<button class="btn" id="moreProduct">•••</button>':'')+'<button class="btn btn-primary" id="saveTop">'+(isNew?'Save product':'Save')+'</button></div></div><form id="productForm"><div class="product-editor"><div class="editor-main"><section class="editor-card"><div class="editor-section"><div class="form-grid"><div class="field span2"><label>Title</label><input name="name" value="'+esc(p.name||'')+'" placeholder="58mm Puck Screen" required autofocus></div><div class="field span2"><label>Description</label><textarea name="description" placeholder="Describe the product, materials, use and what makes it useful.">'+esc(p.description||'')+'</textarea></div></div></div><div class="editor-section"><h2>Media</h2><div class="editor-media"><div class="media-preview" id="mediaPreview">'+(p.image?'<img src="'+esc(p.image)+'" alt="">':'<div class="media-empty">'+icons.image+'No image</div>')+'</div><div class="field"><label>Image URL</label><input name="image" value="'+esc(p.image||'')+'" placeholder="https://"><div class="hint">R2 upload will replace URL entry in the media phase.</div></div></div></div><div class="editor-section"><div class="field"><label>Category</label><select name="category">'+['Espresso','Iced','Matcha','Coffee','Setup'].map(x=>'<option '+((p.category||'Setup')===x?'selected':'')+'>'+x+'</option>').join('')+'</select></div></div></section><section class="editor-card"><div class="editor-section"><h2>Pricing</h2><div class="form-grid"><div class="field"><label>Price</label><input name="price" type="number" step="0.01" min="0" value="'+(p.price??'')+'" placeholder="0.00" required></div><div class="field"><label>Compare-at price</label><input name="compareAt" type="number" step="0.01" min="0" value="'+(p.compareAt??'')+'" placeholder="0.00"></div><div class="field"><label>Cost per item</label><input name="cost" type="number" step="0.01" min="0" value="'+(p.cost??'')+'" placeholder="0.00"><div class="hint">Private. Never shown to customers.</div></div></div><div class="pricing-summary" id="pricingSummary"></div></div></section><section class="editor-card"><div class="editor-section"><h2>Inventory</h2><div class="form-grid"><div class="field"><label>SKU</label><input name="variantId" value="'+esc(p.variantId||'')+'" required></div><div class="field"><label>Quantity</label><input name="stockOnHand" type="number" min="0" value="'+Number(p.stockOnHand||0)+'"></div></div></div></section><section class="editor-card"><div class="editor-section"><h2>Supplier & fulfilment</h2><p class="section-copy">Private operational information.</p><div class="form-grid"><div class="field"><label>Supplier</label><input name="supplier" value="'+esc(p.supplier||'')+'"></div><div class="field"><label>Supplier SKU</label><input name="supplierSku" value="'+esc(p.supplierSku||'')+'"></div><div class="field span2"><label>Supplier URL</label><input name="supplierUrl" value="'+esc(p.supplierUrl||'')+'">'+(p.supplierUrl?'<a class="source-link" href="'+esc(p.supplierUrl)+'" target="_blank" rel="noopener">Open supplier product ↗</a>':'')+'</div><div class="field"><label>Lead time</label><input name="leadTime" value="'+esc(p.leadTime||'')+'"></div><div class="field"><label>Fulfilment method</label><input name="fulfilmentMethod" value="'+esc(p.fulfilmentMethod||'')+'"></div></div></div></section></div><aside class="editor-side"><section class="editor-card"><div class="editor-section"><h2>Status</h2><select class="status-select" name="status"><option value="draft" '+(!statusActive?'selected':'')+'>Draft</option><option value="active" '+(statusActive?'selected':'')+'>Active</option></select></div></section><section class="editor-card"><div class="editor-section"><h2>Product organisation</h2><div class="form-grid"><div class="field span2"><label>Badge</label><input name="tag" value="'+esc(p.tag||'')+'" placeholder="Just landed"></div><div class="field span2"><label>Compatibility</label><input name="compatibility" value="'+esc(p.compatibility||'')+'"></div><div class="field span2"><label>Sort order</label><input name="sortOrder" type="number" min="0" value="'+Number(p.sortOrder||0)+'"></div></div></div></section><section class="editor-card"><div class="editor-section"><h2>Search listing</h2><div class="field"><label>URL handle</label><input name="slug" value="'+esc(p.slug||'')+'" placeholder="58mm-puck-screen" required></div>'+(isNew?'<div class="create-note">The handle and SKU are generated from the title until you edit them.</div>':'')+'</div></section></aside></div><div class="save-strip" id="saveStrip" style="display:none"><span>Unsaved changes</span><div class="actions"><button class="btn" type="button" id="discardChanges">Discard</button><button class="btn btn-primary" type="submit">'+(isNew?'Save product':'Save changes')+'</button></div></div></form></main>'
}
function wireEditor(p,isNew){
  const form=document.getElementById('productForm'),saveStrip=document.getElementById('saveStrip');
  let slugTouched=Boolean(!isNew&&p.slug),skuTouched=Boolean(!isNew&&p.variantId);
  const name=form.elements.name,slug=form.elements.slug,sku=form.elements.variantId;
  const pricingSummary=document.getElementById('pricingSummary');
  const paintPricing=()=>{
    if(!pricingSummary)return;
    const price=Number(form.elements.price.value||0),cost=Number(form.elements.cost.value||0),profit=price-cost,m=marginPct(price,cost);
    pricingSummary.innerHTML='<div><span>Gross profit</span><strong>'+(price?money(profit):'—')+'</strong></div><div><span>Gross margin</span><strong class="'+marginClass(m)+'">'+(m==null?'—':m.toFixed(1)+'%')+'</strong></div><div><span>Supplier cost</span><strong>'+(cost?money(cost):'—')+'</strong></div>';
  };
  paintPricing();
  form.elements.price.addEventListener('input',paintPricing);
  form.elements.cost.addEventListener('input',paintPricing);
  if(isNew)name.addEventListener('input',()=>{if(!slugTouched)slug.value=slugify(name.value);if(!skuTouched)sku.value=slugify(name.value)});
  slug.addEventListener('input',()=>slugTouched=true);sku.addEventListener('input',()=>skuTouched=true);
  const markDirty=()=>{dirty=true;saveStrip.style.display='flex'};form.addEventListener('input',markDirty);form.addEventListener('change',markDirty);
  form.elements.image.addEventListener('change',()=>{const v=form.elements.image.value.trim();mediaPreview.innerHTML=v?'<img src="'+esc(v)+'" alt="">':'<div class="media-empty">'+icons.image+'No image</div>'});
  backProducts.onclick=()=>{if(dirty&&!confirm('Discard unsaved changes?'))return;view='products';editingId=null;dirty=false;history.pushState({},'', '/admin/products');render()};
  discardChanges.onclick=()=>{dirty=false;isNew?renderCreate():renderDetail()};
  saveTop.onclick=()=>isNew?saveNewProduct(form):saveProduct(form,p);
  form.onsubmit=e=>{e.preventDefault();isNew?saveNewProduct(form):saveProduct(form,p)};
  if(!isNew){moreProduct.onclick=e=>openDetailMenu(e.currentTarget,p)}
}
function renderDetail(){
  const p=products.find(x=>x.id===editingId);if(!p){view='products';return renderProducts()}
  app.innerHTML=shell(editorMarkup(p,false),'Products / '+p.name);wireShell();wireEditor(p,false)
}
function renderCreate(){
  const p={name:'',variantId:'',slug:'',price:'',compareAt:'',category:'Setup',stockOnHand:0,supplier:'',supplierSku:'',supplierUrl:'',cost:'',leadTime:'',fulfilmentMethod:'',tag:'',description:'',compatibility:'',image:'',enabled:false,sortOrder:products.length};
  app.innerHTML=shell(editorMarkup(p,true),'Products / Add product');wireShell();wireEditor(p,true)
}
async function saveNewProduct(form){
  const fd=new FormData(form),payload=Object.fromEntries(fd.entries());
  delete payload.status;
  payload.enabled=form.elements.status.value==='active';payload.price=Number(payload.price||0);payload.stockOnHand=Number(payload.stockOnHand||0);payload.sortOrder=Number(payload.sortOrder||products.length);
  if(payload.compareAt!=='')payload.compareAt=Number(payload.compareAt);else delete payload.compareAt;
  if(payload.cost!=='')payload.cost=Number(payload.cost);else delete payload.cost;
  try{const d=await api('/api/admin/products',{method:'POST',body:JSON.stringify(payload)});dirty=false;await load();editingId=d.product.id;view='detail';history.replaceState({},'', '/admin/products/'+encodeURIComponent(d.product.id));showToast('Product created');render()}catch(err){showToast(err.message)}
}
async function saveProduct(form,p){
  const fd=new FormData(form),payload=Object.fromEntries(fd.entries());
  delete payload.status;
  payload.enabled=form.elements.status.value==='active';payload.price=Number(payload.price);payload.stockOnHand=Number(payload.stockOnHand);payload.sortOrder=Number(payload.sortOrder||0);
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
function openCreateDialog(){openCreate()}
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
