// Optional future service-worker file.
// This starter is intentionally kept simple so GitHub Pages can serve it without build tooling.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
