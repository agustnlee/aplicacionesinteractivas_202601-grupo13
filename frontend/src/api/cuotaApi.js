import apiClient from "./apiClient";

export const getCuotas = (creditoId) =>
    apiClient(`/creditos/${creditoId}/cuotas`);

export const getCuotasPendientes = (creditoId) =>
    apiClient(`/creditos/${creditoId}/cuotas/pendientes`);

export const getCuotasVencidas = (creditoId) =>
    apiClient(`/creditos/${creditoId}/cuotas/vencidas`);