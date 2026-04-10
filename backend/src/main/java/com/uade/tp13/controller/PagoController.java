package com.uade.tp13.controller;

import com.uade.tp13.enums.MetodoPago;
import com.uade.tp13.model.Pago;
import com.uade.tp13.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    @PostMapping("/registrar/{cuotaId}")
    public ResponseEntity<Pago> realizarPago(
            @PathVariable Long cuotaId, 
            @RequestParam MetodoPago metodo,
            @RequestParam Long usuarioId,
            @RequestParam(required = false) String observaciones) {
        return ResponseEntity.ok(pagoService.registrarPago(cuotaId, metodo, observaciones, usuarioId));
    }

    @GetMapping("/credito/{creditoId}")
    public ResponseEntity<List<Pago>> obtenerPagosPorCredito(@PathVariable Long creditoId) {
        return ResponseEntity.ok(pagoService.obtenerPagosPorCredito(creditoId));
    }

    @DeleteMapping("/{pagoId}")
    public ResponseEntity<Void> cancelarPago(@PathVariable Long pagoId) {
        pagoService.cancelarPago(pagoId);
        return ResponseEntity.noContent().build();
    }
}