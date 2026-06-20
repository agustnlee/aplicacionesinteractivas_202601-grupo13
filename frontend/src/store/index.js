import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clienteReducer from "./ClienteSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cliente: clienteReducer,
        // TODO: El resto de reducers
    }
});