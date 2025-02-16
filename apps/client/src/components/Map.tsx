import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Circle,
} from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@repo/ui";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui";
import { useDispatch, useSelector } from "@repo/redux-store";
import { setUserLocation } from "@repo/redux-store/user_location";
import { RootState } from "@repo/redux-store/store";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { createTimeMarkerIcon } from "./ui/TimeMarkerIcon";


const createIcon = (color: string) => {
  return L.divIcon({
    className: "custom-icon",
    html: `
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="${color}"/>
        <circle cx="12" cy="12" r="6" fill="white"/>
      </svg>
    `,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
};

const userIcon = createIcon("#2563eb");
const pickupIcon = createIcon("#10B981");
const destinationIcon = createIcon("#EF4444");

const Skeleton = () => (
  <div className="space-y-4 w-full">
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse w-3/4"></div>
    <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse w-full"></div>
  </div>
);

const AccuracyCircle = ({
  position,
  accuracy,
}: {
  position: [number, number];
  accuracy: number;
}) => {
  const circleOptions = {
    color: "#2563eb",
    weight: 1,
    fillColor: "#60a5fa",
    fillOpacity: 0.15,
  };

  return (
    <Circle center={position} radius={accuracy} pathOptions={circleOptions} />
  );
};

const Routing = ({
  pickupLocation,
  destinationLocation,
}: {
  pickupLocation: { lat: number; lon: number ; display_name: string };
  destinationLocation: { lat: number; lon: number , display_name: string };
}) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);
  const [timeMarkers, setTimeMarkers] = useState<L.Marker[]>([]);
  
  useEffect(() => {
    if (!map || !pickupLocation || !destinationLocation) return;

    // Clear existing time markers
    timeMarkers.forEach(marker => marker.remove());

    if (routingControl) {
      map.removeControl(routingControl);
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(pickupLocation.lat, pickupLocation.lon),
        L.latLng(destinationLocation.lat, destinationLocation.lon),
      ],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
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
      lineOptions: {
        styles: [{ color: "#2563eb", opacity: 0.8, weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      show: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    // Handle route calculation complete
    control.on('routesfound', function(e) {
      const routes = e.routes;
      if (routes.length > 0) {
        const route = routes[0];
        const duration = Math.round(route.summary.totalTime / 60);
        
        // Create time markers at both ends
        const pickupMarker = L.marker(
          [pickupLocation.lat, pickupLocation.lon],
          {
            icon: createTimeMarkerIcon(`${duration}`, `${pickupLocation.display_name}` , "pickup")
          }
        ).addTo(map);

        const destMarker = L.marker(
          [destinationLocation.lat, destinationLocation.lon],
          {
            icon: createTimeMarkerIcon(`${duration}`, `${destinationLocation.display_name}`, "destination")
          }
        ).addTo(map);

        setTimeMarkers([pickupMarker, destMarker]);
      }
    });

    setRoutingControl(control);

    const bounds = L.latLngBounds(
      [pickupLocation.lat, pickupLocation.lon],
      [destinationLocation.lat, destinationLocation.lon]
    );
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      timeMarkers.forEach(marker => marker.remove());
      if (control) {
        map.removeControl(control);
      }
    };
  }, [map, pickupLocation, destinationLocation]);

  return null;
};

const RecenterMap = ({
  userLocation,
  pickupLocation,
  destinationLocation,
}: {
  userLocation: { lat: number; long: number } | null;
  pickupLocation: { lat: number; lon: number } | null;
  destinationLocation: { lat: number; lon: number } | null;
}) => {
  const map = useMap();
  const prevPickup = useRef<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (!map) return;

    if (pickupLocation && !destinationLocation) {
      if (
        !prevPickup.current ||
        prevPickup.current.lat !== pickupLocation.lat ||
        prevPickup.current.lon !== pickupLocation.lon
      ) {
        map.flyTo([pickupLocation.lat, pickupLocation.lon], 14, {
          duration: 1.5,
        });
        prevPickup.current = pickupLocation;
      }
    } else if (pickupLocation && destinationLocation) {
      const bounds = L.latLngBounds(
        L.latLng(pickupLocation.lat, pickupLocation.lon),
        L.latLng(destinationLocation.lat, destinationLocation.lon)
      );

      if (userLocation) {
        bounds.extend(L.latLng(userLocation.lat, userLocation.long));
      }

      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 17});
    } else if (userLocation && !pickupLocation) {
      map.setView([userLocation.lat, userLocation.long], 17, { duration: 1.5 });
    }
  }, [map, userLocation, pickupLocation, destinationLocation]);

  return null;
};

