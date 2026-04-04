package com.uade.tp13.dto.response;
import com.uade.tp13.enums.ROL_USUARIO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioResponse {
    private String nombre;
    private String password;
    private ROL_USUARIO rol;
    private String email;
    private Boolean estado;
}
