const { parentPort, workerData } = require("node:worker_threads");
require('ts-node').register();  
const geolib = require("geolib");
const { userRequestRideLocation } = require("../../utils/socket");
const { MINIMUM_RANGE_VEHICLE } = require("../../utils/constants");

const { captainInfo , userRideLocationDetails } = workerData;

function fetchNearByVehicle(){
  console.log("Worker data",workerData)
console.log("captain info" , captainInfo)
const nearByCaptains = workerData.captainInfo?.filter(
  (captain) =>{
    console.log("captain location",      captain.location )
    console.log("user details" ,userRideLocationDetails )
    console.log(userRideLocationDetails.pickupLocation)
    console.log( "distance", geolib.getDistance(
      userRideLocationDetails.pickupLocation,
      captain.location
    )/1000)
  //  return  (geolib.getDistance(
  //     userRideLocationDetails.pickupLocation,
  //     captain.location
  //   )/1000) === MINIMUM_RANGE_VEHICLE
   return  (geolib.getDistance(
      userRideLocationDetails.pickupLocation,
      captain.location
    )/1000) <= 50
  }
);
console.log("near by captains",nearByCaptains)
return nearByCaptains
}
if (parentPort) {
  setInterval(()=>{
try {
      parentPort.postMessage({result: fetchNearByVehicle()});
  
} catch (error) {
  console.log("error",error)
  
}    // console.log("nearby captain",nearByCaptains)

  },4000)
}
