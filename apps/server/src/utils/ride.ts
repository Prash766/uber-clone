export const VEHICLE_PRICES_PER_KM = {
    uber_go: 15.169,
    go_sedan: 15.684,
    uber_xl: 257.784,
    moto: 8.834,
    premier: 19.677
  };
  
  export interface RideProduct {
    displayName: string;
    description: string;
    productImageUrl: string;
    currencyCode: string;
    isAvailable: boolean;
    distance: number;
    duration: number;
    formattedDuration: string;
    fare: string;
    fareAmount: number;
    capacity: number;
  }
  
  export interface ProductTier {
    title: string;
    products: RideProduct[];
  }
  
  export interface UnifiedResponse {

      products: {
        tiers: ProductTier[];
      };
  }
  
  export const TIERS = {
    recommended: [
      {
        vehicleType: 'uber_go',
        displayName: 'Uber Go',
        description: 'Affordable compact rides',
        productImageUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png',
        capacity: 4
      },
      {
        vehicleType: 'go_sedan',
        displayName: 'Go Sedan',
        description: 'Affordable sedans',
        productImageUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png',
        capacity: 4
      }
    ],
    economy: [
      {
        vehicleType: 'moto',
        displayName: 'Moto',
        description: 'Affordable motorcycle rides',
        productImageUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png',
        capacity: 1
      },
      {
        vehicleType: 'premier',
        displayName: 'Premier',
        description: 'Comfortable sedans, top-quality drivers',
        productImageUrl: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png',
        capacity: 4
      }
    ]
  };
  
  export const createRideResponse = (
    distance: number, 
    motoDuration: number,
    carDuration: number , 
    currency: string = 'INR',
  ): UnifiedResponse => {
    const formatCurrency = (value: number) => 
      `${currency}${value.toFixed(2)}`;
  
    const processTier = (tier: typeof TIERS.recommended) => 
      tier.map(vehicle => {
        const pricePerKm = VEHICLE_PRICES_PER_KM[vehicle.vehicleType as keyof typeof VEHICLE_PRICES_PER_KM];
        const distanceKm = distance / 1000;
        const fare = pricePerKm * distanceKm;
        const duration = vehicle.vehicleType==='moto' ? motoDuration : carDuration
        const duration_min = Math.ceil(duration/60)
        let durationString = null
        if(duration_min>59){
          const hours = Math.floor(duration_min / 60);
  const remainingMinutes = Math.ceil(duration_min % 60);
  durationString = `${hours}h ${remainingMinutes}min`
        }
        else{
          durationString = `${duration_min} min`
        }
        
         
        return {
          ...vehicle,
          currencyCode: currency,
          isAvailable: true,
          distance: distance,
          duration: duration,
          formattedDuration: `${durationString}`,
          fare: formatCurrency(fare),
          fareAmount: Math.round(fare * 100)
        };
      });
  
    return {
        products: {
          tiers: [
            {
              title: 'recommended',
              products: processTier(TIERS.recommended)
            },
            {
              title: 'economy',
              products: processTier(TIERS.economy)
            }
          ]
        }
      
    };
  };
