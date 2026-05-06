import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../api/auth"; 

// thunks
export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await login(email, password);
            return data; // { token, nombre, rol, email, id }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        await logout();
        return true;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
);

// slices
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = {
                    id:     action.payload.id,
                    nombre: action.payload.nombre,
                    rol:    action.payload.rol,
                    email:  action.payload.email,
                };
                // persistir en localStorage al token
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.mensajes?.[0] || "Unknown Error";
            })
            // logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.loading = false;
                state.error = null;

                localStorage.removeItem("token");
                localStorage.removeItem("user");
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;