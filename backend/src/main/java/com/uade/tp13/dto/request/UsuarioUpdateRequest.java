package com.uade.tp13.dto.request;

import com.uade.tp13.enums.ROL_USUARIO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UsuarioUpdateRequest {


    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El rol es obligatorio")
    private ROL_USUARIO rol;

    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "El estado es obligatorio")
    private Boolean estado;
}