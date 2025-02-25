import { useSelector } from "@repo/redux-store";
import { RootState } from "@repo/redux-store/store";
import { motion } from "framer-motion";
import { Button } from "@repo/ui";
import { Activity, ChevronRight, HelpCircle, Star, User, Wallet } from "lucide-react";
import {useEffect} from 'react'


const UserProfileModal = ({openUserProfileModal , setOpenUserProfileModal} : { openUserProfileModal : boolean , setOpenUserProfileModal : ()=> void }) => {
  const { user } = useSelector((state: RootState) => state.authUserReducer);
  
  // Navigation menu items with icons and routes
  const menuItems = [
    { icon: <User size={20} />, label: "Manage account", route: "/account" },
    { icon: <Activity size={20} />, label: "Ride", route: "/ride" },
    { icon: <ChevronRight size={20} />, label: "Drive & deliver", route: "/drive" },
    { icon: <ChevronRight size={20} />, label: "Uber Eats", route: "/eats" },
    { icon: <ChevronRight size={20} />, label: "Uber for Business", route: "/business" }
  ];

  // Function to handle sign out
  const handleSignOut = () => {
    // Logic for signing out would go here
    console.log("Signing out...");
    // Redirect to home page or login page after sign out
  };

  useEffect(() => {
    if (openUserProfileModal) {
      document.addEventListener("mousedown",()=> setOpenUserProfileModal());
    }

    return () => {
      document.removeEventListener("mousedown", ()=> setOpenUserProfileModal());
    };
  }, [openUserProfileModal]);


  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="font-uber  absolute right-0 top-16 bg-white rounded-lg shadow-lg w-96 text-black z-50"
    >
      {/* Header section with user info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-semibold text-xl">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-black fill-black" />
              <span className="text-sm font-medium">4.74</span>
            </div>
          </div>
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={24} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg">
          <HelpCircle size={24} />
          <span className="text-sm mt-1">Help</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg">
          <Wallet size={24} />
          <span className="text-sm mt-1">Wallet</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg">
          <Activity size={24} />
          <span className="text-sm mt-1">Activity</span>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center py-3 px-4 hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-8">{item.icon}</div>
            <span className="flex-grow">{item.label}</span>
            {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
          </div>
        ))}
      </div>

      {/* Sign out button */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          className="w-full text-red-500 border-gray-200 py-3 font-normal"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    </motion.div>
  );
};

export default UserProfileModal;