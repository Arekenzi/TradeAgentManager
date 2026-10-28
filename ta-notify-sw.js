/* TradeAgent Manager — служебный файл только для уведомлений.
   Нет обработчика fetch: страницы и данные загружаются как раньше, ничего не кэшируется. */
self.addEventListener('install',function(){ self.skipWaiting(); });
self.addEventListener('activate',function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){ if('focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow(url);
  }));
});
