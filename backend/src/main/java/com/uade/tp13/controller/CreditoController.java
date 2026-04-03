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

    // GET /api/creditos?pagina=0&tamanio=10 (ej)
    @GetMapping
    public ResponseEntity<PaginatedResponse<CreditoResponse>> listar(
            @RequestParam(defaultValue = "0")  int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
        return ResponseEntity.ok(creditoService.listarCreditos(pagina, tamanio));
    }

    // GET /api/creditos/por-estado?estado=ACTIVO&pagina=0&tamanio=10 (ej)
    @GetMapping("/por-estado")
    public ResponseEntity<PaginatedResponse<CreditoResponse>> listarPorEstado(
            @RequestParam EstadoCredito estado,
            @RequestParam(defaultValue = "0")  int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
        return ResponseEntity.ok(creditoService.listarPorEstado(estado, pagina, tamanio));
    }

    // GET /api/creditos/por-cliente/{clienteId}?pagina=0&tamanio=10
    @GetMapping("/por-cliente/{clienteId}")
    public ResponseEntity<PaginatedResponse<CreditoResponse>> listarPorCliente(
            @PathVariable Long clienteId,
            @RequestParam(defaultValue = "0")  int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
        return ResponseEntity.ok(creditoService.listarPorCliente(clienteId, pagina, tamanio));
    }

    // GET /api/creditos/por-cobrador/{cobradorId}?pagina=0&tamanio=10
    @GetMapping("/por-cobrador/{cobradorId}")
    public ResponseEntity<PaginatedResponse<CreditoResponse>> listarPorCobrador(
            @PathVariable Long cobradorId,
            @RequestParam(defaultValue = "0")  int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
        return ResponseEntity.ok(creditoService.listarPorCobrador(cobradorId, pagina, tamanio));
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