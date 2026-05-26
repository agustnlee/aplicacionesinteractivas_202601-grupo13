import apiClient from "./apiClient";

export const registrarPago = (cuotaId, metodo, observaciones) => {
    const params = new URLSearchParams({ metodo });
    if (observaciones) params.append("observaciones", observaciones);
    return apiClient(`/pagos/registrar/${cuotaId}?${params}`, "POST");
};

export const getPagosPorCredito = (creditoId) =>
    apiClient(`/pagos/credito/${creditoId}`);

export const cancelarPago = (pagoId) =>
    apiClient(`/pagos/${pagoId}`, "DELETE");