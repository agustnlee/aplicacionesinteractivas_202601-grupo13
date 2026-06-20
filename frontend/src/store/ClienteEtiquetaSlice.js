import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { asignarEtiqueta, obtenerResumenEtiquetas,obtenerEtiquetaPorCliente,eliminarAsignacion,contarClientesPorEtiqueta } from "../api/apiClienteEtiquetas";

export const AsignarEtiquetaThunk = createAsyncThunk( "/clientes-etiquetas/asignar", async ({clienteId, etiquetaId}, {rejectWithValue})=>{
    try{
        const response = await asignarEtiqueta(clienteId, etiquetaId); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }   
});

export const ObtenerResumenEtiquetasThunk = createAsyncThunk( "/clientes-etiquetas/resumen", async (params, {rejectWithValue})=>{
    try{
        const data = await obtenerResumenEtiquetas(params);
        return data; 
    }catch(err){
        return rejectWithValue(err);
    }    
});

export const ObtenerEtiquetaPorClienteThunk = createAsyncThunk( "/clientes-etiquetas/cliente/:id", async ({clienteId, params}, {rejectWithValue})=>{
    try{
        const data = await obtenerEtiquetaPorCliente(clienteId, params); 
        return data;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const EliminarAsignacionThunk = createAsyncThunk( "/clientes-etiquetas/eliminar", async (idAsignacion, {rejectWithValue})=>{
    try{
        await eliminarAsignacion(idAsignacion); 
        return idAsignacion;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const ContarClientesPorEtiquetaThunk = createAsyncThunk( "/clientes-etiquetas/resumen/:id", async (etiquetaId, {rejectWithValue})=>{
    try{
        const data = await contarClientesPorEtiqueta(etiquetaId); 
        return data;
    }   catch(err){
        return rejectWithValue(err);
    }   
    });

export const clienteEtiquetaSlice = createSlice({
    name: "clienteEtiquetas",
    initialState: { 
        asignaciones: [],
        resumen: [],
        etiquetasPorCliente: [],
        conteoClientesPorEtiqueta: {},
        loading: false,
        error: null,    
        },
    reducers: {},
    extraReducers: (builder) => {
            builder.addCase(AsignarEtiquetaThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AsignarEtiquetaThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.asignaciones.push(action.payload);
            })
            .addCase(AsignarEtiquetaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al asignar etiqueta";
            })  
            .addCase(ObtenerResumenEtiquetasThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerResumenEtiquetasThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.resumen = action.payload?.contenido || [];
            })
            .addCase(ObtenerResumenEtiquetasThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener resumen de etiquetas";
            })
            .addCase(ObtenerEtiquetaPorClienteThunk.pending, (state) => {
                state.loading = true;   
                state.error = null;
            })
            .addCase(ObtenerEtiquetaPorClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.etiquetasPorCliente = action.payload?.contenido || [];
            })
            .addCase(ObtenerEtiquetaPorClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener etiquetas por cliente";
            })
            .addCase(EliminarAsignacionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EliminarAsignacionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.asignaciones = state.asignaciones.filter(a => a.id !== action.payload);
            })
            .addCase(EliminarAsignacionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al eliminar asignación";
            })
            .addCase(ContarClientesPorEtiquetaThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ContarClientesPorEtiquetaThunk.fulfilled, (state, action) => {
                state.loading = false;
                const { etiquetaId, conteo } = action.payload || {};
                if (etiquetaId) {
                    state.conteoClientesPorEtiqueta[etiquetaId] = conteo || 0;
                }   
            })
            .addCase(ContarClientesPorEtiquetaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al contar clientes por etiqueta";
            }); 
 
    }
});

export default clienteEtiquetaSlice.reducer;

