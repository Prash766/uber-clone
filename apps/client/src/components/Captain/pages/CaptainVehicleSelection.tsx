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
  import { vehicleOptions } from "../utils/helper";
  import VehicleOption, { VehicleOptionCardProps } from "../components/VehicleOption";
  
  const CaptainVehicleSelection = () => {
    return (
      <div className="font-uber h-screen mt-20 flex items-center justify-center">
        <Card className="w-[600px]">
          <CardHeader className="bg-black">
            <div className="font-uber text-white flex justify-between items-center">
              <h2>Uber</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"default"}>
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
            <h1 className="text-black font-bold text-3xl">
              Choose how you want to earn with Uber
            </h1>
          </CardDescription>
          <CardContent className="mt-4">
            {vehicleOptions.map((option : VehicleOptionCardProps, index) => (
              <VehicleOption
                key={index}
                title={option.title}
                description={option.description}
                imageSrc={option.imageSrc}
                tabs={option.tabs}
                activeTab={option.activeTab}
                onTabChange={option.onTabChange}
                selected={option.selected}
                onClick={option.onClick}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default CaptainVehicleSelection;
  