import Event from './event';

export class OrderSendRequested extends Event {
    public static type = 'OrderSendRequested';
    constructor() {
        super(OrderSendRequested.type);
    }
}