import 'dotenv/config'
import {server} from './utils/socket'
const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})