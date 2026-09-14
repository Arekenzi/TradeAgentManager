
/* v25.3.8 — LOGIN ONLY.
   Keep the login/user-picker screen static on every touch device.
   Horizontal finger drags are cancelled before the viewport can drift,
   while native vertical scrolling remains available for short-height screens. */
(function(){
  try{
    const login=document.getElementById('login');
    if(!login) return;
    let sx=0,sy=0,tracking=false;
    const active=()=>!login.classList.contains('hide') && getComputedStyle(login).display!=='none';
    const resetX=()=>{
      if(login.scrollLeft) login.scrollLeft=0;
      try{ window.scrollTo(0, window.scrollY||0); }catch(_){ }
    };
    login.addEventListener('touchstart',function(e){
      if(!active()||e.touches.length!==1){tracking=false;return;}
      const t=e.touches[0]; sx=t.clientX; sy=t.clientY; tracking=true;
      resetX();
    },{passive:true,capture:true});
    login.addEventListener('touchmove',function(e){
      if(!tracking||!active()||e.touches.length!==1) return;
      const t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;
      if(Math.abs(dx)>3 && Math.abs(dx)>Math.abs(dy)){
        e.preventDefault();
        resetX();
      }
    },{passive:false,capture:true});
    login.addEventListener('touchend',()=>{tracking=false;resetX();},{passive:true,capture:true});
    login.addEventListener('touchcancel',()=>{tracking=false;resetX();},{passive:true,capture:true});
    login.addEventListener('scroll',function(){ if(active()) resetX(); },{passive:true});
    window.addEventListener('resize',function(){ if(active()) resetX(); },{passive:true});
  }catch(_){}
})();
