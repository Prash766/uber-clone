import { motion } from "framer-motion";

const DropDownOptions = [
  { text: "Ride", path: "/ride" },
  { text: "Drive", path: "/drive" },
  { text: "Business", path: "/business" },
  { text: "About", path: "/about" },
  { text: "Help", path: "/help" },
];

const MenuDropDownModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      exit={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-full left-0 right-0 z-1 bg-white shadow-lg h-screen w-full overflow-hidden"
    >
      {DropDownOptions.map((option, index) => (
        <motion.div
          key={index}
          className="text-2xl font-bold text-black py-3 px-6 hover:bg-gray-200 cursor-pointer"
        >
          {option.text}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuDropDownModal;
