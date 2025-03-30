import { useDispatch, useSelector } from "@repo/redux-store";
import RideDetailCard from "./RideDetailCard";
import { RootState } from "@repo/redux-store/store";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getRidePrices } from "../api-client";
import { setRideVehicleList } from "@repo/redux-store/ride";
import { RideDetailCardSkeleton } from "@repo/ui";
import { Button } from "@repo/ui";
import { DollarSign, ChevronDown } from "lucide-react";

const ChooseYourRide = () => {
  const { pickupLocation, destinationLocation } = useSelector(
    (state: RootState) => state.rideLocationReducer
  );
  const { rideVehicleList } = useSelector(
    (state: RootState) => state.rideLocationReducer
  );
  const dispatch = useDispatch()

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["ridePricing"],
    mutationFn: async () => {
      if (
        pickupLocation.lat &&
        pickupLocation.lon &&
        destinationLocation.lon &&
        destinationLocation.lat
      ) {
        return getRidePrices({
          locations: {
            pickup: {
              latitude: pickupLocation.lat,
              longitude: pickupLocation.lon,
            },
            destination: {
              latitude: destinationLocation.lat,
              longitude: destinationLocation.lon,
            },
          },
        });
      }
    },
    onSuccess: (data) => {
      dispatch(setRideVehicleList(data));
    },
  });

  useEffect(() => {
    if (pickupLocation.lat && destinationLocation.lat) {
      mutate();
    }
  }, [pickupLocation, destinationLocation]);

  return (
    <div className="relative flex flex-col gap-4 overflow-y-auto h-[calc(100vh-85px)]">
      <h1 className="font-uber text-4xl font-bold">Choose a ride</h1>
      
      {isPending ? (
        // Loading state with skeleton loaders
        <>
          <div>
            <h2 className="font-uber font-semibold text-2xl mb-4">Recommended</h2>
            {[...Array(3)].map((_, index) => (
              <RideDetailCardSkeleton key={`recommended-skeleton-${index}`} />
            ))}
          </div>
          <div>
            <h2 className="font-uber font-semibold text-2xl mb-4">Economy</h2>
            {[...Array(3)].map((_, index) => (
              <RideDetailCardSkeleton key={`economy-skeleton-${index}`} />
            ))}
          </div>
        </>
      ) : (
        // Loaded state with actual data
        <div>
          {rideVehicleList.products.tiers.map((vehicle, index) => (
            <div key={index}>
              <h2 className="font-uber font-semibold text-2xl mb-4">
                {vehicle.title}
              </h2>
              {vehicle.products.map((vehicle, index) => (
                <RideDetailCard key={index} vehicle={vehicle} />
              ))}
            </div>
          ))}
          
          {/* Floating Book Ride Button */}
          <div className="sticky  bottom-1 z-10">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-uber font-medium">Cash</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <Button className="bg-black hover:bg-black/90 text-white font-uber font-medium w-full max-w-[calc(100%-150px)] px-8 py-2 rounded-md">
                Request Moto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseYourRide;