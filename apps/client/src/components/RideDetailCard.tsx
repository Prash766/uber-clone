import { Dot, User } from "lucide-react";
import {Vehicle} from '@repo/redux-store/ride'

const RideDetailCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <button className="grid grid-cols-8 items-start mb-2 h-[124px] w-full text-left p-4 rounded-lg border hover:bg-gray-100 transition focus:border-black focus:border-2 focus:ring-2 focus:ring-gray-300">
      <div className="col-span-2 flex -mt-4 mr-4 items-start">
      <img className="h-[124px]" src={vehicle.productImageUrl} alt={vehicle.displayName} />
      </div>
      <div className="flex flex-col items-start justify-center mt-2 col-span-4">
        <div className="flex space-x-2">
          <span className="font-uber font-bold text-2xl">{vehicle.displayName}</span>
          <div className="flex space-x-2">
            <div className="flex mt-1 items-center gap-1">
              <User fill="black" size={16} />
              <span className="font-uber text-sm">{vehicle.capacity}</span>
            </div>
          </div>
        </div>
        <p className="font-uber flex items-center">
          <span className="font-uber">5 mins away</span> <Dot /> <span className="font-uber">12.07 am</span>
        </p>
        <p className="font-uber">{vehicle.description}</p>
      </div>
      <div className="font-uber flex mt-7 items-center justify-center col-span-2">
        <span className="font-bold text-2xl">{vehicle.fare}</span>
      </div>
    </button>
  );
};
export default RideDetailCard;
