package com.uade.tp13.dto.request;

import com.uade.tp13.enums.ROL_USUARIO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "El rol es obligatorio")
    private ROL_USUARIO rol;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email tiene que ser con el formato valido")
    private String email;
}