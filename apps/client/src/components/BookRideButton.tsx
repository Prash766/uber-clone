import { Button } from "@repo/ui"
import { DollarSign, ChevronDown } from "lucide-react"

const BookRideButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="container max-w-[2400px] mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <span className="font-uber font-medium">Cash</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <Button className="bg-black hover:bg-black/90 text-white font-uber font-medium w-full max-w-[calc(100%-150px)] px-8 py-2 rounded-md">
            Request Moto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookRideButton