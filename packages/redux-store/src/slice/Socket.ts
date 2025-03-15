import { createSlice } from "@reduxjs/toolkit";
import {Socket} from 'socket.io-client'

export interface SocketSliceInterface{
    socket :Socket| null
}


const socketSlice = createSlice({
    name:"socketSlice",
    initialState :{
        socket : null,
        isSocketConnected : false

    },
    reducers:{
        initSocket :(state, action)=>{
            console.log(action.payload)
            state.socket = action.payload
            console.log("socket in the socket slice ",state.socket)
        },
        connectionEstablished: (state)=>{
            state.isSocketConnected = true
        },
        connectionLost  : (state)=>{
            console.log("connection lost")
            state.isSocketConnected= false
        }

    }
})



export const {initSocket,connectionEstablished , connectionLost} = socketSlice.actions
export const socketReducer =socketSlice.reducer