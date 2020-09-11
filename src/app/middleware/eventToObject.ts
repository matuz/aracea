import { Middleware } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import Event from "../event/event"

const eventToObjectMiddleware: Middleware = () => (next: Dispatch<Event>) => (event: any): any => {
    if(event instanceof Event) {
        return next(JSON.parse(JSON.stringify(event)));
    }
    return next(event);
}

export default eventToObjectMiddleware;