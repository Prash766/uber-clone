import app from "./utils/app";
import 'dotenv/config'
import http from 'http'
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})