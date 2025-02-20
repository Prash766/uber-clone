import axios from "axios";
import asyncHandler from "../utils/asyncHandler";
import { createRideResponse } from "../utils/ride";

const ridePricing= asyncHandler(async(req ,res)=>{
const  {locations}= req.body
const destination = locations.destination
const pickup = locations.pickup as {latitude : number , longitude : number}
const carRes = await axios.get(
    `${process.env.OSRM_API_ENDPOINT}/driving/${pickup.longitude},${pickup.latitude};${destination[0].longitude},${destination[0].latitude}?overview=false`
  );
const bikeRes = await axios.get(
    `${process.env.OSRM_API_ENDPOINT}/cycling/${pickup.longitude},${pickup.latitude};${destination[0].longitude},${destination[0].latitude}?overview=false`
  );
  const distance = carRes.data.trip.summary.length
  const bikeDuration = bikeRes.data.trip.summary.time
  const carDuration = bikeRes.data.trip.summary.time
  
  const response  =  createRideResponse(distance  , bikeDuration , carDuration , "INR")
  return res.status(200).json({
    success:true,
    response
  })
})

const rideRoute = asyncHandler(async(req , res)=>{
    try {
        const {pickup , destination} = req.body
        const osrmEndpoint = 'http://router.project-osrm.org/route/v1/driving/';
        const coordinates = `${pickup.longitude},${pickup.latitude};${destination.longitude},${destination.latitude}`;
        const url = `${osrmEndpoint}${coordinates}?overview=full&geometries=polyline`;
        const response = await axios.get(url) 
        console.log(response.data)
        return res.status(200).json({
            success:true,
            data:{
                polyline : response.data.routes[0].geometry
            }
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
        message:"Internal Server Error"
        })
        
    }
})



export {
    ridePricing,
    rideRoute
}