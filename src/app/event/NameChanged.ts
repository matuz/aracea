import Event from './event';

export class NameChanged extends Event {
    public static type = 'NameChanged';
    constructor(public readonly name: string) {
        super(NameChanged.type);
    }
}