
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, type PanInfo, useAnimation } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface BookingFormContainerProps {
  children: React.ReactNode
}

export default function BookingFormContainer({ children }: BookingFormContainerProps) {
  const controls = useAnimation()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [sheetHeight, setSheetHeight] = useState("50vh")
  const [isUp , setIsUp] =useState(false)

  const positions = {
    min: "calc(50vh)",
    max: "calc(85vh)",
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    const velocity = info.velocity.y
    const offset = info.offset.y

    if (velocity > 500 || offset > threshold) {
      setSheetHeight(positions.min)
      setIsUp(false)
    } else if (velocity < -500 || offset < -threshold) {
      setSheetHeight(positions.max)
      setIsUp(true)
    } 
  }

  useEffect(() => {
    controls.start({ height: sheetHeight, transition: { type: "spring", bounce: 0.2 } })
  }, [sheetHeight, controls])

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none md:hidden">
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-[2rem] overflow-hidden pointer-events-auto"
        initial={{ height: positions.min }}
        animate={controls}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <div className=" top-0 z-50 bg-white dark:bg-gray-900 pt-3 pb-4">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
{
    isUp? (<>
                <ChevronDown className="h-4 w-4" />
                <span>Swipe down for fewer details</span>
    </>) : (
        <>
        
        <ChevronUp className="h-4 w-4"/>
        <span>Swipe Up for More details</span>

        </>
    

)
}
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-auto px-4 pb-8">{children}</div>
      </motion.div>
    </div>
  )
}

