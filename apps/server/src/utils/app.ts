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
import errorMiddleware from "../middleware/error.middleware"
app.use('/api/v1/user', userRouter)

app.use(errorMiddleware)



export default app
