package com.uade.tp13.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.uade.tp13.dto.request.ClienteRequest;
import com.uade.tp13.dto.response.ClienteResponse;
import com.uade.tp13.exception.BusinessException;
import com.uade.tp13.exception.ResourceNotFoundException;
import com.uade.tp13.model.Cliente;
import com.uade.tp13.repository.ClienteRepository;
import com.uade.tp13.service.ClienteService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    @Override
    public ClienteResponse crear(ClienteRequest request) {
        if (clienteRepository.existsByDni(request.getDni())) {
            throw new BusinessException("Ya existe un cliente con DNI: " + request.getDni());
        }
        Cliente cliente = new Cliente(request.getDni(), request.getNombre(), null);
        clienteRepository.save(cliente);
        return toResponse(cliente);
    }

    @Override
    public ClienteResponse buscarPorDni(String dni) {
        Cliente cliente = clienteRepository.findByDni(dni)
            .orElseThrow(() -> new ResourceNotFoundException("Cliente", "DNI", dni));
        return toResponse(cliente);
    }

    @Override
    public List<ClienteResponse> listarTodos() {
        return clienteRepository.findAll().stream()
            .map(this::toResponse)
            .toList();
    }

    private ClienteResponse toResponse(Cliente cliente) {
        return new ClienteResponse(cliente.getDni(), cliente.getNombre());
    }
}
