import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@repo/ui";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui";
import { useDispatch, useSelector } from "@repo/redux-store";
import { setUserLocation } from "@repo/redux-store/user_location";
import { RootState } from "@repo/redux-store/store";

const Skeleton = () => (
  <div className="space-y-4 w-full">
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse w-3/4"></div>
    <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse w-full"></div>
  </div>
);

const RecenterMap = ({ location }: { location: { lat: number; long: number } }) => {
  const map = useMap();

  useEffect(() => {
    if (location && location.lat && location.long) {
      map.setView([location.lat, location.long], 17);
    }
  }, [location, map]);

  return null;
};

const Map = () => {
  const { location } = useSelector((state: RootState) => state.userLocationReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState(true);

  useEffect(() => {
    let watchId: number | null = null;

    const startWatching = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by this browser.");
        return;
      }

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
                    dispatch(setUserLocation({ location: newLocation }));
          if (position.coords.accuracy < 100 && isWatching) {
            setIsWatching(false);
            if (watchId !== null) {
              navigator.geolocation.clearWatch(watchId);
            }
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
    };

    startWatching();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [dispatch, isWatching]);

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
                <span className="text-lg font-medium text-gray-700">Acquiring your location...</span>
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
                {(location.accuracy ?? 0) > 100 ? (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Improving Location Accuracy</AlertTitle>
                    <AlertDescription>
                      Current accuracy: {location.accuracy ? Math.round(location.accuracy) : 0}m. Acquiring better position...
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="default" className="mb-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Location Acquired</AlertTitle>
                    <AlertDescription>Accuracy: {location.accuracy ? Math.round(location.accuracy) : 0}m</AlertDescription>
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
                    zoom={19}
                    scrollWheelZoom={true}
                    style={{ height: "60vh", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.lat, location.long]}>
                      <Popup className="text-sm">
                        <div className="font-medium mb-1">Your Location</div>
                        <div className="text-gray-600">
                          Latitude: {location.lat.toFixed(6)}
                          <br />
                          Longitude: {location.long.toFixed(6)}
                          <br />
                          Accuracy: {location.accuracy ? Math.round(location.accuracy) : 0}m
                        </div>
                      </Popup>
                    </Marker>
                    <RecenterMap location={{ lat: location.lat, long: location.long }} />
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