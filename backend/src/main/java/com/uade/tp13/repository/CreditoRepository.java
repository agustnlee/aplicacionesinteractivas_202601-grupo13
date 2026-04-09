package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.model.Credito;
import java.util.Set;

@Repository
public interface CreditoRepository extends JpaRepository<Credito, Long> {


    // para endpoints + Logica interna
    @Query
    ("""
        SELECT c FROM Credito c
        WHERE (:estado IS NULL OR c.estado = :estado)
        AND (:clienteId IS NULL OR c.cliente.id = :clienteId)
        AND (:cobradorId IS NULL OR c.cobrador.id = :cobradorId)
        AND (:creadoPorId IS NULL OR c.creadoPor.id = :creadoPorId)
    """)
    Page<Credito> buscarConFiltros(
            @Param("estado") EstadoCredito estado,
            @Param("clienteId") Long clienteId,
            @Param("cobradorId") Long cobradorId,
            @Param("creadoPorId") Long creadoPorId,
            Pageable pageable
    );

    boolean existsByCliente_IdAndEstadoIn(Long clienteId, Set<EstadoCredito> estados);
    boolean existsByCobrador_IdAndEstadoIn(Long cobradorId, Set<EstadoCredito> estados);
}