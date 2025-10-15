from flask import Flask,jsonify,request,render_template, send_from_directory,session,redirect
from Models import db, sensors, usuarios_token
from flask_session import Session
from logging import exception
import firebase_admin 
from firebase_admin import messaging,credentials
from sqlalchemy import text,func
from flask_cors import CORS
import os,json

app = Flask(__name__,
           static_folder="frontendPage",
           static_url_path="/")#nombre de fichero actual
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://sensores:FGtmiXdqsqKTjvWHCVUYJv91bEPRcLdp@dpg-d3it9uje5dus739cvtag-a/sensores_lky1" #se debe de copiar toda la ruta(igual a la de la base de datos en el path)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False#para que no salten errores molestos
db.init_app(app)
#inicializamos la firebase key
json_path = json.loads(os.environ['FIREBASE_CREDENTIALS'])
cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred)
with app.app_context():
    db.create_all()
#este es el tunel que realiza la base de datos con flask
user_key = {}
#creamos una varibale global de la ruta donde esta el frontend
#direccion_front = os.path.join(os.path.dirname(__file__),"frontendPage")
obtener_json = {}
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
def eliminar_duplicados():
     encontrar_duplicados = db.session.query(
          usuarios_token.token
     ).group_by(usuarios_token.token).having(func.count(usuarios_token.token)>1).all()
     for (token,) in encontrar_duplicados:
          registros = usuarios_token.query.filter_by(token=token).all()
          for registro in registros[1:]:
               db.session.delete(registro)
     db.session.commit()
#aqui empiezan las rutas
#end point para enviar los datos
@app.route("/usuarios_token", methods = ['POST'])
def usuarios_db():
     user_key = request.get_json()
     if not user_key or 'token' not in user_key:
             return jsonify({'error': 'No se recibió token'}), 400
     existing = usuarios_token.query.filter_by(token=user_key['token']).first()
     if existing:
            return jsonify({'mensaje': 'Token ya existe'}), 200
     token_id = usuarios_token(token = user_key['token'])
     db.session.add(token_id)
     db.session.commit()
     eliminar_duplicados()
     return jsonify({'mensaje':'token del usuario guardado'})

     #pass


#@app.route("/alerta", methods = ['POST'])
def alerta_push(titulo, cuerpo_mensaje):
     usuarios = usuarios_token.query.all()
     for usuario in usuarios:
        message = messaging.Message(
            #lo pasamos como data
            data={
                "title": titulo,
                "body": cuerpo_mensaje,
                "link":"https://asclepio-project.onrender.com/",
                "click_action": "https://asclepio-project.onrender.com/"
            },
            #lo pasamos como notificacion
            #notification = messaging.Notification(
                   # title = titulo,
                   #body = cuerpo_mensaje
          #),
                
  
            token=usuario.token
        )
        try:
                
                messaging.send(message)
                print(f"✅ Notificación enviada a {usuario.token[:20]}...")
        except firebase_admin.exceptions.FirebaseError as error:
                        print(f"❌ Error con token {usuario.token[:20]}... {error}")
                        db.session.delete(usuario)
                        db.session.commit()
                
@app.route("/api/envio", methods = ["POST"])
def enviar_datos_sensor():
    global obtener_json
    obtener_json = request.get_json()
    #sensor_IR = obtener_json.get("sensor_IR")
    pulso = obtener_json.get("sensor_pulso_cardiaco")
    if pulso > 100 or pulso < 60:
        alerta_push("alerta del sensor",f"se a pasado del umbral: {pulso}")
        datos_sensor = sensors(sensor_pulso_cardiaco=pulso)
        db.session.add(datos_sensor)
        db.session.commit()
        return jsonify({'mensaje': 'dato posiblemente peligroso guradado!'}), 200
    else:
        return jsonify({'mensaje':'dato ignorado',})


@app.route("/api/datosBPM")
def datosGuardadosBPM():
    registros = sensors.query.all()
    lista_datos = [
        {
            "sensor_pulso_cardiaco":r.sensor_pulso_cardiaco,
            #"fecha_hora":r.fecha_hora
            "fecha": r.fecha_hora.date().isoformat() if r.fecha_hora  else "Sin fecha",
            "hora": r.fecha_hora.strftime("%H:%M:%S") if r.fecha_hora else ""
        }
        for r in registros
   ]
    return jsonify(lista_datos), 200
@app.route("/api/testdb")
def test_db():
    try:
            result = db.session.execute(text("SELECT 1"))
            return jsonify({"mensaje": "DB OK", "resultado": [r[0] for r in result]}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error DB", "error": str(e)}), 500
   


@app.route("/api/ver", methods = ['GET'])
def verDatos():
    return jsonify(obtener_json),200

#@app.route("/<path:path>")
#def archivos_estaticos():
    #return send_from_directory(direccion_front,path)


@app.route("/login", methods=["GET", "POST"])
def login():

        if request.method == "POST":
                user = request.form.get("user")
                email = request.form.get("email")
                password = request.form.get("password")
                if user == "asclepio" and password == "asclepio123" and email == "asclepio@gmail.com" :
                    session["user"] = user
                    return redirect("/")
        return app.send_static_file("login.html")
@app.route("/")
def home():
    if "user" in session:
        return app.send_static_file("index.html")
    else:
        return redirect("/login")

if __name__ == "__main__":    
    with app.app_context():
        db.create_all()
        eliminar_duplicados()
    
    app.run(debug=True,port=5000,host="0.0.0.0")
