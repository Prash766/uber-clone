
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
  


    export const vehicleRegistrationSchema = z.object({
      // Driver Information
      firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
      lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }).optional().or(z.literal('')),
      email: z.string().email({ message: "Please enter a valid email address." }),
      phone: z.string().min(10, { message: "Please enter a valid phone number." }),
      driverLicenseState: z.string().min(1, { message: "State is required." }),
      driverLicenseExpiry: z.string().min(1, { message: "Expiry date is required." }),
      vehicleType : z.string(),
      vehicleNumber : z.string().min(1, { message: "License plate is required." })
      // driverLicense: z.string().min(5, { message: "Driver license number is required." }),
      
      // // Vehicle Information - CONTINUE IN THE FUTURE
      
      // vehicleMake: z.string().min(1, { message: "Vehicle make is required." }),
      // vehicleModel: z.string().min(1, { message: "Vehicle model is required." }),
      // vehicleYear: z.string().min(1, { message: "Vehicle year is required." }),
      // vehicleColor: z.string().min(1, { message: "Vehicle color is required." }),
      // licensePlate: z.string().min(1, { message: "License plate is required." }),
      // vehicleType: z.string(),
      
      // registrationState: z.string().min(1, { message: "Registration state is required." }),
      // registrationExpiry: z.string().min(1, { message: "Registration expiry date is required." }),
    
    })

    export type  vehicleRegistrationType = z.infer<typeof vehicleRegistrationSchema>