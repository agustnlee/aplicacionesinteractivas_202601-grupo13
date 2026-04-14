package com.uade.tp13.controller;

import com.uade.tp13.dto.response.PagoResponse;
import com.uade.tp13.enums.MetodoPago;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    @PostMapping("/registrar/{cuotaId}")
    public ResponseEntity<PagoResponse> realizarPago(
            @PathVariable Long cuotaId, 
            @RequestParam MetodoPago metodo,
            @RequestParam(required = false) String observaciones,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(pagoService.registrarPago(cuotaId, metodo, observaciones, usuario));
    }

    @GetMapping("/credito/{creditoId}")
    public ResponseEntity<List<PagoResponse>> obtenerPagosPorCredito(@PathVariable Long creditoId) {
        return ResponseEntity.ok(pagoService.obtenerPagosPorCredito(creditoId));
    }

    @DeleteMapping("/{pagoId}")
    public ResponseEntity<Void> cancelarPago(@PathVariable Long pagoId) {
        pagoService.cancelarPago(pagoId);
        return ResponseEntity.noContent().build();
    }
}