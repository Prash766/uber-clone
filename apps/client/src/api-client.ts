import axiosClient from "./axiosClient"

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


export {
    loginUser,
    signUpUser,
    verifyUser
}