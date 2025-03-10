import {createSlice} from '@reduxjs/toolkit'
import { User as PrismaUser } from '@prisma/client'

export interface User{
isAuthenticated : boolean,
user : PrismaUser
}


const userAuthSlice = createSlice({

    name:"userAuthSlice",
    initialState:{
        user:{

        } as PrismaUser,
        isAuthenticated : false
    } as User,
    reducers: {
        setUserInfo : (state , action)=>{
            state.user = action.payload
        },
        setIsUserAuthenticated : (state , action)=>{
            state.isAuthenticated = action.payload
        }
    }
}
)

export const {setUserInfo , setIsUserAuthenticated} = userAuthSlice.actions
export default  userAuthSlice.reducer