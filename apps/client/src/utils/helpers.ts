import { PlacesType } from "@repo/redux-store/ride";

export const parsePlaces = (data: PlacesType[]): PlacesType[] => {
  return data.map((item: PlacesType): PlacesType => ({
    ...item,
    lat: Number(item.lat),
    lon: Number(item.lon),
  }));
};
