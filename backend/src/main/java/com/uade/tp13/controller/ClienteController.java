package com.uade.tp13.controller;
 
import com.uade.tp13.dto.request.ClienteRequest;
import com.uade.tp13.dto.request.ClienteUpdateRequest;
import com.uade.tp13.dto.response.ClienteFichaResponse;
import com.uade.tp13.dto.response.ClienteResponse;
import com.uade.tp13.dto.response.PaginatedResponse;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.service.ClienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

 
@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {
    private final ClienteService clienteService;

    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PostMapping
    public ResponseEntity<ClienteResponse> crearCliente(
        @Valid @RequestBody ClienteRequest request,
        @AuthenticationPrincipal Usuario usuario) {
 
        ClienteResponse response = clienteService.crearCliente(request,  usuario.getId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> editarCliente(
            @PathVariable Long id, 
            @Valid @RequestBody ClienteUpdateRequest request) {
 
        ClienteResponse response = clienteService.editarCliente(id, request);
        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA')")
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Void> alterarEstado(@PathVariable Long id) {
        clienteService.alterarEstado(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')") // Analista y Admin filtro libre, Cobrador solo los suyos
    @GetMapping
    public ResponseEntity<PaginatedResponse<ClienteResponse>> listarClientes(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Boolean estado,
            @RequestParam(required = false) Long creadoPorId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio,
            @AuthenticationPrincipal Usuario usuario
        ) {
        return ResponseEntity.ok(clienteService.buscarClientes(nombre, estado, creadoPorId, pagina, tamanio, usuario));
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')") // Analista y Admin filtro libre, Cobrador solo los suyos
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> busquedaId(@PathVariable Long id, @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(clienteService.busquedaId(id, usuario));
    }
    
    /////

    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')") // Analista y Admin filtro libre, Cobrador solo los suyos
    @GetMapping("/dni/{dni}")
    public ResponseEntity<ClienteResponse> busquedaDni(@PathVariable String dni, @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(clienteService.busquedaDni(dni, usuario));
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')") // Analista y Admin filtro libre, Cobrador solo los suyos
    @GetMapping("/{id}/ficha")
    public ResponseEntity<ClienteFichaResponse> obtenerFichaCliente(@PathVariable Long id, @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(clienteService.clienteFicha(id, usuario));
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')") // Analista y Admin filtro libre, Cobrador solo los suyos
    @GetMapping("/dni/{dni}/ficha")
    public ResponseEntity<ClienteFichaResponse> obtenerFichaClientePorDni(@PathVariable String dni, @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(clienteService.clienteFichaDni(dni, usuario));
    }
}