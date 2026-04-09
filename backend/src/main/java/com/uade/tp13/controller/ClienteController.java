package com.uade.tp13.controller;
 
import com.uade.tp13.dto.request.ClienteRequest;
import com.uade.tp13.dto.request.ClienteUpdateRequest;
import com.uade.tp13.dto.response.ClienteFichaResponse;
import com.uade.tp13.dto.response.ClienteResponse;
import com.uade.tp13.dto.response.PaginatedResponse;
import com.uade.tp13.service.ClienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

 
@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {
    private final ClienteService clienteService;
    @PostMapping
    public ResponseEntity<ClienteResponse> crearCliente(
        @Valid @RequestBody ClienteRequest request,
        @RequestParam(required = false) Long id) {
 
        ClienteResponse response = clienteService.crearCliente(request, id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
 
    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> editarCliente(
            @PathVariable Long id, 
            @Valid @RequestBody ClienteUpdateRequest request) {
 
        ClienteResponse response = clienteService.editarCliente(id, request);
        return ResponseEntity.ok(response);
    }
 
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Void> alterarEstado(@PathVariable Long id) {
        clienteService.alterarEstado(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<ClienteResponse>> listarClientes(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Boolean estado,
            @RequestParam(required = false) Long creadoPorId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio) {
 
        return ResponseEntity.ok(clienteService.buscarClientes(nombre, estado, creadoPorId, pagina, tamanio));
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> busquedaId(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.busquedaId(id));
    }
 
    @GetMapping("/dni/{dni}")
    public ResponseEntity<ClienteResponse> busquedaDni(@PathVariable String dni) {
        return ResponseEntity.ok(clienteService.busquedaDni(dni));
    }
    //PENDIENTE
    @GetMapping("/{id}/ficha")
    public ResponseEntity<ClienteFichaResponse> obtenerFichaCliente(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.clienteFicha(id));
    }
 
    @GetMapping("/dni/{dni}/ficha")
    public ResponseEntity<ClienteFichaResponse> obtenerFichaClientePorDni(@PathVariable String dni) {
        return ResponseEntity.ok(clienteService.clienteFichaDni(dni));
    }
}