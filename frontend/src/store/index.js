import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clienteReducer from "./ClienteSlice";
import creditoReducer from "./CreditoSlice";
import pagoReducer from "./PagoSlice";
import usuarioReducer from "./usuarioSlice";
import etiquetaReducer from "./EtiquetaSlice";
import clienteEtiquetaReducer from "./ClienteEtiquetaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        clientes: clienteReducer,
        creditos: creditoReducer,
        pagos: pagoReducer,
        usuario: usuarioReducer,
        etiquetas: etiquetaReducer,
        clienteEtiquetas: clienteEtiquetaReducer,
    }
});