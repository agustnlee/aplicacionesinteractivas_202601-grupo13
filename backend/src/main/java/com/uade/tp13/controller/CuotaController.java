package com.uade.tp13.controller;

import com.uade.tp13.dto.response.CuotaResponse;
import com.uade.tp13.service.CuotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/creditos/{creditoId}/cuotas")
@RequiredArgsConstructor
public class CuotaController {

    private final CuotaService cuotaService;

    // GET /api/creditos/{creditoId}/cuotas
    @GetMapping
    public ResponseEntity<List<CuotaResponse>> todas(@PathVariable Long creditoId) {
        return ResponseEntity.ok(cuotaService.obtenerTodas(creditoId));
    }

    // GET /api/creditos/{creditoId}/cuotas/pendientes
    @GetMapping("/pendientes")
    public ResponseEntity<List<CuotaResponse>> pendientes(@PathVariable Long creditoId) {
        return ResponseEntity.ok(cuotaService.obtenerPendientes(creditoId));
    }

    // GET /api/creditos/{creditoId}/cuotas/vencidas
    @GetMapping("/vencidas")
    public ResponseEntity<List<CuotaResponse>> vencidas(@PathVariable Long creditoId) {
        return ResponseEntity.ok(cuotaService.obtenerVencidas(creditoId));
    }

    // TODO: endpoint pago POST /api/creditos/{creditoId}/cuotas/{cuotaId}/pagar o algo por el estilo
    
}