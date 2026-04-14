package com.uade.tp13.dto.request;
//Definido solo para la alteracion del
//password hecho por el admin

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UsuarioPasswordRequest {

    @NotBlank(message = "La constraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

}
