import apiClient from "./apiClient"

export const crearEtiqueta = (data) =>
    apiClient(`/etiquetas`, "POST", {data});


export const modificarEtiqueta = (Id, data)=> 
    apiClient(`/etiqueta/${id}`, "PUT", { data });

export const obtenerEtiquetaPorId= (Id)=>
    apiClient(`/etiqueta/${id}`);

export const buscarEtiquetas= (nombre, color )=>
    apiClient("/etiquetas",{nombre},{color} );

export const eliminarEtiqueta= (Id)=>
    apiClient(`/etiqueta/${id}`);


