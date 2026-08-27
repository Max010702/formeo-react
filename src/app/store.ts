import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";

import reduxLogger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
