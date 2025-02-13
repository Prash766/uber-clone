import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@repo/ui";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui";
import { useDispatch, useSelector } from "@repo/redux-store";
import { setUserLocation } from "@repo/redux-store/user_location";
import { RootState } from "@repo/redux-store/store";
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

// Define marker icons
const createIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="${color}"/>
        <circle cx="12" cy="12" r="6" fill="white"/>
      </svg>
    `,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36]
  });
};

const userIcon = createIcon('#2563eb');
const pickupIcon = createIcon('#10B981');
const destinationIcon = createIcon('#EF4444');

const Skeleton = () => (
  <div className="space-y-4 w-full">
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse w-3/4"></div>
    <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse w-full"></div>
  </div>
);

const AccuracyCircle = ({ 
  position, 
  accuracy 
}: { 
  position: [number, number]; 
  accuracy: number;
}) => {
  const circleOptions = {
    color: '#2563eb',
    weight: 1,
    fillColor: '#60a5fa',
    fillOpacity: 0.15,
  };

  return (
    <Circle
      center={position}
      radius={accuracy}
      pathOptions={circleOptions}
    />
  );
};

const Routing = ({ 
  pickupLocation, 
  destinationLocation 
}: { 
  pickupLocation: { lat: number; long: number }; 
  destinationLocation: { lat: number; long: number };
}) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map || !pickupLocation?.lat || !destinationLocation?.lat) return;

    if (routingControl) {
      map.removeControl(routingControl);
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(pickupLocation.lat, pickupLocation.long),
        L.latLng(destinationLocation.lat, destinationLocation.long)
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      plan: L.Routing.plan(
        [
          L.latLng(pickupLocation.lat, pickupLocation.long),
          L.latLng(destinationLocation.lat, destinationLocation.long)
        ],
        {
          createMarker: function() { return false; },
          draggableWaypoints: false,
          addWaypoints: false
        }
      ),
      lineOptions: {
        styles: [{ color: '#2563eb', opacity: 0.8, weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      show: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false
    }).addTo(map);

    setRoutingControl(control);

    const bounds = L.latLngBounds(
      [pickupLocation.lat, pickupLocation.long],
      [destinationLocation.lat, destinationLocation.long]
    );
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
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
  destinationLocation 
}: { 
  userLocation: any;
  pickupLocation?: any;
  destinationLocation?: any;
}) => {
  const map = useMap();

  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      const bounds = L.latLngBounds(
        L.latLng(pickupLocation.lat, pickupLocation.long),
        L.latLng(destinationLocation.lat, destinationLocation.long)
      );
      
      if (userLocation?.lat && userLocation?.long) {
        bounds.extend(L.latLng(userLocation.lat, userLocation.long));
      }
      
      map.fitBounds(bounds, { 
        padding: [50, 50],
        maxZoom: 17
      });
    } else if (pickupLocation) {
      map.setView([pickupLocation.lat, pickupLocation.long], 17);
    } else if (userLocation?.lat && userLocation?.long) {
      map.setView([userLocation.lat, userLocation.long], 17);
    }
  }, [map, userLocation, pickupLocation, destinationLocation]);

  return null;
};

const Map = () => {
  const { location } = useSelector((state: RootState) => state.userLocationReducer);
  const { pickupLocation, destinationLocation } = useSelector((state: RootState) => state.rideLocationReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const ACCURACY_THRESHOLD = 20;
  const RETRY_DELAY = 10000;

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

  const hasValidLocation = location && 
    typeof location.lat === 'number' && 
    typeof location.long === 'number' && 
    typeof location.accuracy === 'number';

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
                      Current accuracy: {location.accuracy ? Math.round(location.accuracy) : 0}m
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="default" className="mb-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>High Accuracy Location Acquired</AlertTitle>
                    <AlertDescription>
                      Accuracy: {location.accuracy ? Math.round(location.accuracy) : 0}m
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
                    
                    {/* User marker */}
                    <Marker position={[location.lat, location.long]} icon={userIcon}>
                      <Popup>
                        <div className="font-medium mb-1">Your Current Location</div>
                        <div className="text-gray-600">
                          Latitude: {location.lat.toFixed(6)}
                          <br />
                          Longitude: {location.long.toFixed(6)}
                        </div>
                      </Popup>
                    </Marker>

                    {/* Pickup marker */}
                    {pickupLocation && pickupLocation.lat !== null && pickupLocation.long !== null && (
                      <Marker 
                        position={[pickupLocation.lat, pickupLocation.long]}
                        icon={pickupIcon}
                      >
                        <Popup>
                          <div className="font-medium">Pickup Location</div>
                        </Popup>
                      </Marker>
                    )}

                    {/* Destination marker */}
                    {destinationLocation && destinationLocation.lat !== null && destinationLocation.long !== null && (
                      <Marker 
                        position={[destinationLocation.lat, destinationLocation.long]}
                        icon={destinationIcon}
                      >
                        <Popup>
                          <div className="font-medium">Destination</div>
                        </Popup>
                      </Marker>
                    )}

                    <AccuracyCircle 
                      position={[location.lat, location.long]}
                      accuracy={location.accuracy || 0}
                    />
                    
                    {/* Add routing when both locations are available */}
                    {pickupLocation?.lat && pickupLocation.long && destinationLocation?.lat && destinationLocation.long && (
                      <Routing 
                        pickupLocation={pickupLocation as { lat: number; long: number }}
                        destinationLocation={destinationLocation as { lat: number; long: number }}
                      />
                    )}

                    <RecenterMap 
                      userLocation={location}
                      pickupLocation={pickupLocation}
                      destinationLocation={destinationLocation}
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