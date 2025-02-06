import RideRequestBookingForm from "../components/RideRequestBookingForm"
import Suggestions from "../components/Suggestions"
import PlanForLaterCard from "../components/ui/PlanForLaterCard"

const RideBookingRequest = () => {
  return (
    <div className="container mx-auto max-w-6xl">
      <RideRequestBookingForm />
        <h2 className="text-4xl font-semibold mb-4 ml-4 mt-10">Plan for later</h2>
        <div className="md:flex md:container  md:justify-between space-y-6 md:space-y-0 md:space-x-6">
          <div className="md:w-full">
            <PlanForLaterCard />
          </div>
          <div className="md:w-1/2">
            <Suggestions />
          </div>
        </div>
      </div>
  )
}

export default RideBookingRequest

