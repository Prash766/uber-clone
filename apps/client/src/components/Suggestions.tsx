import { ChevronRight } from "lucide-react"

interface SuggestionItem {
  icon: string
  title: string
  description: string
}

const suggestions: SuggestionItem[] = [
  {
    icon: "https://cn-geo1.uber.com/static/mobile-content/launch-experience/ride.png",
    title: "Ride",
    description: "Go anywhere with Uber. Request a ride, hop in, and go.",
  },
  {
    icon: "https://cn-geo1.uber.com/static/mobile-content/uber_reserve/reserve_clock.png",
    title: "Reserve",
    description: "Reserve your ride in advance so you can relax on the day of your trip.",
  },
  {
    icon: "https://cn-geo1.uber.com/static/mobile-content/Courier.png",
    title: "Courier",
    description: "Uber makes same-day item delivery easier than ever.",
  },
]

export default function Suggestions() {
  return (
    <div className=" space-y-4 w-full mt-4">

      <div className="flex flex-col items-center justify-center space-y-2">
      <h2 className="text-xl font-semibold ml-10 md:-ml-60">Suggestions</h2>
        {suggestions.map((item, index) => (
          <button
            key={index}
            className="w-full max-w-[350px] bg-muted/50 hover:bg-muted/70 transition-colors p-4 rounded-xl flex items-center group"
          >
            <img src={item.icon || "/placeholder.svg"} alt="" className="w-10 h-10 object-contain" />
            <div className="flex-1 text-left ml-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  )
}
