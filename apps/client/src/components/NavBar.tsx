import { useDispatch, useSelector } from "@repo/redux-store";
import {
  openModal,
  ModalType,
  closeModal,
  onClickModal,
} from "@repo/redux-store/modal";
import { RootState } from "@repo/redux-store/store";
import AuthModal from "./AuthModal";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MenuDropDownModal from "../utils/Modals/MenuDropDownModal";

const loginOptions = [
  { text: "Sign in to drive & deliver", path: "/captain-login" },
  { text: "Sign in to ride", path: "/login" },
];

const signUpOptions = [
  { text: "Create Account to drive & deliver", path: "/captain-signup" },
  { text: "Create an Account to Ride", path: "/signup" },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector(
    (state: RootState) => state.authModalReducer
  );
  const { isMenuModalOpen } = useSelector(
    (state: RootState) => state.dropdownMenuModalReducer
  );

  function handleSignInClick() {
    dispatch(openModal({ modalType: ModalType.login }));
  }

  function handleSignUpClick() {
    dispatch(openModal({ modalType: ModalType.signup }));
  }

  function onClose() {
    dispatch(closeModal());
  }

  function isMenuModalClicked() {
    dispatch(onClickModal());
  }

  return (
    <div className="relative w-full">
      {/* Navbar */}
      <div className="w-full bg-black text-white p-6 flex justify-between items-center">
        <div className="flex items-center space-x-9 ml-10">
          <div className="text-2xl font-bold cursor-pointer">Uber</div>
          <ul className=" hidden md:flex space-x-7 cursor-pointer">
            <li>About</li>
            <li>Services</li>
          </ul>
        </div>
        <ul className="text-white font-semi-bold flex space-x-8 mr-10 cursor-pointer">
          <li onClick={handleSignInClick}>Sign In</li>
          <li onClick={handleSignUpClick}>Sign Up</li>
          <li onClick={isMenuModalClicked} className=" md:hidden">
            <AnimatePresence>
              <motion.div
                key={isMenuModalOpen ? "menu" : "x"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ width: 24, height: 24, position: "absolute" }}
              >
                {isMenuModalOpen ? (
                  <X className="text-white" />
                ) : (
                  <Menu className="text-white" />
                )}
              </motion.div>
            </AnimatePresence>
          </li>
        </ul>
      </div>

      {/* Modal Below Navbar */}
      <AnimatePresence>
        {isOpen && (
          <AuthModal
            onClose={onClose}
            authOptions={
              modalType === ModalType.login ? loginOptions : signUpOptions
            }
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {
          isMenuModalOpen && 
          <MenuDropDownModal/>
        }

      </AnimatePresence>
    </div>
  );
};

export default NavBar;
