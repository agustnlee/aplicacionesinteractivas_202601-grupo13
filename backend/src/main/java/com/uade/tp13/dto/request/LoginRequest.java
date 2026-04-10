package com.uade.tp13.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Debe tener un formato de email válido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")  //TODO: Coincidir frontend y back con validacion
    private String password;
}