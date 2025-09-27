from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
#lo que hace el modelo es replicar la estructura que cremos en nuestra base de datos
#tiene que tener los mismos atributos que columnas tiene la tabla

#instanciamos
db = SQLAlchemy()

class sensors(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    sensor_temp = db.Column(db.Integer)
    sensor_pulso_cardiaco = db.Column(db.Integer)
    fecha_hora = db.Column(db.DateTime, default = datetime.now )
    def __str__(self): #como trabajamos con POO usaremos esto para ver los datos
            return "sensor_temperatura: {}- sensor_pulso_cardiaco: {}".format(
            self.sensor_temp,
            self.sensor_pulso_cardiaco
        )
    def serializar(self):
        return {
                "id" : self.id,
                "sensor_temp" : self.sensor_temp,
                "sensor_pulso_cardiaco" : self.sensor_pulso_cardiaco
        }
    def rangeWarning(self):
        temperatua_guardar = None
        pulso_guardar = None
        if self.sensor_temp < 23 or  self.sensor_temp > 37:
            temperatua_guardar = self.sensor_temp
        if self.sensor_pulso_cardiaco > 100 or self.sensor_pulso_cardiaco < 55:
            pulso_guardar = self.sensor_pulso_cardiaco
        return temperatua_guardar,pulso_guardar