package com.uade.tp13.service.impl;

import java.math.BigDecimal;
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

    private static final BigDecimal RECARGO_PORCENTAJE = new BigDecimal("0.10");

    private final CreditoRepository creditoRepository;
    private final CuotaRepository cuotaRepository;

    public void evaluarMora(Long creditoId) {
        List<Cuota> vencidas = cuotaRepository
                .findByCreditoIdAndEstadoAndFechaVencimientoBefore(
                        creditoId,
                        EstadoCuota.PENDIENTE,
                        LocalDate.now()
                );

        Credito credito = creditoRepository.findById(creditoId)
                .orElseThrow(() -> new RuntimeException("Credito no encontrado"));

        if (!vencidas.isEmpty()) {
            credito.setEstado(EstadoCredito.EN_MORA);
            aplicarRecargo(vencidas);
        } else {
            credito.setEstado(EstadoCredito.ACTIVO);
        }

        creditoRepository.save(credito);
        cuotaRepository.saveAll(vencidas);
    }

    public void forzarMora(Long creditoId) {
        List<Cuota> pendientes = cuotaRepository
                .findByCreditoIdAndEstado(creditoId, EstadoCuota.PENDIENTE);

        Credito credito = creditoRepository.findById(creditoId)
                .orElseThrow(() -> new RuntimeException("Credito no encontrado"));

        credito.setEstado(EstadoCredito.EN_MORA);
        aplicarRecargo(pendientes);

        creditoRepository.save(credito);
        cuotaRepository.saveAll(pendientes);
    }

    private void aplicarRecargo(List<Cuota> cuotas) {
        for (Cuota cuota : cuotas) {
            BigDecimal recargo = cuota.getMonto().multiply(RECARGO_PORCENTAJE);
            cuota.setMontoRecargo(recargo);
        }
    }
}