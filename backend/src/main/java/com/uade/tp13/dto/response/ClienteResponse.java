package com.uade.tp13.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

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
    private LocalDateTime fechaCreacion;

    private Long idCreadoPor;
    private String nombreCreadoPor;

}
