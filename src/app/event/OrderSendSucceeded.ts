import Event from './event';

export class OrderSendSucceeded extends Event {
    public static type = 'OrderSendSucceeded';
    constructor() {
        super(OrderSendSucceeded.type);
    }
}