import { MapContainer, TileLayer, useMap } from "react-leaflet";
import BookingFormContainer from "../components/BookingFormContainer";
import RideRequestForm from "../components/RideRequestBookingForm";
import { useDispatch, useSelector } from "@repo/redux-store";
import { RootState } from "@repo/redux-store/store";
import { useCallback, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { setUserLocation } from "@repo/redux-store/user_location";
import MapSkeleton from "../components/ui/MapSkeleton";
import SquareMarker from "../components/ui/MapIcons/SquareMaker";
import { createTimeMarkerIcon } from "../components/ui/TimeMarkerIcon";

const Routing = ({
  pickupLocation,
  destinationLocation,
}: {
  pickupLocation: { lat: number; lon: number; display_name: string };
  destinationLocation: { lat: number; lon: number; display_name: string };
}) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{
    pickup: L.Marker | null;
    destination: L.Marker | null;
  }>({ pickup: null, destination: null });
  const routingControl = useRef<L.Routing.Control | null>(null);

  const updateMarker = useCallback(
    (
      position: { lat: number; lon: number },
      type: "pickup" | "destination"
    ) => {
      if (markers[type]) {
        markers[type]?.remove();
      }
      const newMarker = L.marker([position.lat, position.lon], {
        icon: SquareMarker,
      }).addTo(map);
      setMarkers((prev) => ({
        ...prev,
        [type]: newMarker,
      }));
      map.flyTo([position.lat, position.lon], 16, {
        duration: 0.5,
        animate: true,
      });
    },
    [
      pickupLocation.lat,
      destinationLocation.lat,
      pickupLocation.lon,
      destinationLocation.lon,
    ]
  );

  useEffect(() => {
    if (routingControl.current) {
      routingControl.current.remove();
    }
    if (
      pickupLocation.lat === destinationLocation.lat &&
      pickupLocation.lon === destinationLocation.lon
    ) {
      return;
    }

    if (pickupLocation.lat && pickupLocation.lon) {
      updateMarker(pickupLocation, "pickup");
    }
    if (destinationLocation.lat && destinationLocation.lon) {
      updateMarker(destinationLocation, "destination");
    }
    if (pickupLocation.lat && destinationLocation.lat) {
      const routing = L.Routing.control({
        waypoints: [
          L.latLng(pickupLocation.lat, pickupLocation.lon),
          L.latLng(destinationLocation.lat, destinationLocation.lon),
        ],
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),

        lineOptions: {
          styles: [{ color: "#000000", opacity: 0.8, weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
        },
        show: false,
        plan: L.Routing.plan(
          [
            L.latLng(pickupLocation.lat, pickupLocation.lon),
            L.latLng(destinationLocation.lat, destinationLocation.lon),
          ],
          {
            createMarker: function () {
              return false;
            },
            draggableWaypoints: false,
            addWaypoints: false,
          }
        ),
      }).addTo(map);

      routing.on("routesfound", function (e) {
        console.log(e);
        const totalTimeInSeconds = e.routes[0].summary.totalTime;
        let totalTime = Math.floor(totalTimeInSeconds / 60);
        let timeFormat = "mins";
        if (totalTime > 60) {
          totalTime = Math.floor(totalTimeInSeconds / 3600);
          timeFormat = "hrs";
        }
        console.log(totalTime);
        const bounds = L.latLngBounds(
          [pickupLocation.lat, pickupLocation.lon],
          [destinationLocation.lat, destinationLocation.lon]
        ).pad(0.1);

        const pickUpTimeMarker = L.marker(
          [pickupLocation.lat, pickupLocation.lon],
          {
            icon: createTimeMarkerIcon(
              totalTime.toString(),
              pickupLocation.display_name,
              "pickup"
            ),
          }
        ).addTo(map);

        const destinationTimeMarker = L.marker(
          [destinationLocation.lat, destinationLocation.lon],
          {
            icon: createTimeMarkerIcon(
              totalTime.toString(),
              destinationLocation.display_name,
              "destination"
            ),
          }
        ).addTo(map);

        setMarkers({
          pickup: pickUpTimeMarker,
          destination: destinationTimeMarker,
        });

        map.fitBounds(bounds, {
          padding: [50, 50],
          duration: 1,
          animate: true,
        });
      });

      routingControl.current = routing;
    }
    return () => {
      if (routingControl.current) {
        routingControl.current.remove();
      }
      markers.pickup?.remove();
      markers.destination?.remove();
    };
  }, [pickupLocation, destinationLocation]);

  return null;
};

const RideBooking = () => {
  const { pickupLocation, destinationLocation } = useSelector(
    (state: RootState) => state.rideLocationReducer
  );
  const { location } = useSelector(
    (state: RootState) => state.userLocationReducer
  );
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  return (
    <>
      <BookingFormContainer children={[]} />
      <div className="container mx-auto my-2">
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <RideRequestForm />
          </div>
          <div className="col-span-5"></div>
          <div className="col-span-4 min-h-screen">
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
