import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import RideBooking from "./pages/RideBooking";
import PrivateRoutes from "./utils/PrivateRoutes";

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
        <Route path="ride-booking" element={<RideBooking/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;