package com.uade.tp13.service.impl;
import java.time.LocalDate;
import java.util.List;

import com.uade.tp13.model.Credito;
import com.uade.tp13.model.Cuota;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.repository.CreditoRepository;
import com.uade.tp13.repository.CuotaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MoraService {

    private final CreditoRepository creditoRepository;
    private final CuotaRepository cuotaRepository;

    public void marcarEnMora(Long creditoId) {
        List<Cuota> vencidas = cuotaRepository
            .findByCreditoIdAndEstadoAndFechaVencimientoBefore(
                creditoId,
                EstadoCuota.PENDIENTE,
                LocalDate.now()
            );

        if (!vencidas.isEmpty()) {
            Credito credito = creditoRepository.findById(creditoId)
                .orElseThrow(() -> new RuntimeException("Credito no encontrado"));

            credito.setEstado(EstadoCredito.EN_MORA);
            creditoRepository.save(credito);
        }
    }

    public void normalizarMora(Long creditoId) {
        List<Cuota> vencidas = cuotaRepository
            .findByCreditoIdAndEstadoAndFechaVencimientoBefore(
                creditoId,
                EstadoCuota.PENDIENTE,
                LocalDate.now()
            );

        if (vencidas.isEmpty()) {
            Credito credito = creditoRepository.findById(creditoId)
                .orElseThrow(() -> new RuntimeException("Credito no encontrado"));

            credito.setEstado(EstadoCredito.ACTIVO);
            creditoRepository.save(credito);
        }
    }
}