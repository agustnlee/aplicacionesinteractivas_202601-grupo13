import apiClient from "./apiClient";

export const crearCliente = (data) => 
    apiClient("/clientes", "POST", data);

export const editarCliente = (id, data) => 
    apiClient(`/clientes/${id}`, "PUT", data);

export const alterarEstadoCliente = (id) => 
    apiClient(`/clientes/${id}/estado`, "PATCH");

export const listarClientes = (filtros = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
    });

    const query = queryParams.toString();
    return apiClient(`/clientes${query ? `?${query}` : ""}`, "GET");
};

export const buscarClientePorId = (id) => 
    apiClient(`/clientes/${id}`, "GET");

export const buscarClientePorDni = (dni) => 
    apiClient(`/clientes/dni/${dni}`, "GET");

export const obtenerFichaCliente = (id) => 
    apiClient(`/clientes/${id}/ficha`, "GET");
//Redundante, chequear funcionalidad 
export const obtenerFichaClientePorDni = (dni) => 
    apiClient(`/clientes/dni/${dni}/ficha`, "GET");