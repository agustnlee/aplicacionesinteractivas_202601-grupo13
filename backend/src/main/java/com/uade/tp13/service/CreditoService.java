package com.uade.tp13.service;

import com.uade.tp13.dto.request.*;
import com.uade.tp13.dto.response.*;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.exception.*;
import com.uade.tp13.model.*;
import com.uade.tp13.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CreditoService {

    private final CreditoRepository creditoRepository;
    private final CuotaRepository cuotaRepository;

    // subsets 
    private static final Set<EstadoCredito> ESTADOS_FINALES = Set.of(
            EstadoCredito.CERRADO,
            EstadoCredito.CANCELADO,
            EstadoCredito.CANCELADO_REFINANCIACION
    );

    private static final Set<EstadoCredito> MOTIVOS_CANCELACION_VALIDOS = Set.of(
            EstadoCredito.CANCELADO,
            EstadoCredito.CANCELADO_REFINANCIACION
    );

    
    // Consultas

    public CreditoResponse obtenerCredito(Long creditoId) {
        return mapToResponse(getOrThrow(creditoId));
    }

    // Crear

    public PlanCuotasResponse calcularPlanPreview(CrearCreditoRequest request) {
        List<CuotaResponse> cuotas = buildCuotasPreview(
                request.getMonto(),
                request.getInteres(),
                request.getCantidadCuotas());

        BigDecimal montoPorCuota = cuotas.get(0).getMonto();
        BigDecimal montoTotal = montoPorCuota
                .multiply(BigDecimal.valueOf(request.getCantidadCuotas()));

        return PlanCuotasResponse.builder()
                .cantidadCuotas(request.getCantidadCuotas())
                .montoPorCuota(montoPorCuota)
                .montoTotal(montoTotal)
                .cuotas(cuotas)
                .build();
    }

    // Crear Credito + Crear Plan
    @Transactional
    public CreditoResponse crearCredito(CrearCreditoRequest request) {
        // TODO: validar clienteId existe, ctivo clienteRepository
        // TODO: validar cobradorId existe, activo, COBRADOR usuarioRepository

        Credito credito = Credito.builder()
                .monto(request.getMonto())
                .cantidadCuotas(request.getCantidadCuotas())
                .interes(request.getInteres())
                // TODO: Esperar clinete y susario
                // .cliente(cliente)   
                // .cobrador(cobrador)  
                // .creadoPor(auth)     
                .build();

        credito.setCuotas(buildCuotas(credito,
                request.getMonto(),
                request.getInteres(),
                request.getCantidadCuotas()));

        return mapToResponse(creditoRepository.save(credito));
    }

    // Modificar

    // Cambiar cobrador
    @Transactional
    public CreditoResponse cambiarCobrador(Long creditoId, CambiarCobradorRequest request) {
        Credito credito = getOrThrow(creditoId);

        if (ESTADOS_FINALES.contains(credito.getEstado()))
            throw new CreditoFinalizadoException(credito.getEstado());

        // TODO: validar cobradorId existe activo COBRADOR
        // credito.setCobrador(cobrador);

        return mapToResponse(creditoRepository.save(credito));
    }

    // Cancelar Credito 
    @Transactional
    public CreditoResponse cancelarCredito(Long creditoId, CancelarCreditoRequest request) {
        Credito credito = getOrThrow(creditoId);

        if (!MOTIVOS_CANCELACION_VALIDOS.contains(request.getMotivoCancelacion()))
            throw new IllegalArgumentException("Motivo inválido. Valores permitidos: CANCELADO, CANCELADO_POR_REFINANCIACION");

        if (ESTADOS_FINALES.contains(credito.getEstado()))
            throw new CreditoFinalizadoException(credito.getEstado());

        credito.setEstado(request.getMotivoCancelacion());
        return mapToResponse(creditoRepository.save(credito));
    }

    // Cambios estado interno

    @Transactional
    public void marcarEnMora(Credito credito) {
        credito.setEstado(EstadoCredito.EN_MORA);
        creditoRepository.save(credito);
    }

    @Transactional
    public void normalizarMora(Credito credito) {
        credito.setEstado(EstadoCredito.ACTIVO);
        creditoRepository.save(credito);
    }

    // Cerrar credito automaticamente cuando no quedan cuotas pendientes
    @Transactional
    public void cerrarSiCorresponde(Credito credito) {
        boolean quedanImpagas = cuotaRepository
                .existsByCredito_IdAndPagada(credito.getId(), EstadoCuota.PENDIENTE);
        if (!quedanImpagas) {
            credito.setEstado(EstadoCredito.CERRADO);
            creditoRepository.save(credito);
        }
    }

    // Helpers publicos

    public Credito getOrThrow(Long id) {
        return creditoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException( "Crédito no encontrado con id: " + id));
    }

    CuotaResponse mapCuotaToResponse(Cuota cuota) {
        BigDecimal recargo = cuota.getMontoRecargo() != null ? cuota.getMontoRecargo() : BigDecimal.ZERO;

        // VENCIDA derivada
        EstadoCuota estadoDerivado;
        if (cuota.getPagada() == EstadoCuota.PAGADA) {
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

    @Transactional(readOnly = true)
    public CreditoResponse mapToResponse(Credito c) {
        return CreditoResponse.builder()
                .id(c.getId())
                // TODO: LIberar cuando cliente y cobrador
                // .clienteId(c.getCliente().getId())
                // .clienteNombre(c.getCliente().getNombre())
                // .cobradorId(c.getCobrador().getId())
                // .cobradorNombre(c.getCobrador().getNombre())
                .monto(c.getMonto())
                .cantidadCuotas(c.getCantidadCuotas())
                .interes(c.getInteres())
                .estado(c.getEstado())
                .fechaCreacion(c.getFechaCreacion())
                .cuotas(c.getCuotas().stream()
                        .map(this::mapCuotaToResponse)
                        .toList())
                .build();
    }

    // Builders internos

    private List<Cuota> buildCuotas(Credito credito, BigDecimal monto, BigDecimal interes, int cantidad) {
        BigDecimal montoCuota = calcularMontoCuota(monto, interes, cantidad);
        List<Cuota> cuotas = new ArrayList<>();

        for (int i = 1; i <= cantidad; i++) {
            cuotas.add(Cuota.builder()
                    .credito(credito)
                    .numeroCuota(i)
                    .fechaVencimiento(LocalDate.now().plusDays(7L * i))
                    .monto(montoCuota)
                    .montoRecargo(BigDecimal.ZERO)
                    .pagada(EstadoCuota.PENDIENTE)
                    .build());
        }
        return cuotas;
    }

    private List<CuotaResponse> buildCuotasPreview(BigDecimal monto, BigDecimal interes, int cantidad) {
        BigDecimal montoCuota = calcularMontoCuota(monto, interes, cantidad);
        List<CuotaResponse> cuotas = new ArrayList<>();
        for (int i = 1; i <= cantidad; i++) {
            cuotas.add(CuotaResponse.builder()
                    .numeroCuota(i)
                    .fechaVencimiento(LocalDate.now().plusDays(7L * i))
                    .monto(montoCuota)
                    .montoRecargo(BigDecimal.ZERO)
                    .montoTotal(montoCuota)
                    .estado(EstadoCuota.PENDIENTE)
                    .build());
        }
        return cuotas;
    }

    // Calculos Interes simple: cuota = monto * (1 + tasa/100) / n
    private BigDecimal calcularMontoCuota(BigDecimal monto, BigDecimal interes, int n) {
        BigDecimal factor = BigDecimal.ONE.add(
                interes.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP));
        return monto.multiply(factor)
                .divide(BigDecimal.valueOf(n), 2, RoundingMode.HALF_UP);
    }
}