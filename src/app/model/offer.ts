import { Plant } from "./plant";

export interface Offer {
    id: string;
    name: string;
    startTime: string;
    stopTime: string;
    plants: Plant[];
    currency: string;
}
