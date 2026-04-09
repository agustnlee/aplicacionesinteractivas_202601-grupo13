package com.uade.tp13.dto.response;
 
import java.math.BigDecimal;
 
import lombok.Builder;
import lombok.Data;
 
@Data
@Builder
public class CreditoFichaResponse {
    private Long id;
    private BigDecimal monto;
    private Long cobradorId;
    private String cobradorNombre;
    private LocalDateTime fechaCreacion;
}