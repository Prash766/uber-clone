import { Button,  Input } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Circle,  MapPin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getListOfPlaces } from "../api-client";
import { useState, useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import PlaceSuggestDropdown from "./ui/PlaceSuggestDropDown/PlaceSuggestDropdown";
import { useDispatch } from "@repo/redux-store";
import { setDestinationList, setPickUpList } from "@repo/redux-store/ride";
import { useNavigate } from "react-router-dom";

// interface DestinationSuggestion {
//   name: string;
//   address: string;
// }

export default function RideRequestForm() {
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const dispatch = useDispatch();
  const [activeInput, setActiveInput] = useState<
    null | "pickup" | "destination"
  >(null);
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ["placesList"],
    mutationFn: async (query: string) => {
      if (!query) return [];
      if (activeInput) {
        if (activeInput === "pickup") {
          return getListOfPlaces(pickupLocation);
        } else {
          return getListOfPlaces(destinationLocation);
        }
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      if (activeInput) {
        if (activeInput === "pickup") {
          dispatch(setPickUpList(data));
        } else {
          dispatch(setDestinationList(data));
        }
      }
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = useCallback(
    debounce((value: string, field: "pickup" | "destination") => {
      mutate(value);
    }, 300),
    []
  );

  return (
    <div
      ref={formRef}
      className="max-w-md p-4 md:container mx-auto md:max-w-7xl w-full"
    >
      <h1 className="font-uber text-[33px] font-bold mb-8">Request a ride</h1>

      <div className="relative space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          <Input
            value={pickupLocation}
            onChange={(e) => {
              setPickupLocation(e.target.value);
              handleInputChange(e.target.value, "pickup");
            }}
            onFocus={() => setActiveInput("pickup")}
            className="font-uber h-14 pl-9 bg-muted/50 rounded-xl"
            placeholder="Enter Location"
          />
          {activeInput === "pickup" ? (
            <PlaceSuggestDropdown
            isOpen={()=>setActiveInput(null)}
              setPickupLocation={setPickupLocation}
              setDestinationLocation={setDestinationLocation}
              isPending={isPending}
              locationType="pickup"
            />
          ) : null}
        </div>
        <div className="relative">
          <Circle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          <Input
            value={destinationLocation}
            onChange={(e) => {
              setDestinationLocation(e.target.value);
              handleInputChange(e.target.value, "destination");
            }}
            onFocus={() => setActiveInput("destination")}
            className="font-uber h-14 pl-9 bg-muted/50 rounded-xl"
            placeholder="Enter destination"
          />
          {activeInput === "destination" ? (
            <PlaceSuggestDropdown
            isOpen = {()=> setActiveInput(null)}
              setPickupLocation={setPickupLocation}
              setDestinationLocation={setDestinationLocation}
              isPending={isPending}
              locationType="destination"
            />
          ) : null}
        </div>

        <div className="absolute left-5 top-5 h-14 w-0 border-l-2 border-black" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Select defaultValue="today">
            <SelectTrigger className="font-uber bg-muted/50 h-12">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today" className="font-uber">Today</SelectItem>
              <SelectItem value="tomorrow" className="font-uber">Tomorrow</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="now">
            <SelectTrigger className="font-uber bg-muted/50 h-12">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem className="font-uber" value="now">Now</SelectItem>
              <SelectItem  className= "font-uber" value="later">Schedule for later</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={()=>navigate('/ride-booking')} className="w-full font-uber  bg-black text-white hover:bg-black/90 h-12 text-base font-medium rounded-xl">
          See prices
        </Button>
      </div>
    </div>
  );
}
