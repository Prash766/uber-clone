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