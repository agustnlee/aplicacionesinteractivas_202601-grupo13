package com.uade.tp13.service;

import com.uade.tp13.enums.MetodoPago;
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
    private final UsuarioRepository usuarioRepository; 

    @Transactional
    public Pago registrarPago(Long cuotaId, MetodoPago metodo, String observaciones, Long usuarioId) {
        Cuota cuota = cuotaRepository.findById(cuotaId)
                .orElseThrow(() -> new RuntimeException("Cuota no encontrada"));
        
        Usuario cobrador = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario cobrador no encontrado"));

        // Actualizar cuota
        cuota.setEstado(EstadoCuota.PAGADA);
        cuotaRepository.save(cuota);

        // Crear pago con el Builder respetando el monto + recargo
        Pago pago = Pago.builder()
                .cuota(cuota)
                .monto(cuota.getMonto().add(cuota.getMontoRecargo()))
                .metodo(metodo)
                .cobradoPor(cobrador)
                .observaciones(observaciones)
                .build();
        
        Pago pagoGuardado = pagoRepository.save(pago);

        // Control automático de cierre de crédito
        creditoService.cerrarSiCorresponde(cuota.getCredito());

        return pagoGuardado;
    }

    public List<Pago> obtenerPagosPorCredito(Long creditoId) {
        return pagoRepository.findByCuota_Credito_Id(creditoId);
    }

    @Transactional
    public void cancelarPago(Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
        
        Cuota cuota = pago.getCuota();
        cuota.setEstado(EstadoCuota.PENDIENTE);
        cuotaRepository.save(cuota); 
        
        pagoRepository.delete(pago);
        
        // Al cancelar, verificamos si el crédito debe volver a estado ACTIVO si estaba CERRADO
       
    }
}