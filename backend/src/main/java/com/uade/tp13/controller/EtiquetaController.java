package com.uade.tp13.controller;

import com.uade.tp13.dto.request.EtiquetaRequest;
import com.uade.tp13.dto.response.EtiquetaResponse;
import com.uade.tp13.model.Etiqueta;
import com.uade.tp13.service.EtiquetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/etiquetas")
@RequiredArgsConstructor
public class EtiquetaController {

    private final EtiquetaService etiquetaService;

    

    @PostMapping
    
    public ResponseEntity<EtiquetaResponse> crearEtiqueta(@Valid @RequestBody EtiquetaRequest request) {
        Etiqueta nuevaEtiqueta = etiquetaService.crearEtiqueta(request);

        EtiquetaResponse response = EtiquetaResponse.builder()
                .etiquetaId(nuevaEtiqueta.getId())
                .nombreEtiqueta(nuevaEtiqueta.getNombre())
                .colorEtiqueta(nuevaEtiqueta.getColor())
                .descripcionEtiqueta(nuevaEtiqueta.getDescripcion())
                .build();

        
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EtiquetaResponse> modificarEtiqueta(
            @PathVariable Long id, 
            @Valid @RequestBody EtiquetaRequest request) {
        Etiqueta etiquetaModificada = etiquetaService.modificarEtiqueta(id, request);

        EtiquetaResponse response = EtiquetaResponse.builder()
                .etiquetaId(etiquetaModificada.getId())
                .nombreEtiqueta(etiquetaModificada.getNombre())
                .colorEtiqueta(etiquetaModificada.getColor())
                .descripcionEtiqueta(etiquetaModificada.getDescripcion())
                .build();

        

        return ResponseEntity.ok(response);
    }

    // --- GET: Obtener etiqueta por ID ---
@GetMapping("/{id}")
public ResponseEntity<EtiquetaResponse> obtenerEtiquetaPorId(@PathVariable Long id) {
    EtiquetaResponse response = etiquetaService.obtenerEtiquetaPorId(id);
    return ResponseEntity.ok(response);
}

// --- GET: Listar / Buscar etiquetas con filtros opcionales ---
@GetMapping
public ResponseEntity<Page<EtiquetaResponse>> buscarEtiquetas(
        @RequestParam(required = false) String nombre,
        @RequestParam(required = false) String color,
        @PageableDefault(size = 10) Pageable pageable) {
    
    Page<EtiquetaResponse> resultados = etiquetaService.buscarEtiquetas(nombre, color, pageable);
    return ResponseEntity.ok(resultados);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEtiqueta(
            @PathVariable Long id, 
            @RequestParam(defaultValue = "false") boolean forzar) {
        etiquetaService.eliminarEtiquetaDelCatalogo(id, forzar);
        return ResponseEntity.noContent().build();
    }
}