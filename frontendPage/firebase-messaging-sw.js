//mas adelante le metemos codigo
  //import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  //import {getMessaging} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js";
  //import{onBackgroundMessage} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  //importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js');
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

  const firebaseConfig = {
    apiKey: "AIzaSyAZL9kxHHa-CniQ6LJndV85XyApc_jzM8I",
    authDomain: "asclepio-project.firebaseapp.com",
    projectId: "asclepio-project",
    storageBucket: "asclepio-project.firebasestorage.app",
    messagingSenderId: "332865941003",
    appId: "1:332865941003:web:b7b8483cd42a52cc3e610e",
    measurementId: "G-NLWLY7VBET"
  };
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
 
  //const app = initializeApp(firebaseConfig);
   const messaging = firebase.messaging();
   messaging.onBackgroundMessage(function(payload){
            console.log("mensaje en seguno plano", payload)
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
              body:payload.notification.body,
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
        


      })
  
   //getToken(messaging,{vapidKey:"BHxzzEn1JckEKZgbAKwbZgCsPkJu5dVXV0v8UEl9eTJt2ay0X1aCdpbRDR6Z7jXsu2tGyJ4ywyx1aItWIYaUoy8"})
