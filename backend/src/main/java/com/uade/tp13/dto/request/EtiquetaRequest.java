package com.uade.tp13.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;


@Data
public class EtiquetaRequest {

     @NotBlank(message = "El nombre de la etiqueta es obligatorio")
     private String nombreEtiqueta;

     @NotBlank(message = "El color de la etiqueta es obligatorio")
     private String colorEtiqueta;

     private String descripcionEtiqueta;

     @NotNull(message = "La fecha de creacion de la etiqueta es obligatorio")
     private LocalDate fechaCreacionEtiqueta;

     @NotNull(message = "La fecha de modificacion de la etiqueta es obligatorio")
     private LocalDate fechaModificacionEtiqueta;

    













}
