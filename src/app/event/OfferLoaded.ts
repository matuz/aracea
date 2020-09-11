import Event from "./event";
import { Offer } from "../model/offer";

export class OfferLoaded extends Event {
    public static type = 'OfferLoaded';
    constructor(public readonly offer: Offer) {
        super(OfferLoaded.type);
    }
}