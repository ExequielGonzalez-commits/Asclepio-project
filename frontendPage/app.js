import {getAuth, signInAnonymously} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {getToken, onMessage} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js";
import { messaging } from "./firebase.js";
const notyf = new Notyf();
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
window.addEventListener("load", () => {
    loguearse(); // se ejecuta al cargar la página
    activarMensaje();
});

onMessage(messaging, (payload)=>{
    console.log("notificacion", payload);
    const title = payload.notification?.title || payload.data?.title || "Alerta";
    const body  = payload.notification?.body || payload.data?.body || "";
    notyf.success({
        message:title,
        position:{
            x:'center',
            y:'top',
        },
        duration:3000,
        ripple:true
    });

})
