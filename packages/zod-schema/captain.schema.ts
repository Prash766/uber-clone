
import { z } from "zod";

export const loginCaptainSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUpCaptainSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    fullName: z.string().min(2, { message: "Full name is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });

  
  export const completeProfileCaptainSchema = z.object({
    vehicleType: z.enum(["Sedan", "SUV", "Mini"], { message: "Invalid vehicle type" }),
    color: z.string().min(1, { message: "Vehicle color is required" }),
    vehicleNumber: z.string().min(7, { message: "Vehicle number is required" }),
  });

  export  type loginCaptainType = z.infer<typeof loginCaptainSchema>;
    export  type signUpCaptainType = z.infer<typeof signUpCaptainSchema>;
    export  type completeProfileCaptainType = z.infer<typeof completeProfileCaptainSchema>;
  