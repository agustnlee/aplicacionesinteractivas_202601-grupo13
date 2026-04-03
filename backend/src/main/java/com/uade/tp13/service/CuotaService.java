package com.uade.tp13.service;

import com.uade.tp13.dto.response.CuotaResponse;
import com.uade.tp13.enums.EstadoCuota;
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

    // Consultas

    // Ver TODOS
    @Transactional(readOnly = true)
    public List<CuotaResponse> obtenerTodas(Long creditoId) {
        creditoService.getOrThrow(creditoId);
        return cuotaRepository.findByCredito_Id(creditoId)
                .stream()
                .map(creditoService::mapCuotaToResponse)
                .toList();
    }

    // Ver PENDIENTE y fecha FUTURA
    @Transactional(readOnly = true)
    public List<CuotaResponse> obtenerPendientes(Long creditoId) {
        creditoService.getOrThrow(creditoId);
        return cuotaRepository
                .findByCredito_IdAndPagada(creditoId, EstadoCuota.PENDIENTE)
                .stream()
                .filter(c -> !LocalDate.now().isAfter(c.getFechaVencimiento()))
                .map(creditoService::mapCuotaToResponse)
                .toList();
    }

    
    // Ver Vencidas (estado derivado)
    @Transactional(readOnly = true)
    public List<CuotaResponse> obtenerVencidas(Long creditoId) {
        creditoService.getOrThrow(creditoId);
        return cuotaRepository
                .findByCredito_IdAndPagada(creditoId, EstadoCuota.PENDIENTE)
                .stream()
                .filter(c -> LocalDate.now().isAfter(c.getFechaVencimiento()))
                .map(creditoService::mapCuotaToResponse)
                .toList();
    }

    // TODO: Registrar Pago
    
}