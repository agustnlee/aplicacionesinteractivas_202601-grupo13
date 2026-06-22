import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCreditos, getCreditoById, previewCredito, crearCredito, cambiarCobrador, cancelarCredito,} from "../api/creditoApi";

export const BuscarCreditosThunk = createAsyncThunk(
    "/creditos/buscar",
    async (filtros, { rejectWithValue }) => {
        try {
            const data = await getCreditos(filtros);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const ObtenerCreditoPorIdThunk = createAsyncThunk(
    "/creditos/:id",
    async (id, { rejectWithValue }) => {
        try {
            const data = await getCreditoById(id);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const PreviewCreditoThunk = createAsyncThunk(
    "/creditos/preview",
    async (data, { rejectWithValue }) => {
        try {
            const response = await previewCredito(data);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const CrearCreditoThunk = createAsyncThunk(
    "/creditos/crear",
    async (data, { rejectWithValue }) => {
        try {
            const response = await crearCredito(data);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const CambiarCobradorThunk = createAsyncThunk(
    "/creditos/cambiarCobrador",
    async ({ id, cobradorId }, { rejectWithValue }) => {
        try {
            const response = await cambiarCobrador(id, cobradorId);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const CancelarCreditoThunk = createAsyncThunk(
    "/creditos/cancelar",
    async ({ id, motivoCancelacion }, { rejectWithValue }) => {
        try {
            const response = await cancelarCredito(id, motivoCancelacion);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const creditoSlice = createSlice({
    name: "creditos",
    initialState: {
        creditos: [],
        creditoActual: null,
        preview: null,
        totalPaginas: 1,
        paginaActual: 0,
        loading: false,
        error: null,
    },
    reducers: {
        limpiarCreditoActual: (state) => {
            state.creditoActual = null;
        },
        limpiarPreview: (state) => {
            state.preview = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(BuscarCreditosThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(BuscarCreditosThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.creditos = action.payload?.contenido || [];
                state.totalPaginas = action.payload?.totalPaginas || 1;
                state.paginaActual = action.payload?.paginaActual ?? 0;
            })
            .addCase(BuscarCreditosThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al buscar créditos";
            })

            .addCase(ObtenerCreditoPorIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerCreditoPorIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.creditoActual = action.payload;
            })
            .addCase(ObtenerCreditoPorIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener crédito";
            })

            .addCase(PreviewCreditoThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PreviewCreditoThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.preview = action.payload;
            })
            .addCase(PreviewCreditoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al calcular el plan de cuotas";
            })

            .addCase(CrearCreditoThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CrearCreditoThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.creditos.unshift(action.payload);
                }
            })
            .addCase(CrearCreditoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al crear crédito";
            })

            .addCase(CambiarCobradorThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CambiarCobradorThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.creditoActual?.id === action.payload?.id) {
                    state.creditoActual = action.payload;
                }
            })
            .addCase(CambiarCobradorThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al cambiar cobrador";
            })

            .addCase(CancelarCreditoThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CancelarCreditoThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.creditoActual?.id === action.payload?.id) {
                    state.creditoActual = action.payload;
                }
            })
            .addCase(CancelarCreditoThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al cancelar crédito";
            });
    }
});

export const { limpiarCreditoActual, limpiarPreview } = creditoSlice.actions;
export default creditoSlice.reducer;