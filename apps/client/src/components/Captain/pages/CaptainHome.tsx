import { useDispatch, useSelector } from "@repo/redux-store"
import { sendCaptainActiveSocketEvent, socketUpdateCaptainLocation } from "@repo/redux-store/socket"
import { RootState } from "@repo/redux-store/store"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import {CaptainActive, Socket_Captain_Type} from '@repo/redux-store/socket_schema'

const CaptainHome = () => {
  const dispatch = useDispatch()
  const {globalUser} = useSelector((state:RootState)=> state.globalUserAuthSlice)
  const {isCaptainActive} = useSelector((state:RootState)=> state.socketReducer)
  const watchIdRef = useRef<number | null>()
  useEffect(() => {
    console.log("hi there")
    if (isCaptainActive) {
      console.log("global user",globalUser)
      const data = {
        captainId: globalUser.data.captain.id,
        data: {
          captain: { ...globalUser.data.captain as Socket_Captain_Type },
          vehicle: { ...globalUser.data.vehicleData }
        },
        location: {}
      } as CaptainActive;
      dispatch(sendCaptainActiveSocketEvent(data));
    }
  }, [isCaptainActive, globalUser.data.captain, globalUser.data.vehicleData]);
  
  useEffect(() => {
    if (isCaptainActive) {
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (location) => {
            console.log("location",location)
            const locationData = {
              captainId: globalUser.data.captain.id,
              location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }
            };
            dispatch(socketUpdateCaptainLocation(locationData));
          },
          (error) => {
            // ... existing code ...
          }
        );
      }, 5000); // Update every 5 seconds or use watch position and update  the location every second
      return () => clearInterval(intervalId);
    }
  }, [isCaptainActive, globalUser.data.captain.id]);
  return (
    <div>
        CaptainHome

    </div>
  )
}

export default CaptainHome