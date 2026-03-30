package com.uade.tp13.service;

import java.util.List;

import com.uade.tp13.dto.request.CobranzaRequest;
import com.uade.tp13.dto.response.CobranzaResponse;

public interface CobranzaService {

    CobranzaResponse registrar(CobranzaRequest request);

    List<CobranzaResponse> listarPorCredito(Long idCredito);
}
