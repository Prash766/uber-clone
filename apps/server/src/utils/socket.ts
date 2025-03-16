import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {SocketEvent} from '@repo/redux-store/event'

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
import { userAuthCheck } from "./helper";
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
});

io.on("connection", (socket)=>{
console.log("socket",socket)
socket.on("disconnect", ()=>{
  console.log("SOCKET DISCONNECTED")
})

socket.on(SocketEvent.getRides ,()=>{

})

socket.on(SocketEvent.captainActive , (data)=>{
  console.log("SOCKET ACTIVE")
  // console.log(data)
})
})

export { io, server, app };
