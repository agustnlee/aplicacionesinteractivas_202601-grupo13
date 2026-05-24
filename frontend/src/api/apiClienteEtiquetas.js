import apiClient from "./apiClient";

export const asignarEtiqueta = (clienteId, etiquetaId ) =>
    { 
    return   apiClient(`/clientes-etiquetas/${clienteId}/etiquetas/${etiquetaId}`, "POST");};

  
export const obtenerResumenEtiquetas = (params = {}) =>
    apiClient(`/clientes-etiquetas/resumen?${new URLSearchParams({
        pagina:  params.pagina  ?? 0,
        tamanio: params.tamanio ?? 10,
    })}`);


export const obtenerEtiquetaPorCliente = (clienteId, params = {}) =>
    apiClient(`/clientes-etiquetas/cliente/${clienteId}?${new URLSearchParams({
        pagina:  params.pagina  ?? 0,
        tamanio: params.tamanio ?? 10,
    })}`);

export const eliminarAsignacion= (idAsignacion)=>
    apiClient(`/clientes-etiquetas/${idAsignacion}`, "DELETE");



