import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import RideBooking from "./pages/RideBooking";
import RideBookingRequest from "./pages/RideBookingRequest";
import Footer from "./components/Footer";
import CaptainSignUp from "./components/Captain/pages/CaptainSignUp";
import CaptainVehicleSelection from "./components/Captain/pages/CaptainVehicleSelection";
import CaptainVehicleRegistration from "./components/Captain/pages/CaptainVehicleRegistration";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { globalUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar isPending={isLoading}/>
      <Routes>
        <Route path="/" element={<>HI THERE</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* User Protected Routes */}
        <Route element={<ProtectedRoutes roles={["user"]} />}>
          <Route path="/ride-booking" element={<RideBooking />} />
          <Route path="/request-ride" element={<RideBookingRequest />} />
        </Route>

        {/* Captain Protected Routes */}
        <Route element={<ProtectedRoutes roles={["captain"]} />}>
          <Route path="/captain" element={<>HELLO THERE ITS CAPTAIN</>} />
          <Route path="/captain/home" element={<>HOME</>} />
          <Route
            path="/captain/vehicle"
            element={
              globalUser?.data?.onboarding === "pending" ? (
                <CaptainVehicleSelection />
              ) : (
                <Navigate to="/captain/home" replace />
              )
            }
          />
          <Route
            path="/captain/vehicle-registration"
            element={
              globalUser?.data?.onboarding === "pending" ? (
                <CaptainVehicleRegistration />
              ) : (
                <Navigate to="/captain/home" replace />
              )
            }
          />
        </Route>

        <Route path="captain/login" element={<Login />} />
        <Route path="captain/signup" element={<CaptainSignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
