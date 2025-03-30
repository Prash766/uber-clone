import { createSlice } from "@reduxjs/toolkit";
import {Socket} from 'socket.io-client'

export interface SocketSliceInterface{
    socket :Socket| null
}


const socketSlice = createSlice({
    name:"socketSlice",
    initialState :{
        socket : null,
        isSocketConnected : false,
        nearByVehicles : [],
        isCaptainActive  : false

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
        },
        getNearByVehicles : (state , action)=>{
            state.nearByVehicles = action.payload
        },
        sendCaptainActiveSocketEvent : (_, action)=>{
            return 
        },
        socketUpdateCaptainLocation :(_, action)=>{
            return

        },
        

        toggleCaptainActive : (state , action)=>{
            state.isCaptainActive = action.payload
        }

    }
})



export const {
    initSocket,
    connectionEstablished , 
    connectionLost , 
    getNearByVehicles, 
    sendCaptainActiveSocketEvent , 
    toggleCaptainActive,
    socketUpdateCaptainLocation
    } = socketSlice.actions
export const socketReducer =socketSlice.reducer