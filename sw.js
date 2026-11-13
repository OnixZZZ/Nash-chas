/* Наш маленький простір — службовий файл лише для показу сповіщень (нагадувань). Дані сайту не кешує. */
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>self.clients.claim());
self.addEventListener('message',e=>{
  const d=e.data||{};
  if(d.type==='notify') self.registration.showNotification(d.title||'Наш маленький простір ♡',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png'});
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window'}).then(cs=>{
    for(const c of cs) if('focus' in c) return c.focus();
    if(self.clients.openWindow) return self.clients.openWindow('./');
  }));
});
