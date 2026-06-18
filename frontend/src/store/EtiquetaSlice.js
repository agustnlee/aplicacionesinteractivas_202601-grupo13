import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { buscarEtiquetas, modificarEtiqueta, crearEtiqueta, eliminarEtiqueta, obtenerEtiquetaPorId } from "../api/apiEtiquetas";



export const BuscarEtiquetasThunk = createAsyncThunk( "/etiquetas", async (params, {rejectWithValue})=>{
    try{
        const data = await buscarEtiquetas(params);
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

export const ModificarEtiquetaThunk = createAsyncThunk( "/etiquetas/modificar", async ({etiquetaId, data}, {rejectWithValue})=>{
    try{
        const response = await modificarEtiqueta(etiquetaId, data); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const EliminarEtiquetaThunk = createAsyncThunk(
    "/etiquetas/eliminar", 
    async (etiquetaId, { rejectWithValue }) => {
        try {
            await eliminarEtiqueta(etiquetaId);
            return etiquetaId; 
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const ObtenerEtiquetaPorIdThunk = createAsyncThunk( "/etiquetas/:id", async (etiquetaId, {rejectWithValue})=>{
    try{
        const response = await obtenerEtiquetaPorId(etiquetaId); 
        return response;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const etiquetaSlice = createSlice({
    name: "etiquetas",
    initialState: {
        etiquetas: [],
        etiquetaActual: null, 
        totalPaginas: 1,    
        paginaActual: 0,
        loading: false,
        error: null,
    },
    reducers: {
        limpiarEtiquetaActual: (state) => {
            state.etiquetaActual = null;
        }
    }, 
    extraReducers: (builder) => {
        builder
          
            .addCase(BuscarEtiquetasThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(BuscarEtiquetasThunk.fulfilled, (state, action) => {
                state.loading = false;
              
                state.etiquetas = action.payload?.contenido || [];
                state.totalPaginas = action.payload?.totalPaginas || 1;
            })
            .addCase(BuscarEtiquetasThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al buscar etiquetas";
            })

           
            .addCase(CrearEtiquetaThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CrearEtiquetaThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.etiquetas.push(action.payload);
                }
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
                const index = state.etiquetas.findIndex(e => (e.etiquetaId ) == (action.payload?.etiquetaId ));
                if (index !== -1) {
                    state.etiquetas[index] = action.payload;
                }
               
                if (state.etiquetaActual && (state.etiquetaActual.etiquetaId) == (action.payload?.etiquetaId )) {
                    state.etiquetaActual = action.payload;
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
                const idEliminado = action.payload; 
                
                
                state.etiquetas = state.etiquetas.filter(e => e.etiquetaId !== idEliminado );
                
               
                if (state.etiquetaActual && (state.etiquetaActual.etiquetaId == idEliminado )) {
                    state.etiquetaActual = null;
                }
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
                state.etiquetaActual = action.payload; 
            })
            .addCase(ObtenerEtiquetaPorIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener la etiqueta";
            });
    }
});

export const { limpiarEtiquetaActual } = etiquetaSlice.actions;
export default etiquetaSlice.reducer;



