import express from "express"
import cors from 'cors'

const app= express()

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true
}))

app.get('/', (req, res)=>{
res.send("Hello")
})

import userRouter from '../routes/user.routes'
app.use('/api/v1', userRouter)



export default app
