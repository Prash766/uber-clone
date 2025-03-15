import { Middleware } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  connectionEstablished,
  connectionLost,
  initSocket,
} from "../slice/Socket";
import SocketService from "../../../../apps/client/src/Socket";
import { SocketEvent } from "../events";
interface SocketInterface {
  socket: Socket;
}
const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface;

  return (next) => (action) => {
    console.log("init soket action creator", initSocket);
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
        return next(newAction)
      }
    }
    next(action)
  };
};

export default socketMiddleware;
