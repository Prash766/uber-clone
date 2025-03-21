import { Server, Socket } from "socket.io";
import {CaptainActive, GetNearByVehiclesRides} from '@repo/redux-store/socket_schema'

declare module "socket.io" {
  interface Socket {
    user:{
      role:string,
      id : number
    }
  }
}
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {CaptainSocketEvent, SocketEvent} from '@repo/redux-store/event'

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

import userRouter from "../routes/user.routes";
import captainRouter from "../routes/captain.routes";
import locationRouter from "../routes/location.routes";
import rideRouter from "../routes/ride.routes";
import errorMiddleware from "../middleware/error.middleware";
import { decodeToken, userAuthCheck } from "./helper";
import { JwtPayload } from "jsonwebtoken";
import { checkAndBatchLocationUpdate, getNearByVehicles } from "../services/location.services";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);
app.use("/api/v1/location", locationRouter);
app.use("/api/v1/ride", rideRouter);
app.get("/api/v1/user/auth" ,userAuthCheck)

app.use(errorMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
  },
  cookie : true 
});



export const mappingSocketToCaptainId= new Map()
export const mappingSocketToUserId = new Map()
// export const updatedCaptainLocation = new Array<{
//     captainId: number,
//     coordinates: {
//         longitude: number,
//         latitude: number
//     }
// }>()
export const updatedCaptainLocation = new Map<number, {
  captainId: number,
  coordinates: {
      longitude: number,
      latitude: number
  }
}>();

export let userRequestRideLocation : GetNearByVehiclesRides | null = null

export const activeCaptainsDetails = new Map<number , CaptainActive>()

io.use((socket , next)=>{
  const cookies = socket.handshake.headers.cookie;
  const token = cookies?.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
  if(token){
    const decodedToken = decodeToken(token) as JwtPayload
    const user = {
      role : decodedToken.role,
      id : decodedToken.id
    }
    socket.user = user
    next()
  }
})

io.on("connection", (socket)=>{
  console.log("connceted")



socket.on("disconnect", ()=>{
  if(socket.user.role==='user'){
    mappingSocketToUserId.delete(socket.id)
  }
  if(socket.user.role==='captain'){
    updatedCaptainLocation.delete(socket.user.id)
    mappingSocketToCaptainId.delete(socket.id)
  }

  console.log("SOCKET DISCONNECTED")
})

socket.on(SocketEvent.getRides ,(data:GetNearByVehiclesRides)=>{
  console.log("get rides",data)
  userRequestRideLocation= data
  const nearByVehicels = getNearByVehicles(socket)
  console.log("NEAR BY VEHICELS SERVER",nearByVehicels)
})

socket.on(CaptainSocketEvent.captainActive , (data)=>{
  console.log("data",data)
  mappingSocketToCaptainId.set(socket.id , data.captainId)
  activeCaptainsDetails.set(data.captainId , data)
  updatedCaptainLocation.set(socket.user.id , {
    captainId :data.captainId,
    coordinates : {
      latitude :data.location?.latitude,
      longitude : data.lcoation?.longitude
    }
  })
  console.log("SOCKET ACTIVE")
  console.log("mapping socket details" , mappingSocketToCaptainId)
  console.log("active captain details ", activeCaptainsDetails)
})

socket.on(CaptainSocketEvent.captainLocationUpdate , (data)=>{
  if(mappingSocketToCaptainId.get(socket.id)){
    const captain_id = mappingSocketToCaptainId.get(socket.id)
    const prevCaptainLocation = activeCaptainsDetails.get(captain_id)?.location
    const updatedCaptainLocationObject = {...activeCaptainsDetails.get(captain_id)?.location ,...data.location }
    activeCaptainsDetails.set(
      captain_id , 
      ({...activeCaptainsDetails.get(captain_id) ,location : updatedCaptainLocationObject} as CaptainActive)
    )
    const latestCaptainLocation = activeCaptainsDetails.get(captain_id)?.location
    if(prevCaptainLocation &&  latestCaptainLocation){
      checkAndBatchLocationUpdate(prevCaptainLocation , latestCaptainLocation, captain_id)
    }
  }
  console.log("mapping socket details" , mappingSocketToCaptainId)
  console.log("active captain details ", activeCaptainsDetails)

  
})
})

export { io, server, app };
