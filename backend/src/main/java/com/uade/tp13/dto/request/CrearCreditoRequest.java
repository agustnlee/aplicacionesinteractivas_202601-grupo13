package com.uade.tp13.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CrearCreditoRequest {
    @NotNull(message = "El cliente es obligatorio")
    private Long clienteId;

    @NotNull(message = "El cobrador es obligatorio")
    private Long cobradorId;

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "1.0", message = "El monto debe ser mayor a 0")
    private BigDecimal monto;

    @NotNull(message = "La cantidad de cuotas es obligatoria")
    @Min(value = 1, message = "Debe haber al menos 1 cuota")
    @Max(value = 12, message = "No se permiten más de 12 cuotas")
    private Integer cantidadCuotas;

    @NotNull(message = "La tasa de interés es obligatoria")
    @DecimalMin(value = "0.0", inclusive = true, message = "La tasa no puede ser negativa")
    private BigDecimal interes;
}