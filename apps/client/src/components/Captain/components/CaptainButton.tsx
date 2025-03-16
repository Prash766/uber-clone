import { useDispatch, useSelector } from "@repo/redux-store"
import { setCaptainActive } from "@repo/redux-store/socket"
import { RootState } from "@repo/redux-store/store"
import { Label, Switch } from "@repo/ui"
import {  useEffect, useState } from "react"
import { CaptainActive } from "../../../utils/socket-schemas/schema"

const CaptainButton = () => {
    const [isOnline  , setIsOnline] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {globalUser} = useSelector((state:RootState)=> state.globalUserAuthSlice)

    useEffect(()=>{
        console.log("use efect runs")
        if(isOnline){
            const payload={
               socketPayload :{ 
                captainId:globalUser.data.id,
                captain:globalUser.data,
                location:{
                    lat : 23.5353,     //HARDCODED VALUES
                    lon :24.56565
                }
               } as CaptainActive,
               isCaptainActive : true

            } 
            dispatch(setCaptainActive(payload))
        }
    }, [isOnline])
    
  return (
    <div className="font-uber flex gap-4 items-center ">
        <Label htmlFor="status">{isOnline ?"Online" : "Offline"}</Label>
        <Switch
        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500" 
        checked={isOnline}
        onCheckedChange={(e)=>{
            setIsOnline(e)
        }}
         />

    </div>
  )
}
  
export default CaptainButton