package com.uade.tp13.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.uade.tp13.enums.EstadoCuota;

@Data
@Builder
public class CuotaResponse {
    private Long id;
    private Integer numeroCuota;
    private LocalDate fechaVencimiento;
    private BigDecimal monto;
    private BigDecimal montoRecargo;
    private BigDecimal montoTotal;
    private EstadoCuota estado; 
}