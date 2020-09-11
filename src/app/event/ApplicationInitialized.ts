import Event from "./event";

export class ApplicationInitialized extends Event {
    public static type = 'ApplicationInitialized';
    constructor(public readonly id: string, public readonly user: string) {
        super(ApplicationInitialized.type);
    }
}