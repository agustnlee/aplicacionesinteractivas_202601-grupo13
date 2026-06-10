import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { buscarEtiquetas, modificarEtiqueta, } from "../api/apiEtiquetas";



export const BuscarEtiquetasThunk = createAsyncThunk( "/etiquetas", async (_, {rejectWithValue})=>{
    try{
        const data = await buscarEtiquetas();
        return data; 
    }catch(err){
        return rejectWithValue(err);
    }    

}    
);

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
            });
    }
});



