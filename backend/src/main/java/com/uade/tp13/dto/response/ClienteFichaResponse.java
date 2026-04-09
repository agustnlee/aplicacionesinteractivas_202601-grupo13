package com.uade.tp13.dto.response;
 
import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;
 
@Data
@Builder
public class ClienteFichaResponse {
    private Long id;
    private String nombre;
    private String dni;
    private String email;
    private String telefono;
    private String domicilio;
    private Boolean estado;
    private LocalDateTime fechaCreacion;
    private Long idCreador;
    private String creadorNombre;
   
    private List<EtiquetaFichaResponse> detalleEtiquetas;
    private List<CreditoFichaResponse> historialCreditos;
 
}