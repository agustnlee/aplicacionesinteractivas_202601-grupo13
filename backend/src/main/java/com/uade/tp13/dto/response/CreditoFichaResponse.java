package com.uade.tp13.dto.response;
 
import java.math.BigDecimal;
 
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import com.uade.tp13.enums.EstadoCredito;
 
@Data
@Builder
public class CreditoFichaResponse {
    private Long id;
    private BigDecimal monto;
    private Long cobradorId;
    private String cobradorNombre;
    private EstadoCredito estado;
    private LocalDate fechaCreacion;
}