import apiClient from "./apiClient"

export const crearEtiqueta = (data) =>
    apiClient(`/etiquetas`, "POST", {data});


export const modificarEtiqueta = (id, data)=> 
    apiClient(`/etiquetas/${id}`, "PUT", { data });

export const obtenerEtiquetaPorId= (id)=>
    apiClient(`/etiquetas/${id}`,"GET");

export const buscarEtiquetas = (nombre = "", color = "") => {
    const query = new URLSearchParams({ nombre, color }).toString();
    return apiClient(`/etiquetas?${query}`, "GET");};

export const eliminarEtiqueta= (id,forzar = false)=>
    apiClient(`/etiquetas/${id}?forzar=${forzar}`,"DELETE");


