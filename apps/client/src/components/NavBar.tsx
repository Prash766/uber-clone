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
import { ChevronDown, Menu, X } from "lucide-react";
import MenuDropDownModal from "../utils/Modals/MenuDropDownModal";
import { Button } from "@repo/ui";
import { useState } from "react";
import UserProfileModal from "../utils/Modals/UserProfileModal";
import CaptainButton from "./Captain/components/CaptainButton";

const loginOptions = [
  { text: "Sign in to drive & deliver", path: "/captain/login" },
  { text: "Sign in to ride", path: "/login" },
];

const signUpOptions = [
  { text: "Create Account to drive & deliver", path: "/captain/signup" },
  { text: "Create an Account to Ride", path: "/signup" },
];

const NavBar = ({ isPending }: { isPending: boolean }) => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector(
    (state: RootState) => state.authModalReducer
  );
  const { isMenuModalOpen } = useSelector(
    (state: RootState) => state.dropdownMenuModalReducer
  );
  const { globalUser } = useSelector(
    (state: RootState) => state.globalUserAuthSlice
  );

  const [openUserProfileModal, setOpenUserProfileModal] =
    useState<boolean>(false);

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
    <div className="relative w-full z-10">
      {/* Navbar */}
      <div className="w-full bg-black text-white p-6 flex justify-between items-center">
        <div className="flex items-center space-x-9 ml-10">
          <div className="font-uber text-4xl font-bold cursor-pointer">
            Uber
          </div>
          <ul className=" hidden md:flex space-x-7 cursor-pointer">
            <li className="font-uber">About</li>
            <li className="font-uber">Services</li>
          </ul>
        </div>
        {globalUser.isAuthenticated ? (
          isPending ? (
            <div className="w-10 animate-pulse bg-slate-200" />
          ) : globalUser.role === "user" ? (
            <Button
              onClick={() => setOpenUserProfileModal(!openUserProfileModal)}
              variant={"default"}
              className="relative flex cursor-pointer font-uber py-6 text-xl  text-white rounded-xl user-profile-modal-button"
            >
              {globalUser?.data?.firstName}
              <AnimatePresence>
                {openUserProfileModal && (
                  <UserProfileModal
                    openUserProfileModal={openUserProfileModal}
                    setOpenUserProfileModal={(isOpen: boolean) =>
                      setOpenUserProfileModal(isOpen)
                    }
                  />
                )}
              </AnimatePresence>
              <ChevronDown size={10} />
            </Button>
          ) : (
            <CaptainButton/>
          )
        ) : (
          <ul className="text-white font-semi-bold flex space-x-8 mr-10 cursor-pointer">
            <li className="font-uber" onClick={handleSignInClick}>
              Sign In
            </li>
            <li className="font-uber" onClick={handleSignUpClick}>
              Sign Up
            </li>
            <li onClick={isMenuModalClicked} className="font-uber md:hidden">
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
        )}
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
        {isMenuModalOpen && <MenuDropDownModal />}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
