
(function(){
  function resetLoginButton(){
    try{
      if(document.body && document.body.classList.contains('authenticated')) return;
      var b=document.getElementById('lGo');
      if(!b) return;
      b.disabled=false;
      b.removeAttribute('disabled');
      b.classList.remove('login-busy');
      b.style.pointerEvents='auto';
      if(!String(b.textContent||'').trim() || /Проверяю|Вхожу/.test(String(b.textContent||''))) b.innerHTML='Войти <span>→</span>';
    }catch(e){}
  }
  resetLoginButton();
  window.addEventListener('pageshow',resetLoginButton);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)resetLoginButton()});
})();
