import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { buscarEtiquetas, modificarEtiqueta, crearEtiqueta, eliminarEtiqueta, obtenerEtiquetaPorId } from "../api/apiEtiquetas";



export const BuscarEtiquetasThunk = createAsyncThunk( "/etiquetas", async (_, {rejectWithValue})=>{
    try{
        const data = await buscarEtiquetas();
        return data; 
    }catch(err){
        return rejectWithValue(err);
    }    

}    
);

export const CrearEtiquetaThunk = createAsyncThunk( "/etiquetas/crear", async (data, {rejectWithValue})=>{
    try{
        const response = await crearEtiqueta(data); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const ModificarEtiquetaThunk = createAsyncThunk( "/etiquetas/modificar", async ({id, data}, {rejectWithValue})=>{
    try{
        const response = await modificarEtiqueta(id, data); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const EliminarEtiquetaThunk = createAsyncThunk( "/etiquetas/eliminar", async (id, {rejectWithValue})=>{
    try{
        const response = await eliminarEtiqueta(id); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const ObtenerEtiquetaPorIdThunk = createAsyncThunk( "/etiquetas/:id", async (id, {rejectWithValue})=>{
    try{
        const response = await obtenerEtiquetaPorId(id); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const etquetaSlice = createSlice({
    name: "etiquetas",
    initialState: {
        etiquetas: [],
        loading: false,
        error: null,
    }, 
    reducers: {
        clearError: (state) => { state.error = null; }
    },  
    extraReducers: (builder) => {
        builder

            .addCase(BuscarEtiquetasThunk.pending, (state) => { 
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(BuscarEtiquetasThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.etiquetas = action.payload; 
            })
            .addCase(BuscarEtiquetasThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al cargar etiquetas";
            })

            .addCase(CrearEtiquetaThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CrearEtiquetaThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.etiquetas.push(action.payload);
            })
            .addCase(CrearEtiquetaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al crear etiqueta";
            })
            
            .addCase(ModificarEtiquetaThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ModificarEtiquetaThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.etiquetas.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.etiquetas[index] = action.payload;
                }
            })
            .addCase(ModificarEtiquetaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al modificar etiqueta";
            })

            .addCase(EliminarEtiquetaThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EliminarEtiquetaThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.etiquetas = state.etiquetas.filter(e => e.id !== action.payload.id);
            })
            .addCase(EliminarEtiquetaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al eliminar etiqueta";
            })  

            .addCase(ObtenerEtiquetaPorIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerEtiquetaPorIdThunk.fulfilled, (state, action) => {
                state.loading = false; 
                const index = state.etiquetas.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.etiquetas[index] = action.payload;
                } else {
                    state.etiquetas.push(action.payload);
                }
            })
            .addCase(ObtenerEtiquetaPorIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener etiqueta por ID";
            });

                 

    }
});



