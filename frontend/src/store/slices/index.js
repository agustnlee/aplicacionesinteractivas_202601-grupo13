// frontend/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"; 
import { creditosReducer, cuotasReducer, pagosReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    creditos: creditosReducer,
    cuotas: cuotasReducer,
    pagos: pagosReducer,
  },
});