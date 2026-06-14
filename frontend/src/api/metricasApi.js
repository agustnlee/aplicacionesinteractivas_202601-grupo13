import apiClient from "./apiClient";

export const getMetricas = () => apiClient("/metricas");