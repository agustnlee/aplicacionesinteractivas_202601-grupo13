import apiClient from "./apiClient";

export const crearEtiqueta = (data) =>
    apiClient("/etiquetas", "POST", {data});


export const modificarEtiqueta = (id, data)=> 
    apiClient(`/etiquetas/${id}`, "PUT", { data });

export const obtenerEtiquetaPorId= (id)=>
    apiClient(`/etiquetas/${id}`,"GET");

export const buscarEtiquetas = (params = {}) => {
 // Traducción de nombres de parámetros a lo que espera Spring
 const queryParams = {
 page: params.pagina?? params.page?? 0,
 size: params.tamanio?? params.size?? 10,
...(params.nombre && { nombre: params.nombre }),
...(params.color && { color: params.color }),
 };
   const queryString = new URLSearchParams(queryParams).toString();
 return apiClient(`/etiquetas?${queryString}`);
};

export const eliminarEtiqueta= (id,forzar = false)=>
    apiClient(`/etiquetas/${id}?forzar=${forzar}`,"DELETE");


