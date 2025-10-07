from flask import Flask,jsonify,request,render_template, send_from_directory,session,redirect
from Models import db, sensors
from flask_session import Session
from logging import exception
from flask_cors import CORS
import os

app = Flask(__name__,
           static_folder="frontendPage",
           static_url_path="/")#nombre de fichero actual
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://sensores:H6E6e56EuB2EwQ5AHlKmOY3qrTdbAyDO@dpg-d3c86gogjchc73902lsg-a:5432/sensores_3czq" #se debe de copiar toda la ruta(igual a la de la base de datos en el path)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False#para que no salten errores molestos
db.init_app(app) #este es el tunel que realiza la base de datos con flask
#creamos una varibale global de la ruta donde esta el frontend
#direccion_front = os.path.join(os.path.dirname(__file__),"frontendPage")
obtener_json = {}
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
#aqui empiezan las rutas
#end point para enviar los datos

@app.route("/api/envio", methods = ["POST"])

def enviar_datos_sensor():
    global obtener_json
    obtener_json = request.get_json()
    #sensor_IR = obtener_json.get("sensor_IR")
    datos_sensor = sensors(
        sensor_temp = obtener_json.get('sensor_temp'),
        sensor_pulso_cardiaco = obtener_json.get('sensor_pulso_cardiaco'))
    temperatura_guardar, pulso_guarda = datos_sensor.rangeWarning()
    if temperatura_guardar is not None or pulso_guarda is not None:
        new_data = sensors(
            sensor_temp = temperatura_guardar,
            sensor_pulso_cardiaco = pulso_guarda
        )
        db.session.add(new_data)
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
                password = request.form.get("password")
                email = request.form.get("email")
                number_phone = request.form.get("number_phone")
                if user == "asclepio" and password == "asclepio123" and email == "asclepio@gmail.com" and number_phone == "54111" :
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
    
    app.run(debug=True,port=5000,host="0.0.0.0")
