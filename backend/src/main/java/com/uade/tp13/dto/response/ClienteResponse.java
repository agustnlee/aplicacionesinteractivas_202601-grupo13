package com.uade.tp13.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClienteResponse {
    private Long id;
    private String dni;
    private String nombre;
    private String email;
    private String telefono;
    private String domicilio;
    private Boolean estado;
    private java.time.LocalDateTime fechaCreacion;

    private Long IdCreadoPor;
    private String nombreCreadoPor;

}
