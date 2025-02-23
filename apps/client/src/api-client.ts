import axiosClient from "./axiosClient"
import { parsePlaces } from "./utils/helpers"

const loginUser = async(payload : {email: string , password : string})=>{
    const res = await axiosClient.post("/user/login", payload)
return res.data.user
}

const signUpUser = async(payload : {email: string , password : string})=>{
    console.log("inside the signupUsers")
    const res = await axiosClient.post("/user/signup", payload)
    return res.data.user
}

const verifyUser = async()=>{
    const res = await axiosClient.get("/user/verify-user")
    console.log("res ",res)
    return res
}

const getListOfPlaces = async(queryPlace:string)=>{
    const res = await axiosClient.post("/location/locationSearch",{
        queryPlace
    })
    console.log("RES",parsePlaces(res.data.data))
    return parsePlaces(res.data.data)
}


const getRideRoute = async(pickup:{latitude : number , longitude: number} , destination :{latitude : number , longitude: number})=>{
    const res = await axiosClient.post("/ride/navigation/route", {
        pickup,
        destination
    })
    console.log("res for the rotue", res.data)
    return res.data
}

export const getRidePrices  = async(params  : {locations:{
    pickup:{latitude : number , longitude: number} ,
    destination :{latitude : number , longitude: number}}
})=>{
    console.log("LOCATIONS",params)
    const res = await axiosClient.post('/ride/navigation/price', params)
    return res.data.response
}

export {
    loginUser,
    signUpUser,
    verifyUser,
    getListOfPlaces,
    getRideRoute
}