import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCuotas, getCuotasPendientes, getCuotasVencidas } from "../api/cuotaApi";

export const ObtenerCuotasThunk = createAsyncThunk(
    "/cuotas/todas",
    async (creditoId, { rejectWithValue }) => {
        try {
            const data = await getCuotas(creditoId);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const ObtenerCuotasPendientesThunk = createAsyncThunk(
    "/cuotas/pendientes",
    async (creditoId, { rejectWithValue }) => {
        try {
            const data = await getCuotasPendientes(creditoId);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const ObtenerCuotasVencidasThunk = createAsyncThunk(
    "/cuotas/vencidas",
    async (creditoId, { rejectWithValue }) => {
        try {
            const data = await getCuotasVencidas(creditoId);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const cuotaSlice = createSlice({
    name: "cuotas",
    initialState: {
        cuotas: [],
        pendientes: [],
        vencidas: [],
        loading: false,
        error: null,
    },
    reducers: {
        limpiarCuotas: (state) => {
            state.cuotas = [];
            state.pendientes = [];
            state.vencidas = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ObtenerCuotasThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerCuotasThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.cuotas = action.payload || [];
            })
            .addCase(ObtenerCuotasThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener cuotas";
            })

            .addCase(ObtenerCuotasPendientesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerCuotasPendientesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.pendientes = action.payload || [];
            })
            .addCase(ObtenerCuotasPendientesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener cuotas pendientes";
            })

            .addCase(ObtenerCuotasVencidasThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerCuotasVencidasThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.vencidas = action.payload || [];
            })
            .addCase(ObtenerCuotasVencidasThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener cuotas vencidas";
            });
    }
});

export const { limpiarCuotas } = cuotaSlice.actions;
export default cuotaSlice.reducer;