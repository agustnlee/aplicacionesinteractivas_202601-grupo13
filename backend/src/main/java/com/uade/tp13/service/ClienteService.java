package com.uade.tp13.service;

import java.util.List;

import com.uade.tp13.dto.request.ClienteRequest;
import com.uade.tp13.dto.response.ClienteResponse;

public interface ClienteService {

    ClienteResponse crear(ClienteRequest request);

    ClienteResponse buscarPorDni(String dni);

    List<ClienteResponse> listarTodos();
}
