package com.uade.tp13.dto.response;

import com.uade.tp13.enums.ROL_USUARIO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {

    private String token;
    private Long id;
    private String nombre;
    private String email;
    private ROL_USUARIO rol;
}
