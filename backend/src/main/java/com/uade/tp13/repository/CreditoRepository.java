package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.model.Credito;

import java.util.List;

@Repository
public interface CreditoRepository extends JpaRepository<Credito, Long> {

    List<Credito> findByEstado(EstadoCredito estado);
    List<Credito> findByCliente_Id(Long clienteId);
    List<Credito> findByCobrador_Id(Long cobradorId);
    List<Credito> findByCobrador_IdAndEstado(Long cobradorId, EstadoCredito estado);
    List<Credito> findByCreadoPorId(Long creadoPorId);
    
    boolean existsByCliente_IdAndEstadoIn(Long clienteId, List<EstadoCredito> estados); // Busqueda con id cliente y estado, para validar soft delete de cliente (con activos)
}