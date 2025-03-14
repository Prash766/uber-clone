import { motion } from "framer-motion"
import Map from "../components/Map"
import RideRequestBookingForm from "../components/RideRequestBookingForm"
import Suggestions from "../components/Suggestions"
import PlanForLaterCard from "../components/ui/PlanForLaterCard"

const RideBookingRequest = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-uber container mx-auto max-w-7xl px-4 py-8"
    >
      <motion.div
        className="flex flex-col lg:flex-row gap-8 mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="lg:w-1/3">
          <RideRequestBookingForm />
        </div>
        <div className="lg:w-2/3">
          <Map />
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl font-semibold mb-8 ml-7"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Plan for later
      </motion.h2>

      <motion.div
        className="flex  flex-col md:flex-row gap-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="md:w-2/3 md:ml-10">
          <PlanForLaterCard />
        </div>
        <div className="md:w-1/2">
          <Suggestions />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RideBookingRequest