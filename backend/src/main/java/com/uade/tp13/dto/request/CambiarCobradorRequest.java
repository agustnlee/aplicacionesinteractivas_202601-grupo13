package com.uade.tp13.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CambiarCobradorRequest {
    @NotNull(message = "El cobrador es obligatorio")
    private Long cobradorId;
}