export type CaptainActive= {
    captainId: number,
    location:{
        lat : number,
        lon : number
    },
    captain:{
        id:number,
        firstName:string,
        lastName: string,
        vehicleNumber: string,
        email: string,
        status:"active" | "inactive"

    }
}

export enum VehicleType{
    Sedan ,
    SUV,
    Mini,
    Auto,
    Bike
  }

export type Vehicle = {
    vehicleNumber  : string ,
    vehicleLogo   :string,
    vehicleType: VehicleType
}

///emitting event from the user side schema
export type GetNearByVehiclesRides = {
    userId: number,
    pickupLocation:{
        lat:number,
        lon:number
    },
    destinationLocation:{
        lat:number,
        lon:number
    }
}


export type nearByVehicles= {
    captain:CaptainActive,
    vehicle :Vehicle,
    eta: number,
    formattedETA: string
}