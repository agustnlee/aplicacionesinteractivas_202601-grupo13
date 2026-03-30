package com.uade.tp13.service;

import java.util.List;

import com.uade.tp13.dto.request.CreditoRequest;
import com.uade.tp13.dto.response.CreditoResponse;

public interface CreditoService {

    CreditoResponse crear(CreditoRequest request);

    CreditoResponse buscarPorId(Long id);

    List<CreditoResponse> listarPorCliente(String dniCliente);
}
