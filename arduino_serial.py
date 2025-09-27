import serial,time
import json
import requests
url = "http://127.0.0.1:4000/api/envio"

arduino = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(2)
line_read = arduino.readline().decode("utf-8").strip()
while True:
    try:
            datos = json.loads(line_read)
            response = requests.post("http://127.0.0.1:4000/api/envio", json = datos)
    except Exception as no:
        print("error", no)