export type CaptainActive= {
    captainId: number,
    location:SocketLocationType,
    prevLocation:SocketLocationType
    data:{
        captain:{
            id:number,
            fullName:string
            vehicleNumber: string,
            email: string,
            status:"active" | "inactive"
        },
        vehicle:Vehicle
    }
}

export type SocketLocationType= {
    latitude:number,
    longitude:number
}


export type Socket_Captain_Type ={ 
        id:number,
        fullName:string
        vehicleNumber: string,
        email: string,
        status:"active" | "inactive"
    
}
export enum VehicleType{
    Sedan ,
    SUV,
    Mini,
    Auto,
    Bike
  }

export type Vehicle = {
    id:number,
    captainId : number,
    vehicleNumber  : string ,
    vehicleImage: string,
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