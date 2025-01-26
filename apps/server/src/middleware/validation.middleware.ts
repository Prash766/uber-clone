import { NextFunction, Response, Request } from "express";
import { z,ZodSchema } from "zod";
const validateSchema = (schema:ZodSchema)=>(req:Request , res:Response, next: NextFunction)=>{
    try {
        schema.parse(schema)
         next()
        
    } catch (error) {
         next(error)    
    }
}

export default validateSchema