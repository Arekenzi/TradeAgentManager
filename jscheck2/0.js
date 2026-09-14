
(function(){
  try{
    const p=(navigator.userAgentData&&navigator.userAgentData.platform)||navigator.userAgent||'';
    if(/Android/i.test(p)) document.documentElement.classList.add('ta-android');
  }catch(_){}
})();
