import apiClient from "./apiClient"

export const crearEtiqueta = (data) =>
    apiClient("/etiquetas", "POST", data);


export const modificarEtiqueta = (etiquetaId, data)=> 
    apiClient(`/etiqueta/${id}`, "PUT", { data });

export const obtenerEtiquetaPorId= (etiquetaId)=>
    apiClient(`/etiqueta/${id}`);

export const buscarEtiquetas= (nombre, color, pageable)=>
    apiClient("/etiquetas");

export const eliminarEtiqueta= (etiquetaId)=>
    apiClient("/etiquetas");


