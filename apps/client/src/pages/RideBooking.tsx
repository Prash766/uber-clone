import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import BookingFormContainer from "../components/BookingFormContainer";
import RideRequestForm from "../components/RideRequestBookingForm";
import { useDispatch, useSelector } from "@repo/redux-store";
import { RootState } from "@repo/redux-store/store";
import { useEffect, useState } from "react";
import L, { icon } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { setUserLocation } from "@repo/redux-store/user_location";
import MapSkeleton from "../components/ui/MapSkeleton";
import SquareMarker from "../components/ui/MapIcons/SquareMaker";
import { createTimeMarkerIcon } from "../components/ui/TimeMarkerIcon";
import ChooseYourRide from "../components/ChooseYourRide";
import { useMutation } from "@tanstack/react-query";
import { getRideRoute } from "../api-client";
import { setRoutePolyline } from "@repo/redux-store/ride";
import { decode } from "@mapbox/polyline";
import VehicleMapMarker from "../components/ui/MapIcons/VehicleMapMarker";
import "leaflet-rotatedmarker";
import { SocketLocationType } from "@repo/redux-store/socket_schema";


const Routing = ({
  pickupLocation,
  destinationLocation,
}: {
  pickupLocation: { lat: number; lon: number; display_name: string };
  destinationLocation: { lat: number; lon: number; display_name: string };
}) => {
  const map = useMap();
  const [decodedCoordinates, setDecodedCoordinates] = useState<
    [number, number][]
  >([]);
  const {nearByVehicles}= useSelector((state:RootState)=> state.vehiclesReducers)
  const dispatch = useDispatch();
  const route = useSelector(
    (state: RootState) => state.rideLocationReducer.route
  );

  useEffect(() => {
    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map]);

  useEffect(() => {
    if (route.data.polyline) {
      L.marker([pickupLocation.lat, pickupLocation.lon], {
        icon: createTimeMarkerIcon(
          `${route.distanceString}`,
          pickupLocation.display_name,
          "pickup"
        ),
      }).addTo(map);
      L.marker([destinationLocation.lat, destinationLocation.lon], {
        icon: createTimeMarkerIcon(
          `${route.distanceString}`,
          destinationLocation.display_name,
          "destination"
        ),
      }).addTo(map);

      try {
        const decoded = decode(route.data.polyline).map(
          (coord) => [coord[0], coord[1]] as [number, number]
        );

        setDecodedCoordinates(decoded);
        if (decoded.length > 0) {
          const bounds = L.latLngBounds(decoded);
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error("Polyline decoding failed:", error);
      }
    }
  }, [route.data.polyline, map]);

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    if (pickupLocation?.lat) {
      L.marker([pickupLocation.lat, pickupLocation.lon], {
        icon: SquareMarker,
      }).addTo(map);
      map.flyTo([pickupLocation.lat, pickupLocation.lon], 14, {
        duration: 1.5,
      });
    }

    if (destinationLocation?.lat) {
      L.marker([destinationLocation.lat, destinationLocation.lon], {
        icon: SquareMarker,
      }).addTo(map);
      map.flyTo([destinationLocation.lat, destinationLocation.lon], 14, {
        duration: 1.5,
      });
    }
  }, [pickupLocation, destinationLocation, map]);

//   useEffect(()=>{
//     console.log("near by vehicles",nearByVehicles)
//     // nearbyVehicles showing on the maps 
//     if(nearByVehicles.length>0){
//     nearByVehicles.forEach((vehicle)=>{
//       return L.marker([vehicle.location.latitude , vehicle.location.longitude], {
//         icon: VehicleMapMarker(vehicle.data.vehicle.vehicleImage)
//       }).addTo(map);
//     })
//     }
// }, [nearByVehicles , route.data.polyline])

function calculateRotationAngle(prevPos: SocketLocationType, newPos :SocketLocationType) {
  if (!prevPos) return 0; // If there’s no previous position, default to 0

  const deltaLat = newPos.latitude - prevPos.latitude;
  const deltaLng = newPos.longitude - prevPos.longitude;

  const angleRad = Math.atan2(deltaLng, deltaLat);
  // Convert radians to degrees
  const angleDeg = angleRad * (180 / Math.PI);

  return angleDeg;
}

useEffect(() => {
  if (nearByVehicles.length > 0) {
    nearByVehicles.forEach((vehicle) => {
      // Get the current location
      const currentLocation = {
        latitude: vehicle.location.latitude ,
        longitude: vehicle.location.longitude 
      };

      // Calculate the rotation angle using a stored previous location
      const rotationAngle = calculateRotationAngle(vehicle.prevLocation, currentLocation);

      // Add or update the marker with rotation
      console.log("roation angle",rotationAngle)
      L.marker([currentLocation.latitude, currentLocation.longitude], {
        icon: VehicleMapMarker(vehicle.data.vehicle.vehicleImage),
        rotationAngle, // rotation in degrees
        rotationOrigin: 'center',
      }).addTo(map);
    });
  }
}, [nearByVehicles, map]);



  return decodedCoordinates.length > 0 ? (
    <Polyline
      positions={decodedCoordinates}
      pathOptions={{ color: "#000000", weight: 4 }}
    />
  ) : null;
};


const RideBooking = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const { pickupLocation, destinationLocation } = useSelector(
    (state: RootState) => state.rideLocationReducer
  );
  const { location } = useSelector(
    (state: RootState) => state.userLocationReducer
  );

  const { mutate } = useMutation({
    mutationKey: ["getRideRoute"],
    mutationFn: (params: { pickup: any; destination: any }) =>
      getRideRoute(params.pickup, params.destination),
    onSuccess: (data) => {
      console.log("route data", data);
      dispatch(setRoutePolyline(data));
    },
    onError: (error) => {
      console.error("Failed to get route:", error);
    },
  });

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        dispatch(setUserLocation({ location: newLocation }));
      },
      (error) => {
        setError(() => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              return "Please enable location services to use this feature.";
            case error.POSITION_UNAVAILABLE:
              return "Location information is unavailable.";
            case error.TIMEOUT:
              return "Location request timed out.";
            default:
              return "An unknown error occurred.";
          }
        });
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      pickupLocation?.lat &&
      pickupLocation?.lon &&
      destinationLocation?.lat &&
      destinationLocation?.lon
    ) {
      const pickup = {
        latitude: pickupLocation.lat,
        longitude: pickupLocation.lon,
      };
      const destination = {
        latitude: destinationLocation.lat,
        longitude: destinationLocation.lon,
      };
      mutate({ pickup, destination });
    }
  }, [pickupLocation, destinationLocation, mutate]);
  return (
    <>
      <BookingFormContainer children={[]} />
      <div className="container max-w-[2400px] mx-auto my-5">
        <div className="grid grid-cols-12">
          <div className="md:hidden lg:block lg:col-span-3">
            <RideRequestForm />
          </div>
          <div className="md:col-span-6 md:space-x-2 lg:col-span-5">
            <ChooseYourRide />  
          </div>
          <div className="z-0 md:col-span-6 lg:col-span-4 min-h-screen">
            {location.lat && location.long ? (
              <MapContainer
                center={[location.lat, location.long]}
                zoom={13}
                style={{ height: "645px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Routing
                  pickupLocation={
                    pickupLocation as {
                      lat: number;
                      lon: number;
                      display_name: string;
                    }
                  }
                  destinationLocation={
                    destinationLocation as {
                      lat: number;
                      lon: number;
                      display_name: string;
                    }
                  }
                />
              </MapContainer>
            ) : (
              <MapSkeleton error={error} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RideBooking;
