import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import RideBooking from "./pages/RideBooking";
import PrivateRoutes from "./utils/PrivateRoutes";
import RideBookingRequest from "./pages/RideBookingRequest";
import Footer from "./components/Footer";
import CaptainSignUp from "./components/Captain/pages/CaptainSignUp";
import CaptainVehicleSelection from "./components/Captain/pages/CaptainVehicleSelection";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<>HI THERE</>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoutes/>}>
        <Route path="/ride-booking" element={<RideBooking/>}/>
        <Route path="/request-ride" element={<RideBookingRequest/>}/>
        </Route>
        <Route path="/captain">
        <Route index element={<>HELLO THERE ITS CAPTAIN </>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<CaptainSignUp/>}/>
        <Route path="vehicle" element={<CaptainVehicleSelection/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
};

export default App;