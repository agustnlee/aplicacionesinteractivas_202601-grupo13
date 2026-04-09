package com.uade.tp13.service.impl;

import com.uade.tp13.model.*;
import com.uade.tp13.repository.*;
import com.uade.tp13.service.PagoService;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;
    private final CuotaRepository cuotaRepository;

    @Override
    public Pago registrarPago(Long cuotaId, String metodo, String observaciones) {
        Cuota cuota = cuotaRepository.findById(cuotaId)
                .orElseThrow(() -> new RuntimeException("Cuota no encontrada"));
        
        // Lógica: Si pagás, la cuota pasa a PAGADA
        cuota.setEstado(EstadoCuota.PAGADA);
        
        Pago pago = Pago.builder()
                .cuota(cuota)
                .monto(cuota.getMonto())
                .observaciones(observaciones)
                .build();
                
        return pagoRepository.save(pago);
    }

    @Override
    public List<Pago> obtenerPagosPorCredito(Long creditoId) {
        return pagoRepository.findByCuota_Credito_Id(creditoId);
    }

    @Override
    public void cancelarPago(Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId).orElseThrow();
        // Al cancelar, la cuota vuelve a estar PENDIENTE
        pago.getCuota().setEstado(EstadoCuota.PENDIENTE);
        pagoRepository.delete(pago);
    }
}