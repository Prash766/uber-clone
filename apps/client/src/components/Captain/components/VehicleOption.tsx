import { useSelector } from "@repo/redux-store"
import { RootState } from "@repo/redux-store/store"
import { Badge } from "@repo/ui"
import { LucideIcon } from "lucide-react"
import { useEffect } from "react"

export type TabType = {
  id: string
  label: string
  icon?: LucideIcon
}

export type VehicleOptionCardProps = {
  id:string
  title: string
  description: string
  imageSrc: string
  mapImgSrc:string
  tabs: TabType[]
  onClick: (id: string , img:string) => void
}

const VehicleOption = ({
  id,
  title,
  description,
  imageSrc,
  mapImgSrc,
  tabs = [],
  onClick,
}: VehicleOptionCardProps) => {
  const {vehicleType} = useSelector((state:RootState)=>state.captainRegistrationReducer)
useEffect(()=>{
console.log("vehicle type",vehicleType)
},[vehicleType])
  return (
    <div 
      className={`p-4 mt-4 rounded-lg border ${vehicleType===id ? 'border-2 border-black' : 'border-gray-200'} hover:bg-gray-100  cursor-pointer`}
      onClick={()=>onClick(id, mapImgSrc)}
    >
      <div className="flex  flex-row items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Badge key={tab.id} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                {tab.icon && <tab.icon size={16} />}
                <span className="text-sm">{tab.label}</span>
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Vehicle:</span> {description}
          </p>
        </div>
        <div className="ml-4">
          <div className="relative h-full w-32">
            <img
              src={imageSrc}
              alt={title}
              className="h-full w-full"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleOption;