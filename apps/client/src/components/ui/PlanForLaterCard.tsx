import { Input, Button } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Calendar, Clock } from "lucide-react";

const PlanForLaterCard = () => {
  return (
    <>
      <div className="w-full lg:max-w-7xl rounded-2xl -ml-4 overflow-hidden relative bg-[rgb(157,205,214)]">
        <div className="p-8 lg:p-12 relative z-10">
          <div className="mt-8 space-y-6 max-w-md">
            <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
              Get your ride right
              <br />
              with Uber Reserve
            </h3>

            <div className="space-y-2">
              <p className="text-lg font-medium">Choose date and time</p>
              <div className="flex  gap-2 ">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
                  <Input
                    type="text"
                    placeholder="Date"
                    className="pl-10 w-[140px] h-10 bg-white/90 border-0"
                  />
                </div>
                <Select>
                  <SelectTrigger className="h-10 w-[150px] bg-white/90 border-0">
                    <Clock className="mr-2 h-5 w-5 text-black" />
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-2/3 h-10 bg-black text-white hover:bg-black/90">
              Next
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 -right-3 w-[35%] h-[90%] z-0">
          <img
            src="https://www.uber-assets.com/image/upload/v1709643470/assets/51/52cc71-a5b0-4fbd-aeb8-bee896efcd48/original/image-9.png"
            alt="Calendar and watch illustration"
            className="object-contain object-bottom-right"
          />
        </div>
      </div>
    </>
  );
};

export default PlanForLaterCard;
