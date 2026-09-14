
(()=>{
  function dedupeRailBrand(){
    document.querySelectorAll('.railbrand22').forEach(rail=>{
      const hosts=[...rail.children].filter(x=>x.classList&&x.classList.contains('ta-brand-host'));
      hosts.slice(1).forEach(x=>x.remove());
      [...rail.children].filter(x=>x.tagName==='SVG').forEach(x=>x.remove());
    });
  }
  const prev=window.paintTabs;
  if(typeof prev==='function') window.paintTabs=function(){const r=prev.apply(this,arguments);dedupeRailBrand();return r};
  const mo=new MutationObserver(dedupeRailBrand);mo.observe(document.documentElement,{childList:true,subtree:true});
  dedupeRailBrand();
})();
