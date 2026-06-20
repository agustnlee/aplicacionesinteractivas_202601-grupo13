import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listarClientes, buscarClientePorId,  crearCliente,
    obtenerFichaCliente, editarCliente, alterarEstadoCliente } from "../api/clientesApi";
//Cliente
export const BuscarClientesThunk = createAsyncThunk("/clientes/buscar", async (filtros, { rejectWithValue }) => {
        try {
            const data = await listarClientes(filtros);
            return data; 
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const ObtenerClientePorIdThunk = createAsyncThunk("/clientes/:id", async (id, { rejectWithValue }) => {
        try {
            const data = await buscarClientePorId(id);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const CrearClienteThunk = createAsyncThunk("/clientes/crear", async (data, { rejectWithValue }) => {
        try {
            const response = await crearCliente(data);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
//ClienteDetail
export const ObtenerFichaClienteThunk = createAsyncThunk("/clientes/ficha", 
    async (id, { rejectWithValue }) => {
        try {
            const data = await obtenerFichaCliente(id);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const EditarClienteThunk = createAsyncThunk("/clientes/editar", async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await editarCliente(id, data);
            return response; 
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const AlterarEstadoClienteThunk = createAsyncThunk("/clientes/alterarEstado", async (id, { rejectWithValue }) => {
        try {
            await alterarEstadoCliente(id);
            return id; 
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const clienteSlice = createSlice({
    name: "clientes",
    initialState: {
        clientes: [],
        clienteActual: null,
        totalPaginas: 1,
        paginaActual: 0,
        loading: false,
        error: null,
    },
    reducers: {
        limpiarClienteActual: (state) => {
            state.clienteActual = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(BuscarClientesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(BuscarClientesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clientes = action.payload?.contenido || [];
                state.totalPaginas = action.payload?.totalPaginas || 1;
            })
            .addCase(BuscarClientesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al buscar clientes";
            })

            .addCase(ObtenerClientePorIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerClientePorIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clienteActual = action.payload; 
            })
            .addCase(ObtenerClientePorIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al buscar cliente por ID";
            })

            .addCase(ObtenerFichaClienteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ObtenerFichaClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clienteActual = action.payload;
            })
            .addCase(ObtenerFichaClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al obtener la ficha del cliente";
            })

            .addCase(CrearClienteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CrearClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.clientes.push(action.payload);
                }
            })
            .addCase(CrearClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al crear cliente";
            })

            .addCase(EditarClienteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EditarClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.clienteActual && state.clienteActual.id === action.payload?.id) {
                    state.clienteActual = { 
                        ...state.clienteActual, 
                        ...action.payload 
                    };
                }
            })
            .addCase(EditarClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al editar cliente";
            })

            .addCase(AlterarEstadoClienteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AlterarEstadoClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                const idModificado = action.payload; 
                if (state.clienteActual && state.clienteActual.id === idModificado) {
                    state.clienteActual.estado = !state.clienteActual.estado;
                }
            })
            .addCase(AlterarEstadoClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al alterar estado";
            });
    }
});

export const { limpiarClienteActual } = clienteSlice.actions;
export default clienteSlice.reducer;