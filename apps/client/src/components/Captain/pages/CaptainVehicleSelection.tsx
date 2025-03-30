import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@repo/ui";
  import { ChevronDown, CircleHelpIcon } from "lucide-react";
  import { vehicleOptions, VehicleOptionType } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { setVehicleImage, setVehicleType } from "@repo/redux-store/captain";
import { useDispatch } from "@repo/redux-store";
import VehicleOption from "../components/VehicleOption";
  const CaptainVehicleSelection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    function handleClick(id : string, img:string  ){
      console.log("option", id)
      dispatch(setVehicleType(id))
      dispatch(setVehicleImage(img))
    }

    return (
      <div className="font-uber mt-6 flex items-center justify-center">
        <Card className="w-[500px] h-[600px] flex flex-col">
          <CardHeader className="bg-black">
            <div className="text-white text-lg flex justify-between items-center">
              <p>Uber</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white text-black hover:" variant={"ghost"}>
                    Help
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[150px]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <CircleHelpIcon className="text-white" fill="black" /> Trips
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CircleHelpIcon className="text-white" fill="black" /> Guides
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CircleHelpIcon className="text-white" fill="black" /> Privacy
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CircleHelpIcon className="text-white" fill="black" /> Earnings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardDescription className="mt-4 flex justify-center">
            <h1 className="text-black font-bold text-2xl">
              Choose how you want to earn with Uber
            </h1>
          </CardDescription>
          <CardContent className="flex-grow overflow-y-auto">
            {vehicleOptions.map((option : VehicleOptionType, index) => (
              <div key={index} className="mb-4">
                <VehicleOption
                id={option.id}
                  title={option.title}
                  description={option.description}
                  imageSrc={option.imageSrc}
                  mapImgSrc={option.mapImgSrc}
                  tabs={option.tabs}
                  onClick={(id: string, img:string)=>handleClick(id, img)}
                />
              </div>
            ))}
          </CardContent>
          <div className="w-full  py-4 flex items-center justify-center rounded-lg shadow-xl border-t-0 bg-gray-100  ">
            <Button onClick={()=> navigate('/captain/vehicle-registration')} className="w-2/3  p-2">Continue</Button>
          </div>
        </Card>
      </div>
    );
  };
  
  export default CaptainVehicleSelection;