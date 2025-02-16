import { Dot, User } from "lucide-react";

const RideDetailCard = () => {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-2">
        <img src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png" />
      </div>
      <div className="flex flex-col items-start justify-center col-span-4">
        <div className="flex space-x-2">
            <span className="font-bold text-xl">Uber Go</span>
            <div className="flex space-x-2">
                <div className="flex items-center gap-1">
                <span>
                <User size={18} />
                </span>
                <span>4</span>
                </div>
            </div>
            </div>
            <p className="flex">
            5 mins away
            <span>
                <Dot />
            </span>
            12.07 am
            </p>
           <p>
            Affordable Compact Rides
           </p>
      </div>
      <div className="flex items-center justify-center">
        <span className="font-bold text-2xl">₹669</span>
      </div>
    </div>
  );
};

export default RideDetailCard;
