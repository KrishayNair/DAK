// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyC2a9nstgy46bRRHr_eWlLjgU5YOU8zlNA",
    authDomain: "dak-sih.firebaseapp.com",
    projectId: "dak-sih",
    storageBucket: "dak-sih.firebasestorage.app",
    messagingSenderId: "104464634120",
    appId: "1:104464634120:web:57f0b5bf3e3caf88f69cbd"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './logo.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});