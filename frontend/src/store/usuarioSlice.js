import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  editarUsuario,
  cambiarEstadoUsuario,
  resetearPassword,
} from "../api/usuarioApi";

export const fetchUsuariosThunk = createAsyncThunk(
  "usuario/fetchUsuarios",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getUsuarios(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUsuarioByIdThunk = createAsyncThunk(
  "usuario/fetchUsuarioById",
  async (id, { rejectWithValue }) => {
    try {
      return await getUsuarioById(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const crearUsuarioThunk = createAsyncThunk(
  "usuario/crearUsuario",
  async (data, { rejectWithValue }) => {
    try {
      return await crearUsuario(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editarUsuarioThunk = createAsyncThunk(
  "usuario/editarUsuario",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await editarUsuario(id, data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const cambiarEstadoUsuarioThunk = createAsyncThunk(
  "usuario/cambiarEstadoUsuario",
  async (id, { rejectWithValue }) => {
    try {
      return await cambiarEstadoUsuario(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const resetearPasswordThunk = createAsyncThunk(
  "usuario/resetearPassword",
  async ({ id, password }, { rejectWithValue }) => {
    try {
      return await resetearPassword(id, password);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    usuarios: [],
    usuarioSeleccionado: null,
    totalPages: 0,
    currentPage: 0,
    totalElements: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearUsuarioError: (state) => {
      state.error = null;
    },
    clearUsuarioSeleccionado: (state) => {
      state.usuarioSeleccionado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuariosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuariosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload?.contenido ?? action.payload?.content ?? [];
        state.totalPages = action.payload?.totalPaginas ?? action.payload?.totalPages ?? 0;
        state.currentPage = action.payload?.paginaActual ?? action.payload?.number ?? 0;
        state.totalElements = action.payload?.totalElementos ?? action.payload?.totalElements ?? 0;
      })
      .addCase(fetchUsuariosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensajes?.[0] || "Error al cargar usuarios";
      })

      .addCase(fetchUsuarioByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarioByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioSeleccionado = action.payload;
      })
      .addCase(fetchUsuarioByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensajes?.[0] || "Error al cargar usuario";
      })

      .addCase(crearUsuarioThunk.rejected, (state, action) => {
        state.error = action.payload?.mensajes?.[0] || "Error al crear usuario";
      })
      .addCase(editarUsuarioThunk.rejected, (state, action) => {
        state.error = action.payload?.mensajes?.[0] || "Error al editar usuario";
      })
      .addCase(cambiarEstadoUsuarioThunk.rejected, (state, action) => {
        state.error = action.payload?.mensajes?.[0] || "Error al cambiar estado del usuario";
      })
      .addCase(resetearPasswordThunk.rejected, (state, action) => {
        state.error = action.payload?.mensajes?.[0] || "Error al cambiar contraseña";
      });
  },
});

export const { clearUsuarioError, clearUsuarioSeleccionado } = usuarioSlice.actions;
export default usuarioSlice.reducer;
