const CACHE_NAME = "v1_cache_contador_app_vue";
const urlsToCache = [
    "./",
    "./img/icon.16.png",
    "./img/icon.32.png",
    "./img/icon.64.png",
    "./img/icon.128.png",
    "./img/icon.256.png",
    "./img/icon.512.png",
    "./img/icon.1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
];


self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    );
});


self.addEventListener("activate", e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhitelist.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName)
                            }
                        }
                    )
                );
            })
            .then(() => self.clients.claim())
    );
});

/* Download CACHE */
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){
                    return res;
                }
                return fetch(e.request);
            }
        )
    );
});

