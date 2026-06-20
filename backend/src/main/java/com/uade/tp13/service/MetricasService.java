package com.uade.tp13.service;

import com.uade.tp13.dto.response.MetricasResponse;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.enums.ROL_USUARIO;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.repository.CreditoRepository;
import com.uade.tp13.repository.EtiquetaRepository;
import com.uade.tp13.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class MetricasService {

    private final UsuarioRepository usuarioRepository;
    private final CreditoRepository creditoRepository;
    private final EtiquetaRepository etiquetaRepository;

    private static final Set<EstadoCredito> ESTADOS_ACTIVOS = Set.of(
            EstadoCredito.ACTIVO,
            EstadoCredito.EN_MORA
    );

    private static final Set<EstadoCredito> ESTADOS_FINALIZADOS = Set.of(
            EstadoCredito.CERRADO,
            EstadoCredito.CANCELADO,
            EstadoCredito.CANCELADO_REFINANCIACION
    );

    @Transactional(readOnly = true)
    public MetricasResponse obtenerMetricas(Usuario usuarioAutenticado) {
        ROL_USUARIO rol = usuarioAutenticado.getRol();

        long usuariosActivos = usuarioRepository.countByEstado(true);

        long creditosOtorgados;
        long creditosFinalizados;
        long creditosEnMora;
        long cantidadEtiquetas;

        if (rol == ROL_USUARIO.ANALISTA) {
            creditosOtorgados = creditoRepository.countByCreadoPorIdAndEstadoIn( usuarioAutenticado.getId(), ESTADOS_ACTIVOS);
            creditosFinalizados = creditoRepository.countByCreadoPorIdAndEstadoIn( usuarioAutenticado.getId(), ESTADOS_FINALIZADOS);
            creditosEnMora = creditoRepository.countByCreadoPorIdAndEstadoIn( usuarioAutenticado.getId(), Set.of(EstadoCredito.EN_MORA));
            cantidadEtiquetas = etiquetaRepository.count();

        } else if (rol == ROL_USUARIO.COBRADOR) {
            creditosOtorgados = creditoRepository.countByCobradorIdAndEstadoIn( usuarioAutenticado.getId(), ESTADOS_ACTIVOS);
            creditosFinalizados = creditoRepository.countByCobradorIdAndEstadoIn( usuarioAutenticado.getId(), ESTADOS_FINALIZADOS);
            creditosEnMora = creditoRepository.countByCobradorIdAndEstadoIn( usuarioAutenticado.getId(), Set.of(EstadoCredito.EN_MORA));
            cantidadEtiquetas = etiquetaRepository.count();

        } else {
            creditosOtorgados = creditoRepository.countByEstadoIn( ESTADOS_ACTIVOS);
            creditosFinalizados = creditoRepository.countByEstadoIn( ESTADOS_FINALIZADOS);
            creditosEnMora = creditoRepository.countByEstadoIn( Set.of(EstadoCredito.EN_MORA));
            cantidadEtiquetas = etiquetaRepository.count();
        }

        return MetricasResponse.builder()
                .usuariosActivos(usuariosActivos)
                .creditosOtorgados(creditosOtorgados)
                .creditosFinalizados(creditosFinalizados)
                .creditosEnMora(creditosEnMora)
                .cantidadEtiquetas(cantidadEtiquetas)
                .build();
    }
}