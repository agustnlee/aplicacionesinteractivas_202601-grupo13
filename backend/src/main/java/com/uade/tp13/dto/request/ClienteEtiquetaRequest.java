package com.uade.tp13.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClienteEtiquetaRequest {
    @NotBlank(message = "El ID del cliente es obligatorio")
    private Long clienteId;

    @NotNull(message = "El ID de la etiqueta es obligatorio")
    private Long etiquetaId;

    @NotNull(message = "El ID del usuario asignador es obligatorio")
    private Long idUsuarioAsignador;
}