const CACHE='modelharbor-pocket-shell-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x.startsWith('modelharbor-pocket-shell-')&&x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',event=>{const r=event.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;event.respondWith(caches.match(r).then(cached=>cached||fetch(r)));});
