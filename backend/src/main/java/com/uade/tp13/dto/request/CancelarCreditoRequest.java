package com.uade.tp13.dto.request;

import com.uade.tp13.enums.EstadoCredito;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CancelarCreditoRequest {
    @NotNull(message = "El tipo de cancelación es obligatorio")
    private EstadoCredito motivoCancelacion;
}