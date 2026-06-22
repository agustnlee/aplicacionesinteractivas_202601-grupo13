import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registrarPago, getPagosPorCredito, cancelarPago } from "../api/pagoApi";

export const RegistrarPagoThunk = createAsyncThunk(
    "/pagos/registrar",
    async ({ cuotaId, metodo, observaciones }, { rejectWithValue }) => {
        try {
            const data = await registrarPago(cuotaId, metodo, observaciones);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const ObtenerPagosPorCreditoThunk = createAsyncThunk(
    "/pagos/credito",
    async (creditoId, { rejectWithValue }) => {
        try {
            const data = await getPagosPorCredito(creditoId);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const CancelarPagoThunk = createAsyncThunk(
    "/pagos/cancelar",
    async (pagoId, { rejectWithValue }) => {
        try {
            await cancelarPago(pagoId);
            return pagoId;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const pagoSlice = createSlice({
    name: "pagos",
    initialState: {
        pagos: [],
        loading: false,
        error: null,
    },
    reducers: {
        limpiarPagos: (state) => {
            state.pagos = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ObtenerPagosPorCreditoThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerPagosPorCreditoThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.pagos = action.payload || [];
            })
            .addCase(ObtenerPagosPorCreditoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener pagos";
            })

            .addCase(RegistrarPagoThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(RegistrarPagoThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.pagos.push(action.payload);
                }
            })
            .addCase(RegistrarPagoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al registrar pago";
            })

            .addCase(CancelarPagoThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CancelarPagoThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.pagos = state.pagos.filter(p => p.id !== action.payload);
            })
            .addCase(CancelarPagoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al cancelar pago";
            });
    }
});

export const { limpiarPagos } = pagoSlice.actions;
export default pagoSlice.reducer;