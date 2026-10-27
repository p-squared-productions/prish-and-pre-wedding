/* Service worker: keeps the site's images on the guest's device after the
   first visit, so the backdrops, bells and artwork load instantly on return
   visits and when moving between pages.

   - Images (anything under assets/): cache first, then the network.
   - Pages, CSS and JS: network first, so updates show straight away; the
     cached copy is only used when offline.

   Bump CACHE when an image is replaced under the same file name, so guests
   fetch the new one. */

var CACHE = "prish-v1";

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(["./", "index.html", "nalangu.html", "details.html", "css/styles.css", "js/main.js"]);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.indexOf("/assets/") !== -1) {
    event.respondWith(
      caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (hit) {
          return hit || fetch(request).then(function (response) {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).then(function (response) {
      if (response.ok) {
        var copy = response.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(request, copy);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(request, { ignoreSearch: true });
    })
  );
});
