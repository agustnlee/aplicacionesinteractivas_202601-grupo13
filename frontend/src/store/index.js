import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usuarioReducer from "./usuarioSlice";
import etiquetaReducer from "./EtiquetaSlice";
import clienteEtiquetaReducer from "./ClienteEtiquetaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        usuario: usuarioReducer,
        etiquetas: etiquetaReducer,
        clienteEtiquetas: clienteEtiquetaReducer,
        // TODO: El resto de reducers
    }
});