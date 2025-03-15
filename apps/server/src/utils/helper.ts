import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import asyncHandler from './asyncHandler'
import ApiError from './ApiError'
import { prisma } from '@repo/db'


function generateAuthToken(payload:{id: number , role:string } ) {
    const token = jwt.sign(payload , process.env.JWT_SECRET as string , {
    })
    return token
}

async function hashPassword (password : string){
    const hashedPassword = await bcrypt.hash(password , 10)
    return hashedPassword

}

async function  comparePassword(password:string , encryptedPassword:string) {
    const isMatched = await bcrypt.compare(password , encryptedPassword)
    return isMatched
    
}


const userAuthCheck= asyncHandler(async(req , res )=>{
    try {
        const token = req.cookies["auth-token"] ||   (req.headers["Authorization"] as string)?.split("=")[1];
        if (!token) throw new ApiError("Unauthorized", 400);
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        if(decodedToken.role==="user"){
            const userData = await prisma.user.findFirst({
                where:{
                    id  : decodedToken.id
                },
            })
            if (!userData) {
                throw new ApiError("User not found", 404);
            }
            const {
                password,
                ...user
            } = userData
            return res.status(200).json({
                success: true,
                role:"user",
                isAuthenticated:true,
                data: user
            })
            
        }
        if(decodedToken.role==="captain"){
            const captainData = await prisma.captain.findFirst({
                where:{
                    id  : decodedToken.id
                },
            })
            if (!captainData) {
                throw new ApiError("User not found", 404);
            }
            const {
                password,
                ...captain
            } = captainData
            return res.status(200).json({
                role:"captain",
                isAuthenticated :true,
                data: captain
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"Internal Server Error"
        })
        
    }
})
export {
    generateAuthToken,
    hashPassword,
    comparePassword,
    userAuthCheck
}