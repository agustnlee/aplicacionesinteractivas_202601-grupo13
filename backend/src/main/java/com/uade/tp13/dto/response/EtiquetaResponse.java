package com.uade.tp13.dto.response;


import lombok.Builder;
import lombok.Data;


import java.time.LocalDate;

@Data
@Builder
public class EtiquetaResponse {



    private Long etiquetaId;
    private String colorEtiqueta;
    private String nombreEtiqueta;
    private String descripcionEtiqueta;
    
    
}
