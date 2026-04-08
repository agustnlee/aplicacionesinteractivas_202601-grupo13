package com.uade.tp13.controller;

import com.uade.tp13.dto.request.ClienteEtiquetaRequest;
import com.uade.tp13.dto.response.ClienteEtiquetaResponse;
import com.uade.tp13.dto.response.EtiquetaResumenResponse;
import com.uade.tp13.service.ClienteEtiquetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes-etiquetas")
@RequiredArgsConstructor
public class ClienteEtiquetaController {

    private final ClienteEtiquetaService clienteEtiquetaService;

    // --- HU45: Asignar etiqueta a cliente ---
    @PostMapping
    public ResponseEntity<Void> asignarEtiqueta(@Valid @RequestBody ClienteEtiquetaRequest request) {
        clienteEtiquetaService.asignarEtiqueta(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // --- HU47: Obtener resumen estadístico de etiquetas (Paginado) ---
    @GetMapping("/resumen")
    public ResponseEntity<Page<EtiquetaResumenResponse>> obtenerResumenEtiquetas(
            @PageableDefault(size = 10) Pageable pageable) {
        Page<EtiquetaResumenResponse> resumen = clienteEtiquetaService.obtenerResumenEtiquetas(pageable);
        return ResponseEntity.ok(resumen);
    }

    // --- HU48: Obtener etiquetas asignadas a un cliente específico (Paginado) ---
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<Page<ClienteEtiquetaResponse>> obtenerEtiquetasPorCliente(
            @PathVariable Long clienteId,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<ClienteEtiquetaResponse> etiquetasCliente = clienteEtiquetaService.obtenerEtiquetasPorCliente(clienteId, pageable);
        return ResponseEntity.ok(etiquetasCliente);
    }

    // --- ELIMINAR: Quitar etiqueta de un cliente por el ID de la asignación ---
    @DeleteMapping("/{idAsignacion}")
    public ResponseEntity<Void> eliminarAsignacion(@PathVariable Long idAsignacion) {
        clienteEtiquetaService.eliminarPorId(idAsignacion);
        return ResponseEntity.noContent().build();
    }
}