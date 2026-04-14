package com.uade.tp13.dto.response;

import com.uade.tp13.enums.MetodoPago;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PagoResponse {
    private Long id;
    private Long cuotaId;
    private Integer numeroCuota;
    private BigDecimal monto;
    private MetodoPago metodo;
    private String cobradoPorNombre;
    private String observaciones;
    private LocalDateTime fechaPagado;
}