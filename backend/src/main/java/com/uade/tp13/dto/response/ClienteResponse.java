package com.uade.tp13.dto.response;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClienteResponse {

    private String dni;
    private String nombre;
    private String email;
    private String telefono;
    private String domicilio;
    private String estado;

    private Long creadoPor;
    private String nombreCreadoPor;

}
