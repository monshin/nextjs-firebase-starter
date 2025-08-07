import { configureStore, type UnknownAction } from '@reduxjs/toolkit';
import { createEpicMiddleware, type Epic } from 'redux-observable';

import RootReducer from './reducers';
import RootEpic from './epics';

import { IS_PROD } from '@/constants';

export const makeStore = () => {
  const epicMiddleware = createEpicMiddleware<
    UnknownAction,
    UnknownAction,
    ReturnType<typeof RootReducer>
  >();

  const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(
        epicMiddleware
      );
    },
    devTools: !IS_PROD,
  });
  epicMiddleware.run(RootEpic);

  return store;
};

// Get the type of our store variable
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppEpic = Epic<UnknownAction, UnknownAction, RootState>;
