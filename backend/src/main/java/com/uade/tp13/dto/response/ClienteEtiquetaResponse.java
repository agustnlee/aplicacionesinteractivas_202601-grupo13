package com.uade.tp13.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class ClienteEtiquetaResponse {

     private Long etiquetaId;
     private Long clienteId;
     private Long asignadoPorId;
     private LocalDate asignadoEn;


    


}
