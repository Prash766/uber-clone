import { Palette, Utensils } from "lucide-react";
import { AcceleratedAnimation, motion } from "framer-motion";
import { PlacesType, setDestinationlocationDisplayName, setPickUplocationDisplayName } from "@repo/redux-store/ride";
import { useDispatch } from "@repo/redux-store";
import { setPickupLocation, setDestinationLocation } from "@repo/redux-store/ride";

const PlaceSuggestionItem = ({ 
  place, 
  locationType ,
  setDestinationPlace,
  setPickupPlace,
  isOpen
}: { 
    isOpen: ()=> void,
  place: PlacesType;
  locationType: "pickup" | "destination";
  setDestinationPlace  : (destination : string)=> void,
  setPickupPlace : (pickup: string )=> void
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // const position = {
    //   lat: Number(place.lat),
    //   lon: Number(place.lon)
    // };
    if (locationType === "pickup") {
        setPickupPlace(place.display_name)
        dispatch(setPickUplocationDisplayName(place.display_name))
        dispatch(setPickupLocation(place));
        isOpen()
    } else {
      dispatch(setDestinationLocation(place));
      dispatch(setDestinationlocationDisplayName(place.display_name))
      setDestinationPlace(place.display_name)
      isOpen()
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ backgroundColor: "#f3f4f6" }}
      className="w-full flex items-center gap-3 px-4 py-4 border-b-2 border-gray-100 cursor-pointer transition-colors duration-200"
    >
      <div className="flex-shrink-0">
        <Utensils className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="font-uber font-semibold text-sm text-gray-800 truncate">{place.display_name}</div>
        <p className="font-uber text-xs text-gray-500 truncate">{place.name}</p>
      </div>
    </motion.div>
  );
};

export default PlaceSuggestionItem;