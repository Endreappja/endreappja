importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDeJ-UuJ_ZSzUIsfUm0exK5GQx3iFH8qbU",
  authDomain: "endreappja82.firebaseapp.com",
  projectId: "endreappja82",
  storageBucket: "endreappja82.firebasestorage.app",
  messagingSenderId: "948525594042",
  appId: "1:948525594042:web:444787ac68df93519e9983"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };
  self.registration.showNotification(notificationTitle, notificationOptions);
});