import apiClient from "./apiClient";

export const getUsuarios = (params = {}) =>
    apiClient(`/usuarios?${new URLSearchParams(params)}`);

export const getUsuarioById = (id) =>
    apiClient(`/usuarios/${id}`);

export const crearUsuario = (data) =>
    apiClient("/usuarios", "POST", data);

export const editarUsuario = (id, data) =>
    apiClient(`/usuarios/${id}`, "PUT", data);

export const cambiarEstadoUsuario = (id) =>
    apiClient(`/usuarios/${id}/estado`, "PATCH");
