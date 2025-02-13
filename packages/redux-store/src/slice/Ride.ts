import { createSlice } from "@reduxjs/toolkit";

export interface PlacesType {
  place_id: number;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

export interface Location {
    lat : number | null,
    long : number | null
}

export interface RideLocation {
    pickupLocation: Location,
    destinationLocation: Location,

}

interface PlacesList {
  pickUpPlacesList: PlacesType[];
  destinationPlacesList: PlacesType[];
}

const placesListSlice = createSlice({
  name: "PlacesList",
  initialState: {
    pickUpPlacesList: [],
    destinationPlacesList: [],
  } as PlacesList,
  reducers: {
    setPickUpList: (state, action) => {
      state.pickUpPlacesList = action.payload;
    },
    setDestinationList: (state, action) => {
      state.destinationPlacesList = action.payload;
    },
  },
});

const rideLocationSlice = createSlice({
    name: 'ride',
    initialState: {
      pickupLocation: {
        lat: null,
        long: null
      },
      destinationLocation: {
        lat: null,
        long: null
      },
    } as RideLocation,
    reducers: {
      setPickupLocation: (state, action) => {
        state.pickupLocation = action.payload;
      },
      setDestinationLocation: (state, action) => {
        state.destinationLocation = action.payload;
      },
    }
  });
  
export const { setPickUpList, setDestinationList } = placesListSlice.actions;
export const {setPickupLocation , setDestinationLocation} = rideLocationSlice.actions
export const placeListReducer  = placesListSlice.reducer;
export const rideLocationReducer= rideLocationSlice.reducer
