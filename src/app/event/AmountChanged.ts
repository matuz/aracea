import Event from './event';

export class AmountChanged extends Event {
    public static type = 'AmountChanged';
    constructor(public readonly id: string, public readonly amount: number) {
        super(AmountChanged.type);
    }
}