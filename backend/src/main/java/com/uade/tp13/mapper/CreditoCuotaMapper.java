package com.uade.tp13.mapper;

import com.uade.tp13.dto.response.CreditoResponse;
import com.uade.tp13.dto.response.CuotaResponse;
import com.uade.tp13.dto.response.PaginatedResponse;
import com.uade.tp13.model.Credito;
import com.uade.tp13.model.Cuota;
import com.uade.tp13.enums.EstadoCuota;
import org.springframework.stereotype.Component;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class CreditoCuotaMapper {

    public CreditoResponse creditoToResponse(Credito c) {
        return CreditoResponse.builder()
                .id(c.getId())
                .clienteId(c.getCliente().getId())
                .clienteNombre(c.getCliente().getNombre())
                .cobradorId(c.getCobrador().getId())
                .cobradorNombre(c.getCobrador().getNombre())
                .monto(c.getMonto())
                .cantidadCuotas(c.getCantidadCuotas())
                .interes(c.getInteres())
                .estado(c.getEstado())
                .fechaCreacion(c.getFechaCreacion())
                .cuotas(c.getCuotas().stream()
                        .map(this::cuotaToResponse)
                        .toList())
                .build();
    }

    public CuotaResponse cuotaToResponse(Cuota cuota) {
        BigDecimal recargo = cuota.getMontoRecargo() != null ? cuota.getMontoRecargo() : BigDecimal.ZERO;

        EstadoCuota estadoDerivado;
        if (cuota.getEstado() == EstadoCuota.PAGADA) {
            estadoDerivado = EstadoCuota.PAGADA;
        } else if (LocalDate.now().isAfter(cuota.getFechaVencimiento())) {
            estadoDerivado = EstadoCuota.VENCIDA;
        } else {
            estadoDerivado = EstadoCuota.PENDIENTE;
        }

        return CuotaResponse.builder()
                .id(cuota.getId())
                .numeroCuota(cuota.getNumeroCuota())
                .fechaVencimiento(cuota.getFechaVencimiento())
                .monto(cuota.getMonto())
                .montoRecargo(recargo)
                .montoTotal(cuota.getMonto().add(recargo))
                .estado(estadoDerivado)
                .build();
    }

    public PaginatedResponse<CreditoResponse> creditoToPageResponse(Page<Credito> page) {
        return PaginatedResponse.<CreditoResponse>builder()
                .contenido(page.getContent().stream()
                        .map(this::creditoToResponse)
                        .toList())
                .paginaActual(page.getNumber())
                .totalPaginas(page.getTotalPages())
                .totalElementos(page.getTotalElements())
                .tamanioPagina(page.getSize())
                .esUltima(page.isLast())
                .build();
    }
}