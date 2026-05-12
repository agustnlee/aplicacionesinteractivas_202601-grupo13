import apiClient from "./apiClient";

export const asignarEtiqueta = (clienteId, etiquetaId ) =>
    { const params = new URLSearchParams({ idUsuarioAsignador });
    return   apiClient(`/clientes-etiquetas/${clienteId}/etiquetas/${etiquetaId}?${params}=`, "POST");};

  
export const obtenerResumenEtiquetas= () =>
    apiClient(`/clientes-etiquetas/resumen`, "GET");

export const obtenerEtiquetaPorCliente = (clienteId)=>
    apiClient(`/clientes-etiquetas/cliente/${clienteId}`, "GET" );

export const eliminarAsignacion= (idAsignacion)=>
    apiClient(`/clientes-etiquetas/${idAsignacion}`, "DELETE");



