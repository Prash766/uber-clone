const { parentPort, workerData } = require("node:worker_threads");
require('ts-node').register();  
const geolib = require("geolib");
const { userRequestRideLocation } = require("../../utils/socket");
const { MINIMUM_RANGE_VEHICLE } = require("../../utils/constants");


function fetchNearByVehicle(){
  console.log("Worker data",workerData)
const { captainInfo , userRideLocationDetails } = workerData;
console.log("captain info" , captainInfo)
const nearByCaptains = workerData.captainInfo?.filter(
  (captain) =>{
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
return nearByCaptains
}
if (parentPort) {
  console.log("nearby captain",nearByCaptains)
  setInterval(()=>{
    parentPort.postMessage(fetchNearByVehicle);
  },4000)
}
