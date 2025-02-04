import { Button, Card, Input } from "@repo/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import { Circle, Clock, MapPin } from "lucide-react"

interface DestinationSuggestion {
  name: string
  address: string
}

const suggestions: DestinationSuggestion[] = [
  {
    name: "MANVI tour and travels",
    address: "Ha-46, Block-A, Sector 104, Noida, Uttar Pradesh",
  },
  {
    name: "Nizamuddin Railway Station",
    address: "Nizamuddin East, New Delhi, Delhi",
  },
]

export default function RideRequestForm() {
  return (
    <div className="w-full max-w-md p-4">
      <h1 className="text-3xl font-uberFont font-semibold mb-8">Request a ride</h1>

      <div className="relative space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black " />
          <Input className="h-14 pl-9 bg-muted/50 rounded-xl" placeholder="Enter location" />
        </div>


        <div className="relative">
          <Circle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black " />
          <Input className="h-14 pl-9 bg-muted/50 rounded-xl" placeholder="Enter destination" />
        </div>

        <div className="absolute left-5 top-5 h-14 w-0 border-l-2  border-black " />
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

        <div className="pt-10 ">
          <h2 className="text-sm font-medium mb-3">Destination suggestions</h2>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200">
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

        <Button className="w-full mt-6 bg-black text-white hover:bg-black/90 h-12 text-base font-medium rounded-xl">
          See prices
        </Button>
      </div>
    </div>
  )
}

