import { PlacesType } from "@repo/redux-store/ride";

export const parsePlaces = (data: PlacesType[]): PlacesType[] => {
  return data.map((item: PlacesType): PlacesType => ({
    ...item,
    lat: Number(item.lat),
    lon: Number(item.lon),
  }));
};


export const INDIAN_STATES = [
  { "name": "Andhra Pradesh", "lat": 16.5, "long": 80.0 },
  { "name": "Arunachal Pradesh", "lat": 28.2180, "long": 94.7278 },
  { "name": "Assam", "lat": 26.2006, "long": 92.9376 },
  { "name": "Bihar", "lat": 25.0961, "long": 85.3131 },
  { "name": "Chhattisgarh", "lat": 21.2787, "long": 81.8661 },
  { "name": "Goa", "lat": 15.2993, "long": 74.1240 },
  { "name": "Gujarat", "lat": 22.2587, "long": 71.1924 },
  { "name": "Haryana", "lat": 29.0588, "long": 76.0856 },
  { "name": "Himachal Pradesh", "lat": 31.1048, "long": 77.1734 },
  { "name": "Jharkhand", "lat": 23.6102, "long": 85.2799 },
  { "name": "Karnataka", "lat": 15.3173, "long": 75.7139 },
  { "name": "Kerala", "lat": 10.8505, "long": 76.2711 },
  { "name": "Madhya Pradesh", "lat": 23.4733, "long": 77.9470 },
  { "name": "Maharashtra", "lat": 19.7515, "long": 75.7139 },
  { "name": "Manipur", "lat": 24.6637, "long": 93.9063 },
  { "name": "Meghalaya", "lat": 25.4670, "long": 91.3662 },
  { "name": "Mizoram", "lat": 23.1645, "long": 92.9376 },
  { "name": "Nagaland", "lat": 26.1584, "long": 94.5624 },
  { "name": "Odisha", "lat": 20.9517, "long": 85.0985 },
  { "name": "Punjab", "lat": 30.7333, "long": 76.7794 },
  { "name": "Rajasthan", "lat": 27.0238, "long": 74.2179 },
  { "name": "Sikkim", "lat": 27.5330, "long": 88.5122 },
  { "name": "Tamil Nadu", "lat": 11.1271, "long": 78.6569 },
  { "name": "Telangana", "lat": 18.1124, "long": 79.0193 },
  { "name": "Tripura", "lat": 23.9408, "long": 91.9882 },
  { "name": "Uttar Pradesh", "lat": 26.8467, "long": 80.9462 },
  { "name": "Uttarakhand", "lat": 30.0668, "long": 79.0193 },
  { "name": "West Bengal", "lat": 22.9868, "long": 87.8550 }
]


export const VEHICLE_BRANDS = [
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
    { value: "ford", label: "Ford" },
    { value: "chevrolet", label: "Chevrolet" },
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes-Benz" }
]