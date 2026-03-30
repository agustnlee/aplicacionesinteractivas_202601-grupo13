package com.uade.tp13.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.uade.tp13.dto.request.CobranzaRequest;
import com.uade.tp13.dto.response.CobranzaResponse;
import com.uade.tp13.exception.BusinessException;
import com.uade.tp13.exception.ResourceNotFoundException;
import com.uade.tp13.model.Cobranza;
import com.uade.tp13.model.Cuota;
import com.uade.tp13.model.CuotaId;
import com.uade.tp13.repository.CobranzaRepository;
import com.uade.tp13.repository.CuotaRepository;
import com.uade.tp13.service.CobranzaService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CobranzaServiceImpl implements CobranzaService {

    private final CobranzaRepository cobranzaRepository;
    private final CuotaRepository cuotaRepository;

    @Override
    public CobranzaResponse registrar(CobranzaRequest request) {
        CuotaId cuotaId = new CuotaId(request.getIdCredito(), request.getIdCuota());

        Cuota cuota = cuotaRepository.findById(cuotaId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Cuota", "idCredito/idCuota", request.getIdCredito() + "/" + request.getIdCuota()
            ));

        if (cobranzaRepository.existsByCuotaIdIdCreditoAndCuotaIdIdCuota(request.getIdCredito(), request.getIdCuota())) {
            throw new BusinessException(
                "La cuota " + request.getIdCuota() + " del crédito " + request.getIdCredito() + " ya fue pagada"
            );
        }

        Cobranza cobranza = new Cobranza(null, cuota, request.getImporte());
        cobranzaRepository.save(cobranza);
        return toResponse(cobranza);
    }

    @Override
    public List<CobranzaResponse> listarPorCredito(Long idCredito) {
        return cobranzaRepository.findByCuotaIdIdCredito(idCredito).stream()
            .map(this::toResponse)
            .toList();
    }

    private CobranzaResponse toResponse(Cobranza cobranza) {
        return new CobranzaResponse(
            cobranza.getId(),
            cobranza.getCuota().getId().getIdCredito(),
            cobranza.getCuota().getId().getIdCuota(),
            cobranza.getImporte()
        );
    }
}
