// dto/response/CreditoResponse.java
package com.uade.tp13.dto.response;

import com.uade.tp13.enums.EstadoCredito;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class CreditoResponse {
    private Long id;
    /* TODO: Liberar cuando entidades cliente y usuario listo 
    private Long clienteId;
    private String clienteNombre;
    private Long cobradorId;
    private String cobradorNombre;
    */
    private BigDecimal monto;
    private Integer cantidadCuotas;
    private BigDecimal interes;
    private EstadoCredito estado;
    private LocalDate fechaCreacion;
    private List<CuotaResponse> cuotas;
}