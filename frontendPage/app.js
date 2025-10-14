/*import {getAuth, signInAnonymously} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {getToken, onMessage} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js";
import { messaging } from "./firebase.js";
const notyf = new Notyf({
  duration: 5000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning'
      }
    },
    {
      type: 'error',
      background: 'indianred',
      duration: 2000,
      dismissible: true
    }
  ]
});
const loguearse = ()=>{
    signInAnonymously(getAuth()).then(usuario=>console.log(usuario));
}
    const activarMensaje = async()=>{
        const token = await getToken(messaging,{
            vapidKey:"BHxzzEn1JckEKZgbAKwbZgCsPkJu5dVXV0v8UEl9eTJt2ay0X1aCdpbRDR6Z7jXsu2tGyJ4ywyx1aItWIYaUoy8"
        }).catch(erro=> console.log("tuviste un error"));
        if(token){
            console.log("tu token", token);
            fetch("/usuarios_token",{
                  method:'POST',
                  headers:{'Content-Type':'application/json'},
                  body: JSON.stringify({token: token})
                })
                .then(res=> res.json())
                .then(data=>console.log("respuesta del server", data))
                console.log("esto se manda al server");
                console.log("token del usuario:", token);
            

        } 
        else{
            console.log("no tienes token")

        }
    }
const pedirPermiso = async () => {
  const permiso = await Notification.requestPermission();
  if (permiso === "granted") {
    activarMensaje();
  } else {
    console.log("Permiso denegado o ignorado");
  }
};
window.addEventListener("load", () => {
    loguearse(); // se ejecuta al cargar la página
    pedirPermiso();
});
*/
/*if(!localStorage.getItem("fcmToken")){
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

onMessage(messaging, (payload)=>{
    console.log("notificacion", payload);
    const title = payload.notification?.title || payload.data?.title || "Alerta";
    const body  = payload.notification?.body || payload.data?.body || "";
    notyf.open({
        type:'warning',
        message:body,
        //position:{
            //x:'center',
            //y:'top',
        //},
        duration:5000,
        ripple:true,
        icon:'<i class="bi bi-exclamation-triangle-fill"></i>'
        
    });

})
*/