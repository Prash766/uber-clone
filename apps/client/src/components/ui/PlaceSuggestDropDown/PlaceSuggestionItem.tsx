"use client"

import { Utensils } from "lucide-react"
import { motion } from "framer-motion"

const PlaceSuggestionItem = () => {
  return (
    <motion.div
      whileHover={{ backgroundColor: "#f3f4f6" }}
      className="w-full flex items-center gap-3 px-4 py-4 border-b-2 border-gray-100 cursor-pointer transition-colors duration-200"
    >
      <div className="flex-shrink-0">
        <Utensils className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="font-semibold text-sm text-gray-800 truncate">Rajesh Verma Ji Park, Chhota Cp</div>
        <p className="text-xs text-gray-500 truncate">
          Rajesh Verma Ji Park, Chhota Cp, Bali Nagar, West Delhi, Delhi, 110027, India
        </p>
      </div>
    </motion.div>
  )
}

export default PlaceSuggestionItem

