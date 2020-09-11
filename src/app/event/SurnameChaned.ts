import Event from './event';

export class SurnameChanged extends Event {
    public static type = 'SurnameChanged';
    constructor(public readonly surname: string) {
        super(SurnameChanged.type);
    }
}