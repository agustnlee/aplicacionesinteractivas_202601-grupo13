import apiClient from "./apiClient";

export const getCreditos = (params = {}) =>
    apiClient(`/creditos?${new URLSearchParams(params)}`);

export const getCreditoById = (id) =>
    apiClient(`/creditos/${id}`);

export const previewCredito = (data) =>
    apiClient("/creditos/preview", "POST", data);

export const crearCredito = (data) =>
    apiClient("/creditos", "POST", data);

export const cambiarCobrador = (id, cobradorId) =>
    apiClient(`/creditos/${id}/cobrador`, "PATCH", { cobradorId });

export const cancelarCredito = (id, motivoCancelacion) =>
    apiClient(`/creditos/${id}/cancelar`, "PATCH", { motivoCancelacion });