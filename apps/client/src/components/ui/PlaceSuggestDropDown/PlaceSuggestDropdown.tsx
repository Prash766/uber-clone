import { useSelector } from "@repo/redux-store"
import PlaceSuggestionItem from "./PlaceSuggestionItem"
import { motion } from "framer-motion"
import { RootState } from "@repo/redux-store/store"
import { useEffect, useState } from "react"

const PlaceSuggestDropdown = ({ locationType, isPending }: { locationType: "pickup" | "destination"; isPending: boolean }) => {
  const { pickUpPlacesList, destinationPlacesList } = useSelector((state: RootState) => state.placeListReducer)
  const [places, setPlaces] = useState<typeof pickUpPlacesList | typeof destinationPlacesList>([])

  useEffect(() => {
    if (!isPending) {
      setPlaces(locationType === "pickup" ? pickUpPlacesList : destinationPlacesList)
    }
  }, [isPending, pickUpPlacesList, destinationPlacesList, locationType])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="z-20 bg-white absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg overflow-y-auto max-h-[360px]"
    >
      <div className="py-2">
        {isPending ? (
          <p className="text-center py-2">Loading...</p>
        ) : places.length > 0 ? (
          places.map((item, index) => <PlaceSuggestionItem key={index} place={item} locationType={locationType} />)
        ) : (
          <p className="text-center py-2">No results found</p>
        )}
      </div>
    </motion.div>
  )
}

export default PlaceSuggestDropdown
