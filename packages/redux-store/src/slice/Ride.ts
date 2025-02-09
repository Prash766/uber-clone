import { createSlice } from "@reduxjs/toolkit";

interface PlacesType {
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

export const { setPickUpList, setDestinationList } = placesListSlice.actions;
export const placeListReducer  = placesListSlice.reducer;
