//mas adelante le metemos codigo
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import {getMessaging} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js";
  import{onBackgroundMessage} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAZL9kxHHa-CniQ6LJndV85XyApc_jzM8I",
    authDomain: "asclepio-project.firebaseapp.com",
    projectId: "asclepio-project",
    storageBucket: "asclepio-project.firebasestorage.app",
    messagingSenderId: "332865941003",
    appId: "1:332865941003:web:b7b8483cd42a52cc3e610e",
    measurementId: "G-NLWLY7VBET"
  };
 
  //const app = initializeApp(firebaseConfig);
  // Initialize Firebase
   const messaging = getMessaging();
   onBackgroundMessage(messaging,(payload)=>{
        console.log("mensaje en seguno plano", payload)
        const notificationTitle = "mesaje cuando no estas en linea";
        const notificationOptions = {
            body:'mensaje push de prueba',
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
   });
   //getToken(messaging,{vapidKey:"BHxzzEn1JckEKZgbAKwbZgCsPkJu5dVXV0v8UEl9eTJt2ay0X1aCdpbRDR6Z7jXsu2tGyJ4ywyx1aItWIYaUoy8"})

