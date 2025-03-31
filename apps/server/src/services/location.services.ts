import { CaptainActive, SocketLocationType } from '@repo/redux-store/socket_schema'
import * as geoLib from 'geolib'
import { LOCATION_UPDATE_THRESHOLD } from '../utils/constants'
import { activeCaptainsDetails, updatedCaptainLocation, userRequestRideLocation } from '../utils/socket'
import { Worker } from 'worker_threads'
import { Socket } from 'socket.io'
import { SocketEvent } from '@repo/redux-store/event'


const checkAndBatchLocationUpdate = (
    prevLocation: SocketLocationType,
    newLocation: SocketLocationType,
    captain_id: number
) => {
    console.log("PREV AND NEW LOCATION",prevLocation , newLocation)
    const locationDiff = geoLib.getDistance(prevLocation, newLocation)
    console.log("location diff" , locationDiff)
    // if (locationDiff > LOCATION_UPDATE_THRESHOLD) {
        if (locationDiff!==Number.NaN ) {
        updatedCaptainLocation.set(captain_id  ,{
            captainId: captain_id,
            coordinates: {
                longitude: newLocation.longitude,
            latitude: newLocation.latitude
            }
        })
        console.log("updatde captain location",updatedCaptainLocation)
    }
    console.log("updatde captain location",updatedCaptainLocation)

}

const getNearByVehicles= (socket:Socket)=>{
    const allCaptainDetails = activeCaptainsDetails.values()
    const captainDetails = []
    let nearByCaptains:Array<CaptainActive> = []
    for(let i=0; i<activeCaptainsDetails.size; i++){
        captainDetails.push(allCaptainDetails.next().value)
    }
    console.log("captain details",captainDetails)
    const worker = new Worker('./src/services/workers/nearby_rides.worker.js', {workerData:{captainInfo : captainDetails , userRideLocationDetails: userRequestRideLocation }})

    worker.on("message", (data)=>{
        nearByCaptains= [...data.result]
        console.log("near by captains",nearByCaptains)
        console.log("socket id",socket.id)
        socket.emit(SocketEvent.getRides, nearByCaptains)
    }) 
}

export {
    checkAndBatchLocationUpdate,
    getNearByVehicles
}