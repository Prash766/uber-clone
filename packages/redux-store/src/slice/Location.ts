import {createSlice} from '@reduxjs/toolkit'

interface UserLocation {
    location: {
        lat: null | number,
        long: null | number,
        accuracy: null | number
    }
}

const userLocationSlice = createSlice({
    name: "userLocationSlice",
    initialState: {
        location: {
            lat: null,
            long: null,
            accuracy: null
        }
    } as UserLocation,
    reducers: {
        setUserLocation: (state, action) => {
            state.location = action.payload.location
        }
    }
});

export const { setUserLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;
