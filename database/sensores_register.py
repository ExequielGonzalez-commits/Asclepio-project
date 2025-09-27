import sqlite3 as sql

DB_PATH = "C:\\Users\Estudiante\Desktop\Asclepio-project-main\database\sensors.db"

def createDB():
    conn = sql.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE sensors(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sensor_temp INTEGER,
            sensor_pulso_cardiaco INTEGER,
            fecha_hora TEXT
            )
    """)
    conn.commit()
    conn.close()
def addValues():
    conn = sql.connect(DB_PATH)
    cur = conn.cursor()
    datos = [
        (23, 23),
        (34, 56),
        (17, 33),
        (33, 54)
    ]
    cur.executemany("""INSERT INTO sensors(sensor_temp,sensor_pulso_cardiaco, fecha_hora) VALUES (?,?,(datetime('now','localtime')))""",datos)
    conn.commit()
    conn.close()

def tableDelete():
    conn = sql.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    DELETE FROM sensors;
""")

def addNewDatetime():
    conn = sql.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO sensors (fecha_hora) VALUES (datetime('now', 'localtime'));
""")

def AddNewData():
    conn = sql.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    ALTER TABLE sensors
                ADD COLUMN fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP;
""")
    conn.commit()
    conn.close()


if __name__ == "__main__":
    createDB()