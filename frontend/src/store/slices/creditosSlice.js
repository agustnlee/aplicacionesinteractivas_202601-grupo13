import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCreditos = createAsyncThunk('creditos/fetchAll', async () => {
    const response = await fetch('/api/creditos', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
});

const creditosSlice = createSlice({
    name: 'creditos',
    initialState: { lista: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreditos.pending, (state) => { state.loading = true; })
            .addCase(fetchCreditos.fulfilled, (state, action) => {
                state.loading = false;
                state.lista = action.payload;
            })
            .addCase(fetchCreditos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const selectCreditos = (state) => state.creditos.lista;
export default creditosSlice.reducer;