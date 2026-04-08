package com.uade.tp13.service;

import com.uade.tp13.dto.response.CuotaResponse;
import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.mapper.CreditoCuotaMapper;
import com.uade.tp13.repository.CuotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CuotaService {

    private final CuotaRepository cuotaRepository;
    private final CreditoService creditoService;
    private final CreditoCuotaMapper creditoCuotaMapper;

    // Consultas

    // Ver TODOS
    @Transactional(readOnly = true)
    public List<CuotaResponse> obtenerTodas(Long creditoId) {
        creditoService.getOrThrow(creditoId);
        return cuotaRepository.findByCreditoId(creditoId)
                .stream()
                .map(creditoCuotaMapper::cuotaToResponse)
                .toList();
    }

    // Ver PENDIENTE y fecha FUTURA
    @Transactional(readOnly = true)
    public List<CuotaResponse> obtenerPendientes(Long creditoId) {
        creditoService.getOrThrow(creditoId);
        return cuotaRepository
                .findByCreditoIdAndEstadoAndFechaVencimientoGreaterThanEqual(
                creditoId,
                EstadoCuota.PENDIENTE,
                LocalDate.now())
                .stream()
                .map(creditoCuotaMapper::cuotaToResponse)
                .toList();
    }

    
    // Ver Vencidas (estado derivado)
    @Transactional(readOnly = true)
    public List<CuotaResponse> obtenerVencidas(Long creditoId) {
        creditoService.getOrThrow(creditoId);
        return cuotaRepository
                .findByCreditoIdAndEstadoAndFechaVencimientoBefore(
                creditoId, 
                EstadoCuota.PENDIENTE, 
                LocalDate.now())  // fechaVencimiento < hoy 
                .stream()
                .map(creditoCuotaMapper::cuotaToResponse)
                .toList();
    }

    // TODO: Registrar Pago
    
}