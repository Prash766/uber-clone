import type React from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface MapSkeletonProps {
  error: string | null
}

const MapSkeleton: React.FC<MapSkeletonProps> = ({ error }) => {
  return (
    <div className="relative w-full rounded-lg h-[calc(100vh-100px)] overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
      {error && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-md shadow-xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Error Loading Map</h3>
            </div>
            <p className="text-gray-600">{error}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default MapSkeleton

