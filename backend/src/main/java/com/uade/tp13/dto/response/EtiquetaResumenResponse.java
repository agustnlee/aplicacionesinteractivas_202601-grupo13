package com.uade.tp13.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class EtiquetaResumenResponse {
    private Long etiquetaId;
    private String nombreEtiqueta;
    private String colorEtiqueta;
    private Long cantidadClientes;
}
