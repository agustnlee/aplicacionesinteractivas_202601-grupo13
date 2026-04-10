package com.uade.tp13.dto.response;
import java.time.LocalDateTime;

import com.uade.tp13.enums.ROL_USUARIO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioResponse {
    private Long id;
    private String nombre;
    private ROL_USUARIO rol;
    private String email;
    private Boolean estado;
    private LocalDateTime fechaCreacion;
}
