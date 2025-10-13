
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
  import {getMessaging, getToken, onMessage} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js";
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
 

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const messaging = getMessaging(app);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    if(!registrations.find(r => r.active && r.scriptURL.includes('firebase-messaging-sw.js'))) {
        navigator.serviceWorker.register('firebase-messaging-sw.js')
            .then(reg => console.log('SW registrado', reg))
            .catch(err => console.log('Error SW', err));
    }
 });

}
   //getToken(messaging,{vapidKey:"BHxzzEn1JckEKZgbAKwbZgCsPkJu5dVXV0v8UEl9eTJt2ay0X1aCdpbRDR6Z7jXsu2tGyJ4ywyx1aItWIYaUoy8"})
if(!localStorage.getItem("fcmToken")){
  console.log('Requesting permisssion');
    Notification.requestPermission().then(permission => {
        if(permission == 'granted'){
            console.log('notificacion permitida');
            
           
  
            //new Notification("prueba", {body: "funciona el push"});
            getToken(messaging, {vapidKey:"BHxzzEn1JckEKZgbAKwbZgCsPkJu5dVXV0v8UEl9eTJt2ay0X1aCdpbRDR6Z7jXsu2tGyJ4ywyx1aItWIYaUoy8"}).then(currentToken => {
              if(currentToken){
                localStorage.setItem("fcmToken", currentToken);
                fetch("/usuarios_token",{
                  method:'POST',
                  headers:{'Content-Type':'application/json'},
                  body: JSON.stringify({token: currentToken})
                })
                .then(res=> res.json())
                .then(data=>console.log("respuesta del server", data))
                console.log("esto se manda al server");
                console.log("token del usuario:", currentToken);
              }
              else{
                console.log("no hay token registrado.requiere que genere uno");
              }
            })
            .catch(err => {
              console.log("error obtenido",err);
            });
            
        }

    })

}

onMessage(messaging, (payload) =>{
  console.log("notificacion", payload)
  const div = document.createElement("div")
  div.innerText = `alerta:${payload.notification.title} - ${payload.notification.body}`
  div.style.background = "yellow";
  div.style.padding = "10px";
  document.body.appendChild(div)
});


//requestPermission();