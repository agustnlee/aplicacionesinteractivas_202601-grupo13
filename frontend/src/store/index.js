import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import etiquetaReducer from "./EtiquetaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        etiquetas: etiquetaReducer,
        // TODO: El resto de reducers
    }
});