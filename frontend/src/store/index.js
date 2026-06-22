import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clienteReducer from "./ClienteSlice";
import creditoReducer from "./creditoSlice";
import pagoReducer from "./pagoSlice";
import usuarioReducer from "./usuarioSlice";
import etiquetaReducer from "./EtiquetaSlice";
import clienteEtiquetaReducer from "./ClienteEtiquetaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        clientes: clienteReducer,
        creditos: creditoReducer,
        pagos: pagoReducer,
        usuarios: usuarioReducer,
        etiquetas: etiquetaReducer,
        clienteEtiquetas: clienteEtiquetaReducer,
    }
});