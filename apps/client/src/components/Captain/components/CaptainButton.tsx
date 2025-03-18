import { useDispatch, useSelector } from "@repo/redux-store"
import {  toggleCaptainActive } from "@repo/redux-store/socket"
import { RootState } from "@repo/redux-store/store"
import { Label, Switch } from "@repo/ui"
import {  useEffect } from "react"

const CaptainButton = () => {
const {isCaptainActive} = useSelector((state:RootState)=> state.socketReducer) 
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("is captian active" , isCaptainActive)

    }, [isCaptainActive])
    
  return (
    <div className="font-uber flex gap-4 items-center ">
        <Label htmlFor="status">{isCaptainActive ?"Online" : "Offline"}</Label>
        <Switch
        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500" 
        checked={isCaptainActive}
        onCheckedChange={(e)=>{
            dispatch(toggleCaptainActive(e))
        }}
         />

    </div>
  )
}
  
export default CaptainButton