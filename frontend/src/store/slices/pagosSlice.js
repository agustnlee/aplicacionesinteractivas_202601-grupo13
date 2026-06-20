import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPagos = createAsyncThunk('pagos/fetchAll', async () => {
    const response = await fetch('/api/pagos', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
});

const pagosSlice = createSlice({
    name: 'pagos',
    initialState: { lista: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPagos.pending, (state) => { state.loading = true; })
            .addCase(fetchPagos.fulfilled, (state, action) => {
                state.loading = false;
                state.lista = action.payload;
            })
            .addCase(fetchPagos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const selectPagos = (state) => state.pagos.lista;
export default pagosSlice.reducer;