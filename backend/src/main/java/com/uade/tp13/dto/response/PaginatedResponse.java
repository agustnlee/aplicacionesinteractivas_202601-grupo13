package com.uade.tp13.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class PaginatedResponse<T> {
    private List<T> contenido;
    private int paginaActual;
    private int totalPaginas;
    private long totalElementos;
    private int tamanioPagina;
    private boolean esUltima;
}