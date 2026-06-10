import {createAsyinThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const EtiquetasThunk = createAsyncThunk('etiquetas',async()=>{
    try {
        const response = await axios.get('/api/etiquetas');
        return response.data;
    } catch (error) {
        throw error;
    }}
)

const EtiquetaSlice = createSlice({
    name:'etiquetas',
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(EtiquetasThunk.pending,(state)=>{
                state.loading= true;
                state.error=null;})
                .addCase(EtiquetasThunk.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.items=action.payload;
                })
                .addCase(EtiquetasThunk.rejected,(state,action)=>{
                    state.loading=false;
                    state.error=action.error.message;
                })
}});

export default EtiquetaSlice.reducer;

