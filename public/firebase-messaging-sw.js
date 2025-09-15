importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDwF3t-O6ID9rFYYUIwpix3gBAvA3oxYio",
  authDomain: "endreappja-loc.firebaseapp.com",
  projectId: "endreappja-loc",
  storageBucket: "endreappja-loc.firebasestorage.app",
  messagingSenderId: "984861279216",
  appId: "1:984861279216:web:ca449ca7c3b9b38f3cd335",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('sw onBackgroundMessage ', payload);
  if (payload.notification) {
    const { title, body } = payload.notification;
    self.registration.showNotification(title, { body });
  }
});
