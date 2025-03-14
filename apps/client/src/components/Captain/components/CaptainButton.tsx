import { Label, Switch } from "@repo/ui"
import { useState } from "react"

const CaptainButton = () => {
    const [isOnline  , setIsOnline] = useState<boolean>(false)
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