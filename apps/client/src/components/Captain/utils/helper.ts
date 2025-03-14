import { User, Car, LucideIcon } from "lucide-react"

export const vehicleOptions = [
    {
      id: "Mini",
      title: "Commercial car",
      description: "You have a car that you wish to drive or employ others to drive",
      imageSrc: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png",
      tabs: [
        { id: "rides", label: "Rides", icon: User },
        { id: "fleet", label: "Fleet", icon: Car },
      ],
    },
    {
      id: "Bike",
      title: "Motorbike (2 wheeler)",
      description: "You wish to drive a motorcycle or scooter",
      imageSrc: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
      tabs: [{ id: "rides", label: "Rides", icon: User }],
    },
    {
      id: "Sedan",
      title: "Sedan (4 wheeler)",
      description: "You wish to drive a sedan ",
      imageSrc: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png",
      tabs: [{ id: "rides", label: "Rides", icon: User }],
    },
    {
      id: "SUV",
      title: "SUV (4 wheeler)",
      description: "You wish to drive a SUV ",
      imageSrc: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png",
      tabs: [{ id: "rides", label: "Rides", icon: User }],
    },
    // {
    //   id: "commercial-motorbike",
    //   title: "Commercial motorbike",
    //   description: "You wish to drive a yellow plate motorcycle or scooter",
    //   imageSrc: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
    //   tabs: [{ id: "rides", label: "Rides", icon: User }],
    // },
    {
      id: "Auto",
      title: "Auto",
      description: "You wish to drive an auto rickshaw",
      imageSrc: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
      tabs: [{ id: "rides", label: "Rides", icon: User }],
    },
  ]

  export interface VehicleTab {
    id: string
    label: string
    icon: LucideIcon
  }
  
  export interface VehicleOptionType {
    id: string
    title: string
    description: string
    imageSrc: string
    tabs: VehicleTab[]
  }
  
  export type VehicleOptions = VehicleOptionType[]