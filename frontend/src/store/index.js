import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clienteReducer from "./ClienteSlice";
import usuarioReducer from "./usuarioSlice";
import etiquetaReducer from "./EtiquetaSlice";
import clienteEtiquetaReducer from "./ClienteEtiquetaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cliente: clienteReducer,
        usuario: usuarioReducer,
        etiquetas: etiquetaReducer,
        clienteEtiquetas: clienteEtiquetaReducer,
    }
});