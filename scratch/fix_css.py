import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# The CSS block inside app.js starts after "style.textContent = `" and ends before "`;"
# Let's locate renderAlteonStyle
start_marker = "style.textContent = `\n"
end_marker = "        `;"

start_idx = app_js.find("style.textContent = `")
if start_idx != -1:
    end_idx = app_js.find(end_marker, start_idx)
    # the exact CSS string:
    css = """
:root{--bg:#0d0d0e;--bg2:#111113;--panel:#161618;--tile:#1a1a1d;--line:rgba(255,255,255,.09);--text:#ecece9;--muted:#a3a39c;--dim:#77776f;--green:#8fd0a6;--green2:#6bbe8a;--gold:#cbab6d;--red:#e2372f;--r:16px;--maxw:1240px}
.alteon-page {background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.alteon-page a{color:inherit;text-decoration:none}
.alteon-page img{max-width:100%;display:block}
.alteon-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}
.alteon-page .eyebrow{color:var(--green);font-family:'Archivo';font-weight:700;font-size:12px;letter-spacing:.28em;text-transform:uppercase}
.alteon-page h1, .alteon-page h2, .alteon-page h3{font-family:'Archivo';font-weight:900;text-transform:uppercase;letter-spacing:-.01em;line-height:.98}
.alteon-page .serif{font-family:'Playfair Display',serif;font-weight:600;text-transform:none;letter-spacing:0;color:var(--gold)}
.alteon-page .btn{display:inline-flex;align-items:center;gap:9px;font-family:'Archivo';font-weight:700;font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:14px 26px;border-radius:100px;transition:.2s;cursor:pointer;border:0}
.alteon-page .btn-green{background:var(--green);color:#0c1a11}
.alteon-page .btn-green:hover{background:var(--green2)}
.alteon-page .btn-ghost{background:transparent;color:var(--text);border:1px solid var(--line)}
.alteon-page .btn-ghost:hover{border-color:var(--green);color:var(--green)}
.alteon-page .btn-red{background:var(--red);color:#fff}
.alteon-page .hero{position:relative;overflow:hidden;background:radial-gradient(130% 130% at 100% 15%,#1d1613,#0b0b0c 60%)}
.alteon-page .hero-grid{display:grid;grid-template-columns:1.05fr .82fr;gap:54px;align-items:center;padding:76px 0}
.alteon-page .hero-copy{position:relative;z-index:2}
.alteon-page .hero-media{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/5;border:1px solid var(--line);box-shadow:0 34px 80px rgba(0,0,0,.6)}
.alteon-page .hero-media img{width:100%;height:100%;object-fit:cover;object-position:center 45%}
.alteon-page .hero-media::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 62%,rgba(11,11,12,.4))}
@media(max-width:860px){.alteon-page .hero-grid{grid-template-columns:1fr;gap:28px;padding:44px 0}.alteon-page .hero-media{aspect-ratio:16/11}}
.alteon-page .hero h1{font-size:clamp(46px,6.4vw,92px);margin:16px 0 8px}
.alteon-page .hero h1 .g{color:var(--green);display:block}
.alteon-page .hero p{max-width:520px;color:#cfcfca;font-size:18px;margin:22px 0 30px}
.alteon-page .hero .cta-row{display:flex;gap:14px;flex-wrap:wrap}
.alteon-page .stats{display:flex;gap:40px;margin-top:52px;flex-wrap:wrap}
.alteon-page .stats .s b{font-family:'Archivo';font-weight:900;font-size:34px;color:#fff;display:block;line-height:1}
.alteon-page .stats .s span{color:#b7b7b0;font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.alteon-page .strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg2)}
.alteon-page .strip .wrap{display:flex;gap:44px;justify-content:center;flex-wrap:wrap;padding:22px 28px;color:var(--muted);font-size:13px;letter-spacing:.06em}
.alteon-page .strip b{color:var(--green);font-family:'Archivo'}
.alteon-page section{padding:88px 0}
.alteon-page .sec-head{max-width:720px;margin-bottom:44px}
.alteon-page .sec-head h2{font-size:clamp(34px,5vw,58px);margin:14px 0}
.alteon-page .sec-head p{color:var(--muted);font-size:17px}
.alteon-page .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
@media(max-width:980px){.alteon-page .grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.alteon-page .grid{grid-template-columns:1fr}}
.alteon-page .card{background:var(--panel);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;cursor:pointer;transition:.25s;display:flex;flex-direction:column}
.alteon-page .card:hover{transform:translateY(-5px);border-color:rgba(143,208,166,.4);box-shadow:0 24px 50px rgba(0,0,0,.5)}
.alteon-page .tile{aspect-ratio:4/3;background:radial-gradient(120% 120% at 50% 20%,#202024,#0e0e10);display:flex;align-items:center;justify-content:center;overflow:hidden;padding:16px}
.alteon-page .tile img{width:100%;height:100%;object-fit:contain}
.alteon-page .card-body{padding:22px 22px 24px;flex:1;display:flex;flex-direction:column}
.alteon-page .card .kicker{color:var(--green);font-family:'Archivo';font-weight:700;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase}
.alteon-page .card .ctitle{font-family:'Playfair Display',serif;color:var(--gold);font-size:25px;font-weight:600;margin:9px 0 10px;line-height:1.15}
.alteon-page .card p{color:var(--muted);font-size:14px;flex:1}
.alteon-page .card .more{margin-top:16px;color:var(--text);font-family:'Archivo';font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:8px}
.alteon-page .card .count{color:var(--dim)}
.alteon-page .card:hover .more{color:var(--green)}
.alteon-page .crumb{padding:26px 0 0;color:var(--dim);font-size:13px;letter-spacing:.04em}
.alteon-page .crumb a:hover{color:var(--green)}
.alteon-page .crumb span{color:var(--muted)}
.alteon-page .cat-hero{padding:40px 0 20px}
.alteon-page .cat-hero .eyebrow{margin-bottom:14px;display:block}
.alteon-page .cat-hero h1{font-size:clamp(40px,6vw,74px)}
.alteon-page .cat-hero p{color:var(--muted);font-size:18px;max-width:680px;margin-top:20px}
.alteon-page .model{display:grid;grid-template-columns:1.05fr 1fr;gap:44px;align-items:center;padding:48px 0;border-top:1px solid var(--line)}
.alteon-page .model:nth-child(even) .m-img{order:2}
@media(max-width:860px){.alteon-page .model{grid-template-columns:1fr;gap:24px}.alteon-page .model:nth-child(even) .m-img{order:0}}
.alteon-page .m-img{background:radial-gradient(120% 120% at 50% 15%,#202024,#0d0d0f);border:1px solid var(--line);border-radius:var(--r);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:22px}
.alteon-page .m-img img{width:100%;height:100%;object-fit:contain}
.alteon-page .m-info h2{font-size:13px;color:var(--green);font-family:'Archivo';letter-spacing:.18em}
.alteon-page .m-info .mtitle{font-family:'Playfair Display',serif;color:var(--gold);font-size:34px;font-weight:600;margin:6px 0 4px;line-height:1.1}
.alteon-page .m-info .msub{color:var(--dim);font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;font-family:'Archivo';font-weight:600}
.alteon-page .m-info .mov{color:var(--muted);font-size:15px;margin:16px 0}
.alteon-page .spectbl{width:100%;border-collapse:collapse;margin-top:6px}
.alteon-page .spectbl tr{border-bottom:1px solid var(--line)}
.alteon-page .spectbl td{padding:9px 0;font-size:13.5px;vertical-align:top}
.alteon-page .spectbl td:first-child{color:var(--dim);width:42%;padding-right:14px;text-transform:uppercase;letter-spacing:.05em;font-size:11.5px;font-family:'Archivo';font-weight:600}
.alteon-page .spectbl td:last-child{color:var(--text)}
.alteon-page .m-cta{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap}
.alteon-page .badge{display:inline-block;background:rgba(143,208,166,.12);color:var(--green);border:1px solid rgba(143,208,166,.3);font-family:'Archivo';font-weight:700;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:14px}
.alteon-page .pdp{display:grid;grid-template-columns:1.1fr 1fr;gap:52px;padding:30px 0 20px;align-items:start}
@media(max-width:860px){.alteon-page .pdp{grid-template-columns:1fr;gap:28px}}
.alteon-page .pdp-img{background:radial-gradient(120% 120% at 50% 12%,#212125,#0d0d0f);border:1px solid var(--line);border-radius:var(--r);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;overflow:hidden;position:sticky;top:96px;padding:30px}
.alteon-page .pdp-img img{width:100%;height:100%;object-fit:contain}
.alteon-page .pdp h1{font-family:'Playfair Display',serif;color:var(--gold);font-size:clamp(34px,5vw,52px);font-weight:700;text-transform:none;letter-spacing:0;line-height:1.05;margin:10px 0}
.alteon-page .pdp .lead{color:var(--muted);font-size:17px;margin:18px 0 24px}
.alteon-page .blk{margin:30px 0}
.alteon-page .blk h4{font-family:'Archivo';font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--text);margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--line)}
.alteon-page .benefits{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:520px){.alteon-page .benefits{grid-template-columns:1fr}}
.alteon-page .benefit{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px}
.alteon-page .benefit b{display:block;font-family:'Archivo';font-size:13px;letter-spacing:.04em;text-transform:uppercase;margin-bottom:5px}
.alteon-page .benefit span{color:var(--muted);font-size:13.5px}
.alteon-page .faq details{border-bottom:1px solid var(--line);padding:14px 0}
.alteon-page .faq summary{cursor:pointer;font-family:'Archivo';font-weight:700;font-size:15px;list-style:none}
.alteon-page .faq summary::-webkit-details-marker{display:none}
.alteon-page .faq summary::before{content:'+';color:var(--green);margin-right:12px;font-weight:800}
.alteon-page .faq details[open] summary::before{content:'\\\\2013'}
.alteon-page .faq p{color:var(--muted);font-size:14.5px;margin-top:10px;padding-left:24px}
.alteon-page .seo-note{color:var(--dim);font-size:13px;background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-top:20px}
.alteon-page .rel{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
@media(max-width:860px){.alteon-page .rel{grid-template-columns:repeat(2,1fr)}}
.alteon-page .rel .card .tile{aspect-ratio:1/1}
.alteon-page .cta-band{background:linear-gradient(120deg,#12241a,#0e0e0f 70%);border:1px solid var(--line);border-radius:24px;padding:56px;text-align:center;margin:30px 0}
.alteon-page .cta-band h2{font-size:clamp(30px,4vw,46px)}
.alteon-page .cta-band p{color:var(--muted);max-width:560px;margin:16px auto 26px}
.alteon-page .cta-band .cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.alteon-page .wa{position:fixed;right:26px;bottom:26px;width:58px;height:58px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(37,211,102,.4);z-index:50}
.alteon-page .wa svg{width:30px;height:30px;fill:#fff}
.alteon-page .fade{animation:fade .4s ease}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
"""
    app_js = app_js[:start_idx + len(start_marker)] + css + app_js[end_idx:]

with open(app_js_path, 'w') as f:
    f.write(app_js)

