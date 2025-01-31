import { NavBar } from "@repo/ui";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;