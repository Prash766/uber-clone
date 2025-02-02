import { ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AuthOption {
  text: string;
  path: string
}

interface AuthModalProps {
  authOptions: AuthOption[];
  onClose: () => void;
}

const AuthModal = ({ authOptions, onClose }: AuthModalProps) => {
  const navigate = useNavigate();

  function handleClickNavigation(path : string) {
    navigate(path)
    onClose()

  }
  return (
    <motion.div
      className="absolute z-2  top-full left-0 w-full h-[calc(100vh-80px)] bg-white shadow-lg p-10 z-50 overflow-y-auto"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="absolute top-6 right-8 cursor-pointer" onClick={onClose}>
        <X
          size={32}
          className="hover:scale-110 transition-transform duration-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-48 w-full max-w-5xl mx-auto mt-12">
        {authOptions.map((option, index) => (
          <motion.div
            key={index}
            className="cursor-pointer group py-8"
            whileHover={{ scale: 1.05 }}
            onClick={()=>handleClickNavigation(option.path)}

          >
            <div className="flex justify-between h-24 items-center">
              <span className="text-2xl font-bold">{option.text}</span>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight size={32} />
              </motion.div>
            </div>
            <div className="border-b-[3px] border-black mt-6 w-20 group-hover:w-full transition-all duration-300"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AuthModal;
