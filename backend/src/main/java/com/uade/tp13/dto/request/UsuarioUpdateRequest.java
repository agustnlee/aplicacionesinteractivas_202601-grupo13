package com.uade.tp13.dto.request;

import com.uade.tp13.enums.ROL_USUARIO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UsuarioUpdateRequest {


    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotNull(message = "El rol es obligatorio")
    private ROL_USUARIO rol;

    private Boolean estado;
}