from lib2to3.pytree import Base
import time
from datetime import datetime
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI
import uvicorn
import contextlib
import time
import threading
import socket
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from omron import OmronPLC

from pydantic import BaseModel

from dotenv import load_dotenv
import os
load_dotenv()

class ACRobotic(BaseModel):
    ac1: int
    ac2: int
class ACIOT(BaseModel):
    ac1: int
    ac2: int

class LampuIOT(BaseModel):
    lampu1: int
    lampu2: int
    lampu3: int
    lampu4: int
    lampu5: int
    lampu6: int
class LampuRobotic(BaseModel):
    lampu1: int
    lampu2: int
    lampu3: int
    lampu4: int
    lampu5: int
    lampu6: int
    lampu7: int
    lampu8: int
class BuzzerRobotic(BaseModel):
    buz2: int
class LS(BaseModel): 
    LS: int
class ResButton(BaseModel):
    But: int
#IP & port
PLC_IP = os.getenv("PLC_IP")
PLC_PORT = os.getenv("PLC_PORT")
HOST_API = os.getenv("HOST_API")
PORT_API = os.getenv("PORT_API")

#API 
GET_DATA_I = os.getenv("GET_DATA_I")
GET_DATA_PEOPLE = os.getenv("POST_DATA_PEOPLE")
POST_DATA_AC = os.getenv("POST_DATA_AC")
POST_DATA_LAMP = os.getenv("POST_DATA_LAMP")
POST_DATA_RESET = os.getenv("POST_DATA_RESET")


resACRobotic = [0,0]
resACIOT = [0,0]
resLampuRobotic = [0,0,0,0,0,0,0,0]
resLampuIOT = [0,0,0,0,0,0]
resBuz2 =[0]
resButton = [0]

resAllRobotic = [0,0,0,0,0,0,0,0,0,0,0]
resAllIOT = [0,0,0,0,0,0,0,0,0]
resLS = [0]

plc = OmronPLC()
plc.openFins(PLC_IP, PLC_PORT)

app = FastAPI()
  
@app.get("/{GET_DATA_I}")
def penuh():
    plc = OmronPLC()
    plc.openFins(PLC_IP, PLC_PORT)
    
    resAllIOT[0] = plc.readMemC("D406", 1)[0]
    resAllIOT[1] = plc.readMemC("D407", 1)[0]
    
    resAllIOT[2] = plc.readMemC("D400", 1)[0]
    resAllIOT[3] = plc.readMemC("D401", 1)[0]
    resAllIOT[4] = plc.readMemC("D402", 1)[0]
    resAllIOT[5] = plc.readMemC("D403", 1)[0]
    resAllIOT[6] = plc.readMemC("D404", 1)[0]
    resAllIOT[7] = plc.readMemC("D405", 1)[0]
    resAllIOT[8] = plc.readMemC("D600", 1)[0]
    return resAllIOT


@app.post("/{POST_DATA_AC}")
def penuh(value: ACIOT):
    print(value)
    plc = OmronPLC()
    plc.openFins(PLC_IP, PLC_PORT)
    
    plc.writeMemC("D306", [value.ac1])
    plc.writeMemC("D307", [value.ac2])
    resACIOT[0] = plc.readMemC("D406", 1)[0]
    resACIOT[1] = plc.readMemC("D407", 1)[0]
    return resACIOT

@app.post("/{POST_DATA_LAMP}")
def penuh(value: LampuIOT):
    print(value)
    plc = OmronPLC()
    plc.openFins(PLC_IP, PLC_PORT)
    
    plc.writeMemC("D300", [value.lampu1])
    plc.writeMemC("D301", [value.lampu2])
    plc.writeMemC("D302", [value.lampu3])
    plc.writeMemC("D303", [value.lampu4])
    plc.writeMemC("D304", [value.lampu5])
    plc.writeMemC("D305", [value.lampu6])
    
    resLampuIOT[0] = plc.readMemC("D400", 1)[0]
    resLampuIOT[1] = plc.readMemC("D401", 1)[0]
    resLampuIOT[2] = plc.readMemC("D402", 1)[0]
    resLampuIOT[3] = plc.readMemC("D403", 1)[0]
    resLampuIOT[4] = plc.readMemC("D404", 1)[0]
    resLampuIOT[5] = plc.readMemC("D405", 1)[0]
    return resLampuIOT

@app.get("/{GET_DATA_PEOPLE}")
def penuh():
    plc.openFins(PLC_IP, PLC_PORT)
    resLS = plc.readMemC("D600", 1)[0]
    return resLS

@app.post("/{POST_DATA_RESET}")
def penuh(value: ResButton):
    print(value)
    plc = OmronPLC()
    plc.openFins(PLC_IP, PLC_PORT)
    plc.writeMemC("D600", [value.But])

    resButton = plc.readMemC("D600", 1)[0]
    return resButton


@app.get("/")
def read_root():
    return {"Hello World"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Server(uvicorn.Server):
    def install_signal_handlers(self):
        pass

    @contextlib.contextmanager
    def run_in_thread(self):
        thread = threading.Thread(target=self.run)
        thread.start()
        try:
            while not self.started:
                time.sleep(1e-3)
            yield
        finally:
            self.should_exit = True
            thread.join()

config = uvicorn.Config(app=app, host=HOST_API, port=PORT_API, log_level="info")
server = Server(config=config)

if __name__ == "__main__":
    with server.run_in_thread():
        while True:
            pass