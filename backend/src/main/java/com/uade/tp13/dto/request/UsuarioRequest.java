package com.uade.tp13.dto.request;

import com.uade.tp13.enums.ROL_USUARIO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Builder;
import jakarta.validation.constraints.Size;

@Data
@Builder
public class UsuarioRequest {

    @NotBlank(message = "La constraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El rol es obligatorio")
    private ROL_USUARIO rol;

    @NotBlank(message = "El email es obligatorio")
    private String email;
}