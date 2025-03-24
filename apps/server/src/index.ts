import 'dotenv/config'
import {server, updatedCaptainLocation} from './utils/socket'
import { batchLocationUpdatesToDatabase } from './services/db_batching.services'
import { MIN_BATCH_SIZE } from './utils/constants'
const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

setInterval(async() => {
    // if(updatedCaptainLocation.length>=MIN_BATCH_SIZE)
    if(updatedCaptainLocation.size>0)
        console.log("interval running")
   await batchLocationUpdatesToDatabase()
  }, 10000);