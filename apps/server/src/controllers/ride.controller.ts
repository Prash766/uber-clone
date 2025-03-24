import axios from "axios";
import asyncHandler from "../utils/asyncHandler";
import { createRideResponse } from "../utils/ride";

const ridePricing= asyncHandler(async(req ,res)=>{
try {
    const  {locations}= req.body
    // console.log(locations)
    const destination = locations.destination 
    const pickup = locations.pickup as {latitude : number , longitude : number}
    

    const baseUrl = process.env.GRASSHOPPER_ROUTE_API_ENDPOINT as string;
    const apiKey = process.env.GRASSHOPPER_API_KEY || ""

    const getRoute = async (profile:string) => {
        const route_data = {
            profile,
            points:[
                [
                    pickup.longitude,
                    pickup.latitude

                ],
                [
                    destination.longitude,
                    destination.latitude
                ]
            ],
        }  
      const response = await axios.post(`${baseUrl}key=${apiKey}`,route_data)
    //   console.log("price route",response)
      return response.data;
    };    
    const [carRes, bikeRes] = await Promise.all([getRoute("car"), getRoute("bike")]);
      const distance = carRes.paths[0].distance
      const bikeDuration = bikeRes.paths[0].time/1000
      const carDuration = carRes.paths[0].time/1000
      
    // console.log("car ride pricing response", carRes)
    // console.log("Bike ride pricing response", bikeRes)

      const response  =  createRideResponse(distance  , bikeDuration , carDuration , "INR")
    //   console.log("edited RESPOSNE",response)
      return res.status(200).json({
        success:true,
        response
      })
    
} catch (error) {
    console.log(error)
    return res.status(400).json({
        message: error
    })
    
}})

