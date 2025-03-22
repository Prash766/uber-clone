import { Middleware } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  connectionEstablished,
  connectionLost,
  getNearByVehicles,
  initSocket,
  sendCaptainActiveSocketEvent,
  socketUpdateCaptainLocation,
} from "../slice/Socket";
import SocketService from "../../../../apps/client/src/Socket";
import { CaptainSocketEvent, SocketEvent } from "../events";
import { setNearByVehicles } from "@repo/redux-store/vehicles";
interface SocketInterface {
  socket: Socket;
}
const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface;

  return (next) => (action) => {
    if (initSocket.match(action)) {
      if (!socket && typeof window !== undefined) {
        socket = SocketService.createSocket();
        console.log("socket",socket)
        const modifiedPayload= {
            ...action.payload,
            socket : socket
        }
        const newAction = {...action , payload :modifiedPayload}
        
        store.dispatch(connectionEstablished());

        socket.socket.on(SocketEvent.Disconnect, () => {
          store.dispatch(connectionLost());
          console.log("disconnected")
          store.getState()
        });

        socket.socket.on(SocketEvent.getRides, (data)=>{
          console.log("socket get RIDES DATA", data)
          store.dispatch(setNearByVehicles(data))
          
        })
        return next(newAction)
      }
    }
    if(getNearByVehicles.match(action)){
      console.log("socket middleware near vvehiels")
      console.log("action payload", action)
        socket.socket.emit(SocketEvent.getRides ,action.payload )
    }
    if(sendCaptainActiveSocketEvent.match(action)){
      console.log("action payload inside the captain active socket ",action.payload)
        socket.socket.emit(CaptainSocketEvent.captainActive,action.payload )
    }
    if(socketUpdateCaptainLocation.match(action)){
      console.log("socket update",action.payload )
      socket.socket.emit(CaptainSocketEvent.captainLocationUpdate , action.payload)
    }
    next(action)
  };
};

export default socketMiddleware;
