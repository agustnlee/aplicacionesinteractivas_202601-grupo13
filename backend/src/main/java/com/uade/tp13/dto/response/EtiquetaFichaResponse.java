package com.uade.tp13.dto.response;
 
import lombok.Builder;
import lombok.Data;
 
@Data
@Builder
public class EtiquetaFichaResponse {
    private Long id;
    private String nombre;
    private String color;
}