import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Captain = {
  id: number| null;
  email: string;
  fullName: string
  socketId: string
  vehicle: Vehicle
  status: 'active' | 'inactive';
  location: CaptainLocation
  onboarding: 'pending' | 'completed'|"";
  createdAt: string;
  trip: Trip[];
};

export type CaptainLocation = {
  captainId: number| null;
  latitude: number;
  longitude: number;
};


export type Vehicle = {
  id: number| null;
  color: string;
  vehicleType: 'Sedan' | 'SUV' | 'Mini' | 'Auto' | 'Bike'; 
  vehicleNumber: string;
};

export type Trip = {
  id: number| null;
  captainId: number;
  userId: number;
  status: 'Cancelled' | 'Completed' | 'Ongoing';
  distance: number;
  pickupPoint: string;
  destination: string;
  startTime: string | null;
  endTime: string | null;
  fare: number | null;
};

const initialState = {
  driverLicense: "",
  driverLicenseState: "",
  driverLicenseExpiry: "",
  vehicleType: "", 
  vehicleNumber:"",
  vehicleImage:""
};

const captainRegistration = createSlice({
  name: "captainRegistration",
  initialState,
  reducers: {

    setVehicleType: (state, action: PayloadAction<string>) => {
      state.vehicleType = action.payload;
    },

    setVehicleDetails : (state , action)=>{
      state = {...state, ...action.payload}
    },
    setVehicleImage : (state , action)=>{
      state.vehicleImage = action.payload
    }

    
 
  },
});

const captainDetails = createSlice({
  name:"captainDetails",
  initialState: <Captain>{
      id: null,
      email: "",
      fullName: "",
      socketId: "",
      vehicle: {
        id: null,
        color: "",
        vehicleType: "Sedan",
        vehicleNumber: "",
      },
      status: "inactive",
      location: {
        captainId: null,
        latitude: 0,
        longitude: 0,
      },
      onboarding: "",
      createdAt: "",
      trip: [],
    },
  reducers:{
    setEmailandId: (
      state,
      action: PayloadAction<{ email: string; id: number, fullName:string }>
    ) => {
      state.email = action.payload.email;
      state.id=action.payload.id
      state.fullName = action.payload.fullName
    },
    setCaptainRegistration: ( 
      state,
      action: PayloadAction<Captain>
    ) => {
      return { ...state, ...action.payload };
    },
  }
})

export const {  setVehicleType , setVehicleDetails , setVehicleImage } =
  captainRegistration.actions;
export const {setEmailandId , setCaptainRegistration} = captainDetails.actions
export const captainRegistrationReducer=   captainRegistration.reducer
export const captainDetailsReducer = captainDetails.reducer
