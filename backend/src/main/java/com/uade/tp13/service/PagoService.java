package com.uade.tp13.service;

import com.uade.tp13.enums.MetodoPago;
import com.uade.tp13.dto.response.PagoResponse;
import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.model.*;
import com.uade.tp13.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoService {

    private final PagoRepository pagoRepository;
    private final CuotaRepository cuotaRepository;
    private final CreditoService creditoService; 
    private final MoraService moraService; 

    @Transactional
    public PagoResponse registrarPago(Long cuotaId, MetodoPago metodo, String observaciones, Usuario cobrador) {
        Cuota cuota = cuotaRepository.findById(cuotaId)
                .orElseThrow(() -> new RuntimeException("Cuota no encontrada"));

        // 1. Actualizar cuota
        cuota.setEstado(EstadoCuota.PAGADA);
        cuotaRepository.save(cuota);

        // 2. Crear pago
        Pago pago = Pago.builder()
                .cuota(cuota)
                .monto(cuota.getMonto().add(cuota.getMontoRecargo()))
                .metodo(metodo)
                .cobradoPor(cobrador)
                .observaciones(observaciones)
                .build();
        
        Pago pagoGuardado = pagoRepository.save(pago);

        // 3. Control de cierre de crédito
        creditoService.cerrarSiCorresponde(cuota.getCredito().getId());
        
        // 4. Evaluar mora al finalizar el registro
        moraService.evaluarMora(cuota.getCredito().getId());

        return toResponse(pagoGuardado);
    }

    @Transactional(readOnly = true)
    public List<PagoResponse> obtenerPagosPorCredito(Long creditoId) {
        return pagoRepository.findByCuota_Credito_Id(creditoId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void cancelarPago(Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
        
        Cuota cuota = pago.getCuota();
        Long creditoId = cuota.getCredito().getId();
        cuota.setEstado(EstadoCuota.PENDIENTE);
        cuotaRepository.save(cuota); 
        pagoRepository.delete(pago);

        // Evaluar mora al finalizar la cancelación
        moraService.evaluarMora(creditoId);
       
    }
     
    // Helper privado builder para PagoResponse
     private PagoResponse toResponse(Pago pago) {
        return PagoResponse.builder()
                .id(pago.getId())
                .cuotaId(pago.getCuota().getId())
                .numeroCuota(pago.getCuota().getNumeroCuota())
                .monto(pago.getMonto())
                .metodo(pago.getMetodo())
                .cobradoPorNombre(pago.getCobradoPor().getNombre())
                .observaciones(pago.getObservaciones())
                .fechaPagado(pago.getFechaPagado())
                .build();
    }
}
