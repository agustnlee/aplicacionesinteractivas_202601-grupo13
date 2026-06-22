package com.uade.tp13.controller;

import com.uade.tp13.dto.response.MetricasResponse;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.service.MetricasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/metricas")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')")
public class MetricasController {

    private final MetricasService metricasService;

    @PreAuthorize("hasAnyRole('ADMIN', 'ANALISTA', 'COBRADOR')")
    @GetMapping
    public ResponseEntity<MetricasResponse> obtenerMetricas( @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(metricasService.obtenerMetricas(usuario));
    }
}