import { Observable } from "rxjs";
import Event from "../event/event";
import { StateObservable } from "redux-observable";
import { State } from "../store";
import { filter, map, mergeMap, tap } from "rxjs/operators";
import { OrderSendRequested } from "../event/OrderSendRequested";
import { OrderSendSucceeded } from "../event/OrderSendSucceeded";
import { ajax } from "rxjs/ajax";

export default (events$: Observable<Event>, store$: StateObservable<State>, dependencies: {}) =>
    events$.pipe(
        filter(event => event.type === OrderSendRequested.type),
        mergeMap(() => ajax.post('http://localhost:5000', store$.value.order).pipe(
            tap(console.log),
            map(() => new OrderSendSucceeded())
        ))
    );