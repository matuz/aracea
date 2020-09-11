import { createReducer } from "@reduxjs/toolkit";
import { OfferLoaded } from "../event/OfferLoaded";
import { Offer } from "../model/offer";

export default createReducer<Offer>({} as Offer, {
    [OfferLoaded.type]: (state: Offer, event: OfferLoaded) => event.offer,
});