import axiosClient from "./axiosClient";
import { parsePlaces } from "./utils/helpers";

const loginUser = async (payload: { email: string; password: string }) => {
  const res = await axiosClient.post("/user/login", payload);
  return res.data;
};
const loginCaptain = async (payload: { email: string; password: string }) => {
  const res = await axiosClient.post("/captain/login", payload);
  return res.data.captain;
};

const signUpUser = async (payload: { email: string; password: string }) => {
  console.log("inside the signupUsers");
  const res = await axiosClient.post("/user/signup", payload);
  return res.data.captain;
};

const logOutUser = async () => {
  const res = await axiosClient.get("/user/logout");
  return res;
};

const verifyUser = async () => {
  const res = await axiosClient.get("/user/verify-user");
  console.log("res ", res);
  return res;
};

const authorizeUserCheck = async () => {
  try {
    const res = await axiosClient.get("/user/auth");
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getUserDetails = async () => {
  const res = await axiosClient.get("/user/me");
  return res.data;
};

const getListOfPlaces = async (queryPlace: string) => {
  const res = await axiosClient.post("/location/locationSearch", {
    queryPlace,
  });
  console.log("RES", parsePlaces(res.data.data));
  return parsePlaces(res.data.data);
};

const getRideRoute = async (
  pickup: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
) => {
  const res = await axiosClient.post("/ride/navigation/route", {
    pickup,
    destination,
  });
  console.log("res for the rotue", res.data);
  return res.data;
};

export const getRidePrices = async (params: {
  locations: {
    pickup: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
  };
}) => {
  console.log("LOCATIONS", params);
  const res = await axiosClient.post("/ride/navigation/price", params);
  return res.data.response;
};

////////CAPTAIN ROUTES FUNCTION
export const captainVehicleRegistration = async (data: {
  captainId: any;
  driverLicenseState: string;
  driverLicenseExpiry: string;
  vehicleNumber: string;
  vehicleType: string;
}) => {
  const res = await axiosClient.post("/captain/vehicle-registration", data);
  return res.data;
};

export const captainRegister = async (data: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const res = await axiosClient.post("/captain/signup", data);
  return res.data;
};

export {
  loginUser,
  loginCaptain,
  signUpUser,
  verifyUser,
  getListOfPlaces,
  getRideRoute,
  getUserDetails,
  logOutUser,
  authorizeUserCheck,
};
