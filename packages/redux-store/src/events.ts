export  enum SocketEvent {
    Connect = "connect",
    Disconnect = "disconnect",
    getRides = "getrides" ,  // when user wants to see get the rides after entering the pickup/destination details
  }
  

  export enum CaptainSocketEvent {
    captainLocationUpdate = "captain/locationUpdate",
    captainActive ="captain/captainActive",
  }