package com.uade.tp13.controller;

import com.uade.tp13.dto.request.*;
import com.uade.tp13.dto.response.*;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.service.CreditoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/creditos")
@RequiredArgsConstructor
public class CreditoController {

    private final CreditoService creditoService;

    // GET /api/creditos/{id}
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')")
    @GetMapping("/{id}")
    public ResponseEntity<CreditoResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(creditoService.obtenerCredito(id));
    }

    // GET /api/creditos?estado=&clienteId=&cobradorId=&creadoPorId=&pagina=&tamanio=
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')")
    @GetMapping
    public ResponseEntity<PaginatedResponse<CreditoResponse>> listar(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) EstadoCredito estado,
            @RequestParam(required = false) Long clienteId,
            @RequestParam(required = false) Long cobradorId,
            @RequestParam(required = false) Long creadoPorId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio
    ) {
        return ResponseEntity.ok(
                creditoService.listarConFiltros(id, estado, clienteId, cobradorId, creadoPorId, pagina, tamanio)
        );
    }


    // POST /api/creditos/preview
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')")
    @PostMapping("/preview")
    public ResponseEntity<PlanCuotasResponse> preview(
            @Valid @RequestBody CrearCreditoRequest request) {
        return ResponseEntity.ok(creditoService.calcularPlanPreview(request));
    }

    // POST /api/creditos
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PostMapping
    public ResponseEntity<CreditoResponse> crear(
            @Valid @RequestBody CrearCreditoRequest request, @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(creditoService.crearCredito(request, usuario));
    }

    // PATCH /api/creditos/{id}/cobrador
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PatchMapping("/{id}/cobrador")
    public ResponseEntity<CreditoResponse> cambiarCobrador(
            @PathVariable Long id,
            @Valid @RequestBody CambiarCobradorRequest request) {
        return ResponseEntity.ok(creditoService.cambiarCobrador(id, request));
    }

    // PATCH /api/creditos/{id}/cancelar
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<CreditoResponse> cancelar(
            @PathVariable Long id,
            @Valid @RequestBody CancelarCreditoRequest request) {
        return ResponseEntity.ok(creditoService.cancelarCredito(id, request));
    }
}