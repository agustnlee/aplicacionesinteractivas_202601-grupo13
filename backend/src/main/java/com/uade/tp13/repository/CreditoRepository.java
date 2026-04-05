package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.model.Credito;

import java.util.List;

@Repository
public interface CreditoRepository extends JpaRepository<Credito, Long> {

    // Para endpoints HTTP (Paginados)
    // + findAll Heredado
    Page<Credito> findByEstado(EstadoCredito estado, Pageable pageable);
    Page<Credito> findByClienteId(Long clienteId, Pageable pageable);
    Page<Credito> findByCobradorId(Long cobradorId, Pageable pageable);
    Page<Credito> findByCobradorIdAndEstado(Long cobradorId, EstadoCredito estado, Pageable pageable);
    Page<Credito> findByCreadoPorId(Long creadoPorId, Pageable pageable);

    // Para Validaciones Internas (principalmente mora)
    List<Credito> findByEstado(EstadoCredito estado);
    List<Credito> findByClienteId(Long clienteId);
    List<Credito> findByCobradorId(Long cobradorId);
    List<Credito> findByCobradorIdAndEstado(Long cobradorId, EstadoCredito estado);
    List<Credito> findByCreadoPorId(Long creadoPorId);
    
    boolean existsByClienteIdAndEstadoIn(Long clienteId, List<EstadoCredito> estados); // Busqueda con id cliente y estado, para validar soft delete de cliente (con activos)
}