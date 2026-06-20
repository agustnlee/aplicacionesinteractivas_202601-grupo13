import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
export { default as creditosReducer } from './creditosSlice';
export { default as cuotasReducer } from './cuotasSlice';
export { default as pagosReducer } from './pagosSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // TODO: El resto de reducers
    }
});