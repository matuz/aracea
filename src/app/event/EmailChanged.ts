import Event from './event';

export class EmailChanged extends Event {
    public static type = 'EmailChanged';
    constructor(public readonly email: string) {
        super(EmailChanged.type);
    }
}