importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBHR7c9HCOXizWGutDmCGJxcAaEKJTnO5I",
  authDomain: "green-tshirts-chat.firebaseapp.com",
  projectId: "green-tshirts-chat",
  storageBucket: "green-tshirts-chat.firebasestorage.app",
  messagingSenderId: "73888519696",
  appId: "1:73888519696:web:53d261417309dd1b33dc95"
});

const messaging = firebase.messaging();

var CACHE_NAME = 'mrleaf-v1';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});

// Background push notifications via FCM
messaging.onBackgroundMessage(function(payload) {
  var title = (payload.notification && payload.notification.title) || 'Mr.Leaf Alert';
  var body = (payload.notification && payload.notification.body) || 'A customer needs your attention!';
  self.registration.showNotification(title, {
    body: body,
    icon: 'https://cdn.shopify.com/s/files/1/0994/4088/6089/files/leaf_avatar.webp?v=1775670216',
    badge: 'https://cdn.shopify.com/s/files/1/0994/4088/6089/files/leaf_avatar.webp?v=1775670216',
    vibrate: [200, 100, 200]
  });
});

// Foreground push handler
self.addEventListener('push', function(e) {
  var data = e.data ? e.data.json() : {};
  var title = data.title || 'Mr.Leaf Alert';
  var body = data.body || 'A customer needs your attention!';
  e.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: 'https://cdn.shopify.com/s/files/1/0994/4088/6089/files/leaf_avatar.webp?v=1775670216',
      badge: 'https://cdn.shopify.com/s/files/1/0994/4088/6089/files/leaf_avatar.webp?v=1775670216',
      vibrate: [200, 100, 200],
      data: data
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      if (clientList.length > 0) { return clientList[0].focus(); }
      return clients.openWindow('/');
    })
  );
});
