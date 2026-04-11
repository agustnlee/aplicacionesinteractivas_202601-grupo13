package com.uade.tp13.scheduler;

import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.model.Credito;
import com.uade.tp13.repository.CreditoRepository;
import com.uade.tp13.service.MoraService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.Scheduled;

@Component
@RequiredArgsConstructor
public class MoraScheduler {

    private static final int PAGE_SIZE = 50;

    private final CreditoRepository creditoRepository;
    private final MoraService moraService;

    @Scheduled(cron = "0 0 0 * * *")
    public void evaluarMoraDiaria() {
        int page = 0;
        Page<Credito> creditosPage;

        do {
            creditosPage = creditoRepository.findByEstado(
                    EstadoCredito.ACTIVO,
                    PageRequest.of(page, PAGE_SIZE)
            );

            for (Credito credito : creditosPage.getContent()) {
                moraService.evaluarMora(credito.getId());
            }

            page++;
        } while (creditosPage.hasNext());
    }
}