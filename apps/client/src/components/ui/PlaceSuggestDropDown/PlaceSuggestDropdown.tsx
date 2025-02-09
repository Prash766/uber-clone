import PlaceSuggestionItem from "./PlaceSuggestionItem"

import { motion } from "framer-motion"

const PlaceSuggestDropdown = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className='z-20 bg-white absolute  top-full left-0 right-0 mt-1 rounded-lg shadow-lg overflow-y-auto max-h-[360px]'
    >
      <div className='py-2'>
        <PlaceSuggestionItem />
        <PlaceSuggestionItem />
        <PlaceSuggestionItem />
        <PlaceSuggestionItem />
        <PlaceSuggestionItem />
        <PlaceSuggestionItem />
      </div>
    </motion.div>
  )
}

export default PlaceSuggestDropdown
