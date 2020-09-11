import { configureStore } from '@reduxjs/toolkit';
import { rootEpic } from "./epic/root";

import { createEpicMiddleware } from 'redux-observable';
import rootReducer from "./reducer/root";
import eventToObjectMiddleware from "./middleware/eventToObject";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(epicMiddleware).concat(eventToObjectMiddleware),
  reducer: rootReducer,
});

epicMiddleware.run(rootEpic);

export type State = ReturnType<typeof store.getState>;
