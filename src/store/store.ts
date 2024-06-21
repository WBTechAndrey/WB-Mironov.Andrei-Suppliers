import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { shipmentsAPI } from "./API/shipmentsAPI";

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(shipmentsAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
