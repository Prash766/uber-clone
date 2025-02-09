import { Button, Card, Input } from "@repo/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import { Circle, Clock, MapPin } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { getListOfPlaces } from "../api-client"
import { useState, useCallback } from "react"
import { debounce } from "lodash"
import PlaceSuggestDropdown from "./ui/PlaceSuggestDropDown/PlaceSuggestDropdown"

interface DestinationSuggestion {
  name: string
  address: string
}

export default function RideRequestForm() {
  const [pickupLocation, setPickupLocation] = useState<string>("")
  const [destinationLocation, setDestinationLocation] = useState<string>("")
  const [suggestions, setSuggestions] = useState<DestinationSuggestion[]>([])
  const [activeField, setActiveField] = useState<"pickup" | "destination" | null>(null)
  const [activeInput,setActiveInput] = useState<null | "pickup" | "destination">(null) 

  const { mutate } = useMutation({
    mutationKey: ["placesList"],
    mutationFn: async (query: string) => {
      if (!query) return []
      return getListOfPlaces(query)
    },
    onSuccess: (data) => {
      setSuggestions(data) 
    },
  })

  const handleInputChange = useCallback(
    debounce((value: string, field: "pickup" | "destination") => {
      setActiveField(field)
      mutate(value)
    }, 300), 
    []
  )

  return (
    <div className="max-w-md p-4 md:container mx-auto md:max-w-7xl w-full">
      <h1 className="text-[33px] font-bold mb-8">Request a ride</h1>

      <div className="relative space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          <Input
            value={pickupLocation}
            onChange={(e) => {
              setPickupLocation(e.target.value)
              handleInputChange(e.target.value, "pickup")
            }}
            onFocus={()=> setActiveInput("pickup")}
            className="h-14 pl-9 bg-muted/50 rounded-xl"
            placeholder="Enter location"
          />
          {
            activeInput==="pickup"? <PlaceSuggestDropdown/>: null
          }
        </div>
        <div className="relative">
          <Circle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          <Input
            value={destinationLocation}
            onChange={(e) => {
              setDestinationLocation(e.target.value)
              handleInputChange(e.target.value, "destination")
            }}
            onFocus={()=> setActiveInput("destination")}
            className="h-14 pl-9 bg-muted/50 rounded-xl"
            placeholder="Enter destination"
          />
           {
            activeInput==="destination"? <PlaceSuggestDropdown/>: null
          }
        </div>

        <div className="absolute left-5 top-5 h-14 w-0 border-l-2 border-black" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Select defaultValue="today">
            <SelectTrigger className="bg-muted/50 h-12">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="now">
            <SelectTrigger className="bg-muted/50 h-12">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="now">Now</SelectItem>
              <SelectItem value="later">Schedule for later</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {suggestions.length > 0 && (
          <div className="pt-10">
            <h2 className="text-sm font-medium mb-3">
              {activeField === "pickup" ? "Pickup Suggestions" : "Destination Suggestions"}
            </h2>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                  onClick={() => {
                    if (activeField === "pickup") {
                      setPickupLocation(suggestion.name)
                    } else {
                      setDestinationLocation(suggestion.name)
                    }
                    setSuggestions([]) // Clear suggestions on selection
                  }}
                >
                  <div className="flex gap-4">
                    <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium leading-snug">{suggestion.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{suggestion.address}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Button className="w-full bg-black text-white hover:bg-black/90 h-12 text-base font-medium rounded-xl">
          See prices
        </Button>
      </div>
    </div>
  )
}
