import { useDispatch, useSelector } from "@repo/redux-store"
import { sendCaptainActiveSocketEvent } from "@repo/redux-store/socket"
import { RootState } from "@repo/redux-store/store"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import {CaptainActive, Socket_Captain_Type} from '@repo/redux-store/socket_schema'

const CaptainHome = () => {
  const dispatch = useDispatch()
  const {globalUser} = useSelector((state:RootState)=> state.globalUserAuthSlice)
  const {isCaptainActive} = useSelector((state:RootState)=> state.socketReducer)
  const watchIdRef = useRef<number | null>()
  useEffect(()=>{
    if(isCaptainActive){

      watchIdRef.current = navigator.geolocation.watchPosition((location)=>{
        console.log("location", location)
        const data = {
          captainId : globalUser.data.captain.id,
          data:{ 
          captain : { 
            ...globalUser.data.captain as Socket_Captain_Type
          },
          vehicle : { 
            ...globalUser.data.vehicleData
          }
        },
        location :{
          lat: location.coords.latitude,
          lon :location.coords.longitude
        }
      } as CaptainActive
      dispatch(sendCaptainActiveSocketEvent(data))
      
      console.log("watch postion runned")
    } , (error)=>{
      console.log(error)
      toast.warning("Allow access to location!")
      
    })
  }
  },[isCaptainActive])
  return (
    <div>
        CaptainHome

    </div>
  )
}

export default CaptainHome