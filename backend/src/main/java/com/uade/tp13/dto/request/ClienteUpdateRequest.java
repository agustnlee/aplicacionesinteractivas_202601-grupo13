package com.uade.tp13.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClienteUpdateRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El telefono es obligatorio")
    @Pattern(regexp = "\\d{8,10}",message = "El telefono debe tener 8 a 10 numeros")
    private String telefono;

    @NotBlank(message = "El domicilio es obligatorio")
    private String domicilio;


}
