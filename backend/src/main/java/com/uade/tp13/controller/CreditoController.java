package com.uade.tp13.controller;

import com.uade.tp13.dto.request.*;
import com.uade.tp13.dto.response.*;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.service.CreditoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/creditos")
@RequiredArgsConstructor
public class CreditoController {

    private final CreditoService creditoService;

    // GET /api/creditos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<CreditoResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(creditoService.obtenerCredito(id));
    }

    // GET /api/creditos?estado=&clienteId=&cobradorId=&creadoPorId=&pagina=&tamanio=
    @GetMapping
    public ResponseEntity<PaginatedResponse<CreditoResponse>> listar(
            @RequestParam(required = false) EstadoCredito estado,
            @RequestParam(required = false) Long clienteId,
            @RequestParam(required = false) Long cobradorId,
            @RequestParam(required = false) Long creadoPorId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio
    ) {
        return ResponseEntity.ok(
                creditoService.listarConFiltros(estado, clienteId, cobradorId, creadoPorId, pagina, tamanio)
        );
    }


    // POST /api/creditos/preview
    @PostMapping("/preview")
    public ResponseEntity<PlanCuotasResponse> preview(
            @Valid @RequestBody CrearCreditoRequest request) {
        return ResponseEntity.ok(creditoService.calcularPlanPreview(request));
    }

    // POST /api/creditos
    @PostMapping
    public ResponseEntity<CreditoResponse> crear(
            @Valid @RequestBody CrearCreditoRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(creditoService.crearCredito(request));
    }

    // PATCH /api/creditos/{id}/cobrador
    @PatchMapping("/{id}/cobrador")
    public ResponseEntity<CreditoResponse> cambiarCobrador(
            @PathVariable Long id,
            @Valid @RequestBody CambiarCobradorRequest request) {
        return ResponseEntity.ok(creditoService.cambiarCobrador(id, request));
    }

    // PATCH /api/creditos/{id}/cancelar
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<CreditoResponse> cancelar(
            @PathVariable Long id,
            @Valid @RequestBody CancelarCreditoRequest request) {
        return ResponseEntity.ok(creditoService.cancelarCredito(id, request));
    }
}