import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


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

export {
    generateAuthToken,
    hashPassword,
    comparePassword
}