package com.uade.tp13.dto.request;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;


@Data
public class EtiquetaRequest {

     @NotBlank(message = "El nombre de la etiqueta es obligatorio")
     private String nombreEtiqueta;

     @NotBlank(message = "El color de la etiqueta es obligatorio")
     private String colorEtiqueta;

     private String descripcionEtiqueta;

   
    













}
