import {Action} from "redux";

export default class Event implements Action<any> {
    constructor(public readonly type: string) {}
}
