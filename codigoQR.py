import qrcode
url = "http://192.168.1.52:8000"
img = qrcode.make(url)
img.save("codigo_qr.png")