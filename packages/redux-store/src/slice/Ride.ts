import { createSlice } from "@reduxjs/toolkit";

export interface PlacesType {
  place_id: number;
  osm_id: number;
  lat: number| null;
  lon: number | null;
  class: string;
  type: string;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

export interface Location {
    lat : number | null,
    lon : number | null
}

export interface Route{
  distance : number| null,
  eta:number| null,
  distanceString : string 
  data:{
    polyline:string
  },
  legs:[
    {
      distance: number| null,
      duration: number| null
    }
  ]

}

export interface RideLocation {
    pickupLocation: PlacesType,
    destinationLocation: PlacesType,
    route: Route

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
        place_id: 0,
        osm_id: 0,
        lat: null,
        lon: null,
        class: "",
        type: "",
        addresstype: "",
        name: "",
        display_name: "",
        boundingbox: [],

      },
      destinationLocation: {
        place_id: 0,
        osm_id: 0,
        lat: null,
        lon: null,
        class: "",
        type: "",
        addresstype: "",
        name: "",
        display_name: "",
        boundingbox: [],
      
      },
     route:{
      data:{
        polyline:""
      },
      distance:null,
      eta:null,
      distanceString:"",
      legs:[
        {
          distance:null,
          duration:null
        }
      ]
     }
    } as RideLocation,
    reducers: {
      setPickupLocation: (state, action) => {
        state.pickupLocation = action.payload;
      },
      setDestinationLocation: (state, action) => {
        state.destinationLocation = action.payload;
      },
      setRoutePolyline:(state , action)=>{
        state.route= action.payload
      }
    }
  });


  // const ridePrices = createSlice({
  //   initialState :{
  //     ridePricesList:[]
  //   }
  // })


// const rideBookingLocationEntrySlice =createSlice({
//   name:"rideBookingLocationEntrySlice",
//   initialState:{
//     pickupLocation : "",
//     destinationLocation :""
//   },
//   reducers:{
//     setPickUpLocation :(state, action)=>{
//       state.pickupLocation= action.payload
//     },
//     setDestinationLocation: (state , action)=>{
//       state.destinationLocation= action.payload
//     }
//   }
// })
  
export const { setPickUpList, setDestinationList } = placesListSlice.actions;
export const {setPickupLocation , setDestinationLocation , setRoutePolyline} = rideLocationSlice.actions
export const placeListReducer  = placesListSlice.reducer;
export const rideLocationReducer= rideLocationSlice.reducer
