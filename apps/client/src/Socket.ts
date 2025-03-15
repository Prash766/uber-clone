import { io, Socket } from "socket.io-client";
export interface SocketInterface {
  socket: Socket | null;
}

class SocketConnection implements SocketInterface {
  public socket: Socket;
  public socketEndpoint: string = import.meta.env.VITE_PUBLIC_SOCKET_URL;
  constructor() {
    this.socket = io(this.socketEndpoint);
  }
}

let socketConnection: SocketConnection | undefined;
class SocketService {
  static createSocket(): SocketConnection {
    if (!socketConnection) {
      socketConnection = new SocketConnection();
    }
    return socketConnection;
  }
}

export default SocketService;
