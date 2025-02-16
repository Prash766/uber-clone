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


export {
    loginUser,
    signUpUser,
    verifyUser,
    getListOfPlaces
}