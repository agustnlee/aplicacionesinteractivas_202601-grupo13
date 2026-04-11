package com.uade.tp13.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.model.Credito;
import com.uade.tp13.model.Cuota;
import com.uade.tp13.repository.CreditoRepository;
import com.uade.tp13.repository.CuotaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MoraService {

    private static final BigDecimal TASA_RECARGO_DIARIO = new BigDecimal("0.01");

    private final CreditoRepository creditoRepository;
    private final CuotaRepository cuotaRepository;

    public void evaluarMora(Long creditoId) {
        Credito credito = creditoRepository.findById(creditoId)
                .orElseThrow(() -> new RuntimeException("Credito no encontrado"));

        if (credito.getEstado() == EstadoCredito.CANCELADO
                || credito.getEstado() == EstadoCredito.CANCELADO_REFINANCIACION
                || credito.getEstado() == EstadoCredito.CERRADO) {
            return;
        }

        List<Cuota> vencidas = cuotaRepository
                .findByCreditoIdAndEstadoAndFechaVencimientoBefore(
                        creditoId,
                        EstadoCuota.PENDIENTE,
                        LocalDate.now()
                );

        List<Cuota> pendientes = cuotaRepository
                .findByCreditoIdAndEstado(creditoId, EstadoCuota.PENDIENTE);

        if (!vencidas.isEmpty()) {
            credito.setEstado(EstadoCredito.EN_MORA);
            aplicarRecargo(credito, vencidas);
        } else {
            credito.setEstado(EstadoCredito.ACTIVO);
            limpiarRecargo(pendientes);
        }

        creditoRepository.save(credito);
        cuotaRepository.saveAll(pendientes);
    }

    public void forzarMora(Long creditoId) {
        Credito credito = creditoRepository.findById(creditoId)
                .orElseThrow(() -> new RuntimeException("Credito no encontrado"));

        List<Cuota> pendientes = cuotaRepository
                .findByCreditoIdAndEstado(creditoId, EstadoCuota.PENDIENTE);

        credito.setEstado(EstadoCredito.EN_MORA);

        if (!pendientes.isEmpty()) {
            aplicarRecargoPorFuerza(credito, pendientes);
            cuotaRepository.saveAll(pendientes);
        }

        creditoRepository.save(credito);
    }

    private void aplicarRecargo(Credito credito, List<Cuota> cuotas) {
        for (Cuota cuota : cuotas) {
            long diasVencidos = ChronoUnit.DAYS.between(cuota.getFechaVencimiento(), LocalDate.now());

            if (diasVencidos <= 0) continue; 

            // tasaDiaria = interes% / 7 
            BigDecimal tasaDiaria = credito.getInteres()
                    .divide(new BigDecimal("100"), 10, RoundingMode.HALF_UP)
                    .divide(new BigDecimal("7"), 10, RoundingMode.HALF_UP);

            // recargo = monto_cuota * tasaDiaria * diasVencidos
            BigDecimal recargo = cuota.getMonto()
                    .multiply(tasaDiaria)
                    .multiply(BigDecimal.valueOf(diasVencidos))
                    .setScale(2, RoundingMode.HALF_UP);

            cuota.setMontoRecargo(recargo);
        }
    }


    private void aplicarRecargoPorFuerza(Credito credito, List<Cuota> cuotas) { // solo para testeo
        for (Cuota cuota : cuotas) {
            BigDecimal recargo = cuota.getMonto()
                    .multiply(credito.getInteres())
                    .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
            cuota.setMontoRecargo(recargo);
        }
    }

    private void limpiarRecargo(List<Cuota> cuotas) {
        for (Cuota cuota : cuotas) {
            cuota.setMontoRecargo(BigDecimal.ZERO);
        }
    }
}