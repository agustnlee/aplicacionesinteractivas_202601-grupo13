package com.uade.tp13.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MetricasResponse {
    private long usuariosActivos;
    private long creditosOtorgados;
    private long creditosFinalizados;
    private long creditosEnMora;
    private long cantidadEtiquetas;
}
