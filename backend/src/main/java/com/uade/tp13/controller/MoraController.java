package com.uade.tp13.controller;

import com.uade.tp13.service.impl.MoraService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mora")
@RequiredArgsConstructor
public class MoraController {

    private final MoraService moraService;

    @PostMapping("/forzar/{creditoId}")
    public void forzarMora(@PathVariable Long creditoId) {
        moraService.marcarEnMora(creditoId);
    }
}