import { createReducer } from "@reduxjs/toolkit";
import { Order, OrderItem } from "../model/order";
import { NameChanged } from "../event/NameChanged";
import { SurnameChanged } from "../event/SurnameChaned";
import { EmailChanged } from "../event/EmailChanged";
import { AmountChanged } from "../event/AmountChanged";
import { ApplicationInitialized } from "../event/ApplicationInitialized";

export default createReducer<Order>({ name: '', surname: '', email: '', items: [], offerId: '', user: '' }, {
    [ApplicationInitialized.type]: (state: Order, event: ApplicationInitialized) => ({ ...state, user: event.user, offerId: event.id}),
    [NameChanged.type]: (state: Order, event: NameChanged) => ({ ...state, name: event.name }),
    [SurnameChanged.type]: (state: Order, event: SurnameChanged) => ({ ...state, surname: event.surname }),
    [EmailChanged.type]: (state: Order, event: EmailChanged) => ({ ...state, email: event.email }),
    [AmountChanged.type]: (state: Order, event: AmountChanged) => normalizeOrder({
        ...state,
        items: isPlantInOrder(state, event) ? changePlantAmount(state, event) : addPlantToOrder(state, event)
    }),
});

const isPlantInOrder = (state: Order, event: AmountChanged): boolean => state.items.find(item => item.plantId === event.id) !== undefined;
const changePlantAmount = (state: Order, event: AmountChanged): OrderItem[] => state.items.map(
    item => item.plantId === event.id ? { ...item, amount: event.amount } : item
).filter(item => item.amount > 0);
const addPlantToOrder = (state: Order, event: AmountChanged): OrderItem[] => [...state.items, { plantId: event.id, amount: event.amount }];
const normalizeOrder = (state: Order): Order => ({...state, items: state.items.filter(item => Number.isInteger(item.amount) && item.amount > 0)})
