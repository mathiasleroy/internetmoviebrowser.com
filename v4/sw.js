importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

workbox.precaching.precacheAndRoute([
    // 'imb4.html',
    //--------------------
    { url: 'index.html', revision: '2' },
    'all.js',
    '404.html',
    'assets/css/main.css',
    'assets/js/papaparse.min.js',
    'assets/js/hammer-2.0.8.min.js',
    'assets/js/smtp-2.0.1.min.js',
    'assets/js/perfect-scrollbar-1.4.0.min.js',
    'assets/js/shepherd.min.js',
    'assets/js/fingerprint2-2.0.3.min.js',
    // 'https://firebasestorage.googleapis.com/v0/b/firebase-imb.appspot.com/o/movies-v4.2.0-i100.csv?alt=media&token=809f965e-660b-49d0-b879-44ff8c94ba6c',
    // 'https://firebasestorage.googleapis.com/v0/b/firebase-imb.appspot.com/o/movies-v4.2.0-i1000.csv?alt=media&token=809f965e-660b-49d0-b879-44ff8c94ba6c',
    // 'https://firebasestorage.googleapis.com/v0/b/firebase-imb.appspot.com/o/movies-v4.2.0-i10000.csv?alt=media&token=809f965e-660b-49d0-b879-44ff8c94ba6c',
]);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);


workbox.routing.registerRoute( // NOT  WORKING FOR POSTERS
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);


// workbox.routing.registerRoute( // NOT WORKING --> ERROR:  Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/v0/b/firebase-imb.appspot.com/o/movies-v4.2.0-i100.csv?alt=media&token=b0d00575-9c1c-4fd5-92d7-7b49d0f5c08c' from origin 'https://internetmoviebrowser.com' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, brave, https.
//   /\.csv$/,
//   // /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/firebase-imb\.appspot\.com\/o\//,
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'data-csv',
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200]
//       })
//     ]
//   })
// );

// https://firebasestorage.googleapis.com/v0/b/firebase-imb.appspot.com/o/movies-v4.2.0-i100.csv?alt=media&token=809f965e-660b-49d0-b879-44ff8c94ba6c
//// this doesn't work offline : 

// Access to XMLHttpRequest 
// at 'https://firebasestorage.googleapis.com/v0/b/firebase-imb.appspot.com/o/movies-v4.2.0-i100.csv?alt=media&token=b0d00575-9c1c-4fd5-92d7-7b49d0f5c08c' 
// from origin 'https://internetmoviebrowser.com' 
// has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, brave, https.
