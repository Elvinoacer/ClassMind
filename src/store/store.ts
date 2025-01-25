import { pokemonApi } from "@/rtk";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "./features/counterslice";

// import storage from "redux-persist/lib/storage";

// const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = {
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
};
// const persistedReducer = persistCombineReducers(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(/**{
      serializableCheck: false,
      immutableCheck: false,
    } */).concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
