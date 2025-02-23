import { useSelector } from "@repo/redux-store";
import RideDetailCard from "./RideDetailCard";
import { RootState } from "@repo/redux-store/store";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getRidePrices } from "../api-client";

const ChooseYourRide = () => {
  const  {pickupLocation, destinationLocation}= useSelector((state:RootState)=> state.rideLocationReducer)
  const {mutate , data} = useMutation({
    mutationKey: ["ridePricing"],
    mutationFn : async()=>{
      if(pickupLocation.lat && pickupLocation.lon && destinationLocation.lon && destinationLocation.lat ){
          getRidePrices({locations:{
          pickup:{
            latitude : pickupLocation.lat ,
            longitude: pickupLocation.lon
          },
          destination: {
            latitude: destinationLocation.lat,
            longitude: destinationLocation.lon
          }
        }})
      }
    },
    onSuccess: (data)=>{
      console.log("price data",data)

    }
  })
useEffect(()=>{
if(pickupLocation.lat && destinationLocation.lat){
  mutate()
}
}, [pickupLocation , destinationLocation])
  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-85px)]">
      <h1 className="font-uber text-4xl font-bold">Choose a ride</h1>
      <div className="">
            <p className="font-uber font-semibold text-2xl mb-4 ">Recommended</p>
            {[...Array(3)].map((_) => (
          <RideDetailCard />
             ))}
      </div>
      <div className="">
        <h2 className="font-uber font-semibold text-2xl mb-4">Economy</h2>
        {[...Array(3)].map((_) => (
          <RideDetailCard />
        ))}
      </div>
    </div>
  );
};

export default ChooseYourRide;
