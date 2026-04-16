const CACHE = 'tempus-v2';
/* Resolve paths relative to this script so GitHub Pages project URLs (/repo/) work. */
const base = new URL('./', self.location.href).href;
const ASSETS = [
  base,
  new URL('index.html', base).href,
  new URL('images/hero-phone.png', base).href,
  new URL('images/3_2_iPhoneX_3_Cities.png', base).href,
  new URL('images/4_2_iPhoneX_Location_Active_Time.png', base).href,
  new URL('images/3_8_iPhoneX_Edit_List.png', base).href,
  new URL('images/4_4_iPhoneX_Active_Hours.png', base).href,
  new URL('images/4_3_iPhoneX_Location_Setup_Time.png', base).href,
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
