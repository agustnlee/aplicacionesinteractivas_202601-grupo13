package com.uade.tp13.controller;

import com.uade.tp13.dto.request.ClienteEtiquetaRequest;
import com.uade.tp13.dto.response.ClienteEtiquetaResponse;
import com.uade.tp13.dto.response.EtiquetaResumenResponse;
import com.uade.tp13.dto.response.PaginatedResponse;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.service.ClienteEtiquetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes-etiquetas")
@RequiredArgsConstructor
public class ClienteEtiquetaController {

    private final ClienteEtiquetaService clienteEtiquetaService;

    // --- HU45: Asignar etiqueta a cliente ---
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PostMapping("/{clienteId}/etiquetas/{etiquetaId}")
    public ResponseEntity<Void> asignarEtiqueta(
            @PathVariable Long clienteId,
            @PathVariable Long etiquetaId,
            @AuthenticationPrincipal Usuario usuario) { 
        
        // Creamos el Request "on the fly" para pasárselo al Service actual
        ClienteEtiquetaRequest request = new ClienteEtiquetaRequest();
        request.setClienteId(clienteId);
        request.setEtiquetaId(etiquetaId);
        request.setIdUsuarioAsignador(usuario.getId());
        
        clienteEtiquetaService.asignarEtiqueta(request);
        
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
    // --- HU47: Obtener resumen estadístico de etiquetas (Paginado) ---
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/resumen")
    public ResponseEntity<PaginatedResponse<EtiquetaResumenResponse>> obtenerResumenEtiquetas(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
        Pageable pageable = PageRequest.of(pagina, tamanio);
        Page<EtiquetaResumenResponse> page = clienteEtiquetaService.obtenerResumenEtiquetas(pageable);
        return ResponseEntity.ok(toPaginatedResponse(page));
    }

    // --- HU48: Obtener etiquetas asignadas a un cliente específico (Paginado) ---
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')")
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<PaginatedResponse<ClienteEtiquetaResponse>> obtenerEtiquetasPorCliente(
            @PathVariable Long clienteId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
        Pageable pageable = PageRequest.of(pagina, tamanio);
        Page<ClienteEtiquetaResponse> page = clienteEtiquetaService.obtenerEtiquetasPorCliente(clienteId, pageable);
        return ResponseEntity.ok(toPaginatedResponse(page));
    }

    // --- ELIMINAR: Quitar etiqueta de un cliente por el ID de la asignación ---
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @DeleteMapping("/{idAsignacion}")
    public ResponseEntity<Void> eliminarAsignacion(@PathVariable Long idAsignacion) {
        clienteEtiquetaService.eliminarPorId(idAsignacion);
        return ResponseEntity.noContent().build();
    }


    private <T> PaginatedResponse<T> toPaginatedResponse(Page<T> page) {
    return PaginatedResponse.<T>builder()
            .contenido(page.getContent())
            .paginaActual(page.getNumber())
            .totalPaginas(page.getTotalPages())
            .totalElementos(page.getTotalElements())
            .tamanioPagina(page.getSize())
            .esUltima(page.isLast())
            .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')") // solo admin y analista
    @GetMapping("/resumen/{etiquetaId}") 
        public ResponseEntity<Long> contarClientesPorEtiqueta(@PathVariable Long etiquetaId) {
        return ResponseEntity.ok(clienteEtiquetaService.contarPorEtiqueta(etiquetaId));
    }

}