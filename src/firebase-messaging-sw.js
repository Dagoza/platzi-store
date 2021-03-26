// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCbNMWe-1_0fQlu42aKoFsjIAB0xqaSoQo",
    authDomain: "test-7f779.firebaseapp.com",
    databaseURL: "https://test-7f779.firebaseio.com",
    projectId: "test-7f779",
    storageBucket: "test-7f779.appspot.com",
    messagingSenderId: "315674071401",
    appId: "1:315674071401:web:add2da2fcb49d95c88adf8"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();