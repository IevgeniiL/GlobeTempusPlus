const CACHE = 'tempus-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/images/1_1_iPhoneX_Default.png',
  '/images/3_2_iPhoneX_3_Cities.png',
  '/images/4_4_iPhoneX_Active_Hours.png',
  '/images/3_8_iPhoneX_Edit_List.png',
  '/images/4_2_iPhoneX_Location_Active_Time.png',
  '/images/4_3_iPhoneX_Location_Setup_Time.png',
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
