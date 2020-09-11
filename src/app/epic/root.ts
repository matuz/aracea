import { ActionsObservable, combineEpics, StateObservable } from "redux-observable";
import { catchError } from "rxjs/operators";
import loadData from "./loadData";
import Event from "../event/event";
import saveOrder from "./saveOrder";

export const rootEpic = (action$: ActionsObservable<Event>, store$: StateObservable<any>, dependencies: {}) =>
    combineEpics(
        loadData,
        saveOrder
    )(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error('Epic error', error);
            return source;
        })
    );