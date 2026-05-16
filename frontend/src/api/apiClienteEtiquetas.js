import apiClient from "./apiClient";

export const asignarEtiqueta = (clienteId, etiquetaId ) =>
    { 
    return   apiClient(`/clientes-etiquetas/${clienteId}/etiquetas/${etiquetaId}`, "POST");};

  
export const obtenerResumenEtiquetas= () =>
    apiClient(`/clientes-etiquetas/resumen`, "GET");

export const obtenerEtiquetaPorCliente = (clienteId)=>
    apiClient(`/clientes-etiquetas/cliente/${clienteId}`, "GET" );

export const eliminarAsignacion= (idAsignacion)=>
    apiClient(`/clientes-etiquetas/${idAsignacion}`, "DELETE");



