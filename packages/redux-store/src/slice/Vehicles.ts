import { createSlice } from "@reduxjs/toolkit";
import { CaptainActive } from "@repo/redux-store/socket_schema";
type Override<T, O extends { [F in keyof Partial<T>]: unknown }> = Omit<T, keyof O> & O;

type IModified = Override<CaptainActive, { 
  location: { 
    latitude: number;
    longitude: number;
  } 
}>;

export interface VehicleNearby {
  nearByVehicles: IModified[];
}


const VehicleSlice = createSlice({
  name: "vehicleSlice",
  initialState: {
    nearByVehicles: [],
  } as VehicleNearby,
  reducers: {
    setNearByVehicles: (state, action) => {
        console.log("get nearby ",action)
      state.nearByVehicles = action.payload;
    },
  },
});

export const { setNearByVehicles } = VehicleSlice.actions;

export default VehicleSlice.reducer;
