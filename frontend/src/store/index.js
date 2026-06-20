import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usuarioReducer from "./usuarioSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        usuario: usuarioReducer,
        // TODO: El resto de reducers
    }
});