package com.uade.tp13.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class PlanCuotasResponse {
    private BigDecimal montoTotal;
    private BigDecimal montoPorCuota;
    private Integer cantidadCuotas;
    private List<CuotaResponse> cuotas;
}