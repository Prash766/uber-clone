import axiosClient from "./axiosClient"

const loginUser = async(payload : {email: string , password : string})=>{
    const res = await axiosClient.post("/user/login", payload)
return res.data.user
}

const signUpUser = async(payload : {email: string , password : string})=>{
    const res = await axiosClient.post("/user/signup", payload)
    return res.data.user
}


export {
    loginUser,
    signUpUser
}