package com.uade.tp13.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tp13.dto.request.CreditoRequest;
import com.uade.tp13.dto.response.CreditoResponse;
import com.uade.tp13.dto.response.CuotaResponse;
import com.uade.tp13.exception.ResourceNotFoundException;
import com.uade.tp13.model.Cliente;
import com.uade.tp13.model.Credito;
import com.uade.tp13.model.Cuota;
import com.uade.tp13.model.CuotaId;
import com.uade.tp13.repository.ClienteRepository;
import com.uade.tp13.repository.CobranzaRepository;
import com.uade.tp13.repository.CreditoRepository;
import com.uade.tp13.repository.CuotaRepository;
import com.uade.tp13.service.CreditoService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditoServiceImpl implements CreditoService {

    private final CreditoRepository creditoRepository;
    private final ClienteRepository clienteRepository;
    private final CuotaRepository cuotaRepository;
    private final CobranzaRepository cobranzaRepository;

    @Override
    @Transactional
    public CreditoResponse crear(CreditoRequest request) {
        Cliente cliente = clienteRepository.findByDni(request.getDniCliente())
            .orElseThrow(() -> new ResourceNotFoundException("Cliente", "DNI", request.getDniCliente()));

        Credito credito = new Credito(
            null,
            cliente,
            request.getDeudaOriginal(),
            request.getFecha(),
            request.getImporteCuota(),
            request.getCantidadCuotas(),
            null
        );
        creditoRepository.save(credito);

        // Generar cuotas automáticamente con vencimiento mensual
        List<Cuota> cuotas = new ArrayList<>();
        for (int i = 1; i <= request.getCantidadCuotas(); i++) {
            Cuota cuota = new Cuota(
                new CuotaId(credito.getId(), i),
                credito,
                request.getFecha().plusMonths(i)
            );
            cuotas.add(cuota);
        }
        cuotaRepository.saveAll(cuotas);

        return toResponse(credito, cuotas);
    }

    @Override
    public CreditoResponse buscarPorId(Long id) {
        Credito credito = creditoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Crédito", "id", id));
        List<Cuota> cuotas = cuotaRepository.findByIdIdCredito(id);
        return toResponse(credito, cuotas);
    }

    @Override
    public List<CreditoResponse> listarPorCliente(String dniCliente) {
        if (!clienteRepository.existsByDni(dniCliente)) {
            throw new ResourceNotFoundException("Cliente", "DNI", dniCliente);
        }
        return creditoRepository.findByClienteDni(dniCliente).stream()
            .map(c -> toResponse(c, cuotaRepository.findByIdIdCredito(c.getId())))
            .toList();
    }

    private CreditoResponse toResponse(Credito credito, List<Cuota> cuotas) {
        List<CuotaResponse> cuotasResponse = cuotas.stream()
            .map(c -> new CuotaResponse(
                c.getId().getIdCredito(),
                c.getId().getIdCuota(),
                c.getFechaVencimiento(),
                cobranzaRepository.existsByCuotaIdIdCreditoAndCuotaIdIdCuota(
                    c.getId().getIdCredito(), c.getId().getIdCuota()
                )
            ))
            .toList();

        return new CreditoResponse(
            credito.getId(),
            credito.getCliente().getDni(),
            credito.getCliente().getNombre(),
            credito.getDeudaOriginal(),
            credito.getFecha(),
            credito.getImporteCuota(),
            credito.getCantidadCuotas(),
            cuotasResponse
        );
    }
}