const rideRoute = asyncHandler(async(req , res)=>{
    try {
        const {pickup , destination} = req.body
        const baseUrl = process.env.GRASSHOPPER_ROUTE_API_ENDPOINT as string;
        const apiKey = process.env.GRASSHOPPER_API_KEY || ""
            const route_data = {
                profile:"car",
                points:[
                    [
                        pickup.longitude,
                        pickup.latitude
    
                    ],
                    [
                        destination.longitude,
                        destination.latitude
                    ]
                ],
                optimize:"true"
            }
            
          const response = await axios.post(`${baseUrl}key=${apiKey}`,route_data)
        //   console.log("RIDE ROUTE RESPONSE", response)
          const route_time_in_sec = response.data.paths[0].time/1000
          const route_time_in_min = Math.ceil(route_time_in_sec/60)
          let route_duration= null
        //   console.log("route in time", route_time_in_min)
          if(route_time_in_min>59){
            const hours = Math.floor(route_time_in_min / 60);
    const remainingMinutes = Math.ceil(route_time_in_min % 60);
    route_duration = `${hours}h ${remainingMinutes}min`
          }
          else{
            route_duration = `${route_time_in_min} min`
          }
        //   console.log("ride route", response.data.paths[0])
        return res.status(200).json({
            success:true,
            distance : Math.floor(response.data.paths[0].distance),
            distanceString: route_duration,
            eta: Math.floor(response.data.paths[0].time/1000),
            data:{
                polyline : response.data.paths[0].points,
            },
            legs:[
                {
                    distance : response.data.paths[0].distance,
                    duration: response.data.paths[0].time/1000
                }
            ]
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


/*
 * @function rideRoute
 * @description This asynchronous function handles incoming requests to generate a route 
 *              between a specified pickup and destination location using the OSRM (Open Source 
 *              Routing Machine) API. It calculates the distance and estimated time of arrival 
 *              (ETA) for the route, and returns a polyline representation of the route geometry.
 *
 * @params {Object} req - The request object containing pickup and destination coordinates.
 * @params {Object} res - The response object used to send back the desired HTTP response.
 *
 * @returns {Object} JSON response containing:
 *                  - success: Boolean indicating the success of the operation.
 *                  - distance: The total distance of the route in meters.
 *                  - eta: The estimated time of arrival in seconds.
 *                  - data: An object containing the polyline representation of the route geometry.
 *                  - legs: An array containing detailed information about the route segments, 
 *                          including distance and duration for each leg.
 *
 * @throws {Error} If an error occurs during the API call or processing, a 500 Internal 
 *                 Server Error response is returned with a relevant message.
 *
 * Note: Ensure that the OSRM endpoint is correctly configured in the environment variables 
 *       to facilitate successful API requests.
 */

// const rideRoute = asyncHandler(async(req , res)=>{
//     try {
//         const {pickup , destination} = req.body
//         const osrmEndpoint = `${process.env.OSRM_ENDPOINT_API as string}`
//         const coordinates = `${pickup.longitude},${pickup.latitude};${destination.longitude},${destination.latitude}`;
//         const url = `${osrmEndpoint}${coordinates}?overview=full&geometries=polyline`;
//         const response = await axios.get(url) 
//         return res.status(200).json({
//             success:true,
//             distance : Math.floor(response.data.routes[0].distance),
//             eta: Math.floor(response.data.routes[0].duration),
//             data:{
//                 polyline : response.data.routes[0].geometry,
//             },
//             legs:[
//                 {
//                     distance : response.data.routes[0].distance,
//                     duration: response.data.routes[0].duration
//                 }
//             ]
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//         message:"Internal Server Error"
//         })
        
//     }
// })






/*
 * @function ridePricing
 * @description This asynchronous function processes incoming requests to calculate ride pricing 
 *              based on the distance and estimated time of arrival (ETA) for different transportation 
 *              modes (car and bicycle) using the Valhalla routing API. It retrieves route summaries 
 *              for both modes and constructs a response with the relevant pricing information.
 *
 * @params {Object} req - The request object containing locations for pickup and destination.
 * @params {Object} res - The response object used to send back the desired HTTP response.
 *
 * @returns {Object} JSON response containing:
 *                  - success: Boolean indicating the success of the operation.
 *                  - response: An object with pricing details based on the distance and duration 
 *                              for car and bicycle modes.
 *
 * @throws {Error} If an error occurs during API calls or processing, a 400 Bad Request response 
 *                 is returned with a relevant error message.
 *
 * Note:  Some free hosted endpoints like valhalla1.openstreetmap.de or valhalla.demo.com 
 *       limit requests (e.g., 1–10 requests/minute). Skipped to using grasshopper

 *       
 */


// const ridePricing= asyncHandler(async(req ,res)=>{
// try {
//     const  {locations}= req.body
//     console.log(locations)
//     const destination = locations.destination 
//     const pickup = locations.pickup as {latitude : number , longitude : number}
    

//     const baseUrl = process.env.VALHALLA_OPTIMIZED_API_ENDPOINT as string;
//     const apiKey = process.env.VALHALLA_API_KEY || ""

//     const getRoute = async (costing: any) => {
//         const json =JSON.stringify({
//             locations: [
//                 { lat: destination.latitude, lon: destination.longitude },
//               { lat: pickup.latitude, lon: pickup.longitude},
//             ],
//             costing
//           })
        
//       const response = await axios.get(`${baseUrl}json=${json}`)
       
//       return response.data.trip.summary;
//     };    
//     const [carRes, bikeRes] = await Promise.all([getRoute("auto"), getRoute("bicycle")]);
//       console.log("car Res",carRes )
//       console.log("bike Res",bikeRes )
//       const distance = carRes
//       const bikeDuration = bikeRes
//       const carDuration = bikeRes
      
//       const response  =  createRideResponse(distance  , bikeDuration , carDuration , "INR")
//       console.log("edited RESPOSNE",response)
//       return res.status(200).json({
//         success:true,
//         response
//       })
    
// } catch (error) {
//     console.log(error)
//     return res.status(400).json({
//         message: error
//     })
    
// }})

