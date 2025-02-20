import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app= express()

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res)=>{
res.send("Hello")
})

import userRouter from '../routes/user.routes'
import captainRouter from '../routes/captain.routes'
import locationRouter from '../routes/location.routes'
import rideRouter from '../routes/ride.routes'
import errorMiddleware from "../middleware/error.middleware"
app.use('/api/v1/user', userRouter)
app.use('/api/v1/captain',captainRouter)
app.use('/api/v1/location',locationRouter)
app.use('/api/v1/ride', rideRouter)

app.use(errorMiddleware)



export default app
