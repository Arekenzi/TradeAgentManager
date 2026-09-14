
(()=>{
  function brandStatic(small=false){return TradeAgentBrandMark({small});}
  function mountBrand(root=document){
    root.querySelectorAll('.railbrand22').forEach(rail=>{
      const direct=[...rail.children].find(x=>x.tagName==='SVG'||x.classList?.contains('ta-brand-host'));
      if(direct && !direct.classList?.contains('ta-brand-host')) direct.remove();
      if(!rail.querySelector(':scope>.ta-brand-host')) rail.insertAdjacentHTML('afterbegin',`<span class="ta-brand-host">${brandStatic(true)}</span>`);
    });
    root.querySelectorAll('.signature-emblem,.ta252-draft-logo,.ta253-draft .mark,.about-logo.trade-mark,.ta25-about-mark,.ta25-integration .markbox').forEach(el=>{
      if(el.dataset.taBrandMounted==='1')return;el.dataset.taBrandMounted='1';el.innerHTML=brandStatic(true);el.classList.add('ta-brand-host');
    });
    root.querySelectorAll('[data-ta2603-system="about"]>span:first-child,.moretile[data-more252="about"] .moreico').forEach(el=>{
      if(el.dataset.taBrandMounted==='1')return;el.dataset.taBrandMounted='1';el.innerHTML=brandStatic(true);
    });
  }
  const previousRender=window.render;
  window.render=function(){const r=previousRender?previousRender():undefined;mountBrand(document);return r};
  const previousTabs=window.paintTabs;
  window.paintTabs=function(){const r=previousTabs?previousTabs():undefined;mountBrand(document);return r};

  window.vAbout=function(){
    const st=syncState();
    sheet('О системе',`<div class="ta-brand-about"><div class="mark">${brandStatic(false)}</div><div><h3>Trade Agent Manager</h3><p>COMPANION BRAND EXPERIENCE · v${VERSION}<br>Desktop — основная рабочая станция. Manager — быстрый web/mobile-компаньон.</p></div></div>
      <div class="about-grid"><div><u>Правообладатель</u><b>${esc(APP_OWNER)}</b></div><div><u>Сборка</u><b>${esc(APP_BUILD)}</b></div><div><u>Синхронизация</u><b>${esc(st.txt)}</b></div><div><u>Контур</u><b>Firebase · Firestore LIVE</b></div></div>
      <div class="ta-brand-lockup"><b>TRADE <em>AGENT</em></b><span>MARKETS WORK HARDER FOR YOU</span></div>
      <div class="integration-card"><span>${brandStatic(true)}</span><div><b>Единый master-знак</b><i>Outer Geometry V2 + Internal Facets V1 зафиксированы и используются во всех branding-точках Manager.</i></div></div>
      <div class="legal-card"><b>© 2026 ${esc(APP_OWNER)}. Все права защищены.</b><p>${esc(APP_FAMILY)} — частный программный продукт.</p></div>`,mountBrand);
  };

  function cacheBustBrandAssets(){
    const icon=document.querySelector('link[rel="icon"]');if(icon)icon.href='./favicon.svg?v=27.0.1';
    const apple=document.querySelector('link[rel="apple-touch-icon"]');if(apple)apple.href='./apple-touch-icon.png?v=27.0.1';
    const man=document.querySelector('link[rel="manifest"]');if(man)man.href='./manifest.webmanifest?v=27.0.1';
  }
  document.addEventListener('DOMContentLoaded',()=>{mountBrand(document);cacheBustBrandAssets()},{once:true});
  mountBrand(document);cacheBustBrandAssets();
})();
