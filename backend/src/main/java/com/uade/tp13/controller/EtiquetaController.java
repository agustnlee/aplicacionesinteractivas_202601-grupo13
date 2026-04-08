package com.uade.tp13.controller;

import com.uade.tp13.dto.request.EtiquetaRequest;
import com.uade.tp13.model.Etiqueta;
import com.uade.tp13.service.EtiquetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/etiquetas")
@RequiredArgsConstructor
public class EtiquetaController {

    private final EtiquetaService etiquetaService;

    @PostMapping
    public ResponseEntity<Etiqueta> crearEtiqueta(@Valid @RequestBody EtiquetaRequest request) {
        Etiqueta nuevaEtiqueta = etiquetaService.crearEtiqueta(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaEtiqueta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etiqueta> modificarEtiqueta(
            @PathVariable Long id, 
            @Valid @RequestBody EtiquetaRequest request) {
        Etiqueta etiquetaModificada = etiquetaService.modificarEtiqueta(id, request);
        return ResponseEntity.ok(etiquetaModificada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEtiqueta(
            @PathVariable Long id, 
            @RequestParam(defaultValue = "false") boolean forzar) {
        etiquetaService.eliminarEtiquetaDelCatalogo(id, forzar);
        return ResponseEntity.noContent().build();
    }
}