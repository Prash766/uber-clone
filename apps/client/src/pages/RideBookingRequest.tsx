import RideRequestBookingForm from "../components/RideRequestBookingForm";
import Suggestions from "../components/Suggestions";
import PlanForLaterCard from "../components/ui/PlanForLaterCard";

const RideBookingRequest = () => {
  return (
    <div>
      <RideRequestBookingForm />
      <div className="ml-56 pt-6"> 
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Plan for later
        </h2>
      </div>
      <div className="md:flex md:container md:mx-auto  max-w-full md:justify-between mt-6 p-24"> 
        <PlanForLaterCard />
        <div className="w-1/2">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};  

export default RideBookingRequest;
