import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { State } from "../store";
import { filter, map, mergeMap, tap } from "rxjs/operators";
import { ApplicationInitialized } from "../event/ApplicationInitialized";
import { OfferLoaded } from "../event/OfferLoaded";
import Event from "../event/event";
import { ajax } from "rxjs/ajax";

export default (events$: Observable<Event>, store$: StateObservable<State>, dependencies: {}) =>
    events$.pipe(
        filter(event => event.type === ApplicationInitialized.type),
        mergeMap((anyEvent: Event) => {
            const event: ApplicationInitialized = anyEvent as ApplicationInitialized;
            return ajax.get(`http://192.168.0.12:5000/${event.id}/${event.user}`).pipe(
                tap(console.log),
                map(resp => new OfferLoaded(resp.response))
            )
        })
    );