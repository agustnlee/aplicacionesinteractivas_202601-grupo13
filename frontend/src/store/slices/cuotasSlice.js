import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCuotas = createAsyncThunk('cuotas/fetchAll', async () => {
    const response = await fetch('/api/cuotas', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
});

const cuotasSlice = createSlice({
    name: 'cuotas',
    initialState: { lista: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCuotas.pending, (state) => { state.loading = true; })
            .addCase(fetchCuotas.fulfilled, (state, action) => {
                state.loading = false;
                state.lista = action.payload;
            })
            .addCase(fetchCuotas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const selectCuotas = (state) => state.cuotas.lista;
export default cuotasSlice.reducer;