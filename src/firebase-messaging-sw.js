// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  projectId: 'proyectofinal-b8ae1',
  appId: '1:633552562879:web:70c3a4a0f828817326b40a',
  databaseURL: 'https://proyectofinal-b8ae1-default-rtdb.firebaseio.com',
  storageBucket: 'proyectofinal-b8ae1.appspot.com',
  apiKey: 'AIzaSyBumsBoUN6VIeAsUsJ9qVPFPtBiu7-aXvk',
  authDomain: 'proyectofinal-b8ae1.firebaseapp.com',
  messagingSenderId: '633552562879',
  measurementId: 'G-8L1ZH4MD2G',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
    self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
  });
}
