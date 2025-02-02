import {createSlice} from '@reduxjs/toolkit'
import { User as PrismaUser } from '@prisma/client'
export interface User{

}

const userAuthSlice = createSlice({

    name:"userAuthSlice",
    initialState:{
        user:{},
        isAuthenticated : false
    },
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