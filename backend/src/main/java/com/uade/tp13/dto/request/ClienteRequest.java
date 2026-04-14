package com.uade.tp13.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClienteRequest {

    @NotBlank(message = "El DNI es obligatorio")
    @Pattern(regexp = "\\d{7,8}",message = "El DNI debe tener entre 7 u 8 digitos")
    private String dni;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email tiene que ser con el formato valido")
    private String email;

    @NotBlank(message = "El telefono es obligatorio")
    @Pattern(regexp = "\\d{8,9}",message = "El telefono debe tener 8 numeros")
    private String telefono;

    @NotBlank(message = "El domicilio es obligatorio")
    private String domicilio;

}