const Map = () => {
  const { location } = useSelector(
    (state: RootState) => state.userLocationReducer
  );
  const { pickupLocation, destinationLocation } = useSelector(
    (state: RootState) => state.rideLocationReducer
  );
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const ACCURACY_THRESHOLD = 20;
  const RETRY_DELAY = 1*60*1000;

  const startLocationWatch = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        dispatch(setUserLocation({ location: newLocation }));
        if (position.coords.accuracy > ACCURACY_THRESHOLD) {
          setTimeout(() => {
            startLocationWatch();
          }, RETRY_DELAY);
        } else {
          navigator.geolocation.clearWatch(id);
        }
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
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
  };

  useEffect(() => {
    startLocationWatch();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const hasValidLocation =
    location &&
    typeof location.lat === "number" &&
    typeof location.long === "number" &&
    typeof location.accuracy === "number";

  return (
    <Card className="w-full max-w-5xl lg:h-[576px] mx-auto mt-10 overflow-hidden shadow-lg">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {error && !hasValidLocation ? (
            <motion.div
              className="my-auto"
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          ) : !hasValidLocation ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center h-40 justify-center space-x-2 mb-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="text-lg font-medium text-gray-700">
                  Acquiring your location...
                </span>
              </div>
              <Skeleton />
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                {(location.accuracy ?? 0) > ACCURACY_THRESHOLD ? (
                  <Alert variant="default" className="mb-4 bg-blue-50">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertTitle>Improving Location Accuracy</AlertTitle>
                    <AlertDescription>
                      Current accuracy:{" "}
                      {location.accuracy ? Math.round(location.accuracy) : 0}m
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="default" className="mb-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>High Accuracy Location Acquired</AlertTitle>
                    <AlertDescription>
                      Accuracy:{" "}
                      {location.accuracy ? Math.round(location.accuracy) : 0}m
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              {location.lat !== null && location.long !== null && (
                <motion.div
                  className="rounded-lg overflow-hidden border border-gray-200 shadow-md"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapContainer
                    center={[location.lat, location.long]}
                    zoom={17}
                    scrollWheelZoom={true}
                    style={{ height: "60vh", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Pickup marker */}
                    {pickupLocation &&
                    pickupLocation.lat !== null &&
                    pickupLocation.lon !== null &&
                    pickupLocation.lat !== location.lat &&
                    pickupLocation.lon !== location.long ? (
                      <Marker
                        position={[pickupLocation.lat, pickupLocation.lon]}
                        icon={pickupIcon}
                      >
                        <Popup>
                          <div className="font-medium">Pickup Location</div>
                        </Popup>
                      </Marker>
                    ) : (
                      <Marker
                        position={[location.lat, location.long]}
                        icon={userIcon}
                      >
                        <Popup>
                          <div className="font-medium mb-1">
                            Your Current Location
                          </div>
                          <div className="text-gray-600">
                            Latitude: {location.lat.toFixed(6)}
                            <br />
                            Longitude: {location.long.toFixed(6)}
                          </div>
                        </Popup>
                      </Marker>
                    )}

                    {/* Destination marker */}
                    {destinationLocation &&
                      destinationLocation.lat !== null &&
                      destinationLocation.lon !== null && (
                        <Marker
                          position={[
                            destinationLocation.lat,
                            destinationLocation.lon,
                          ]}
                          icon={destinationIcon}
                        >
                          <Popup>
                            <div className="font-medium">Destination</div>
                          </Popup>
                        </Marker>
                      )}

                    { location && !pickupLocation.lat && !destinationLocation.lat ? (
                      <AccuracyCircle
                        position={[location.lat, location.long]}
                        accuracy={location.accuracy || 0}
                      />
                    ) : null}

                    {/* Add routing when both locations are available */}
                    {pickupLocation?.lat &&
                      pickupLocation.lon &&
                      destinationLocation?.lat &&
                      destinationLocation.lon && (
                        <Routing
                          pickupLocation={
                            pickupLocation as { lat: number; lon: number, display_name: string }
                          }
                          destinationLocation={
                            destinationLocation as { lat: number; lon: number , display_name: string }
                          }
                        />
                      )}

                    <RecenterMap
                      userLocation={
                        location.lat !== null && location.long !== null
                          ? { lat: location.lat, long: location.long }
                          : null
                      }
                      pickupLocation={
                        pickupLocation?.lat && pickupLocation.lon
                            ? {
                              lat: pickupLocation.lat,
                              lon: pickupLocation.lon,
                            }
                          : null
                      }
                      destinationLocation={
                        destinationLocation?.lat && destinationLocation.lon
                          ? {
                              lat: destinationLocation.lat,
                              lon: destinationLocation.lon,
                            }
                          : null
                      }
                    />
                  </MapContainer>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default Map;
