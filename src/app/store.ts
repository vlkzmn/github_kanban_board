import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { repoDataApi } from '../features/repoDataApi';
import { repoNameSlice } from '../features/repoNameSlice';
import { issuesSlice } from '../features/issuesSlice';

const rootReducer = combineSlices(repoNameSlice, repoDataApi, issuesSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(repoDataApi.middleware);
    },
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

const store = makeStore();
export default store;

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
