package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.model.Cuota;

import java.util.List;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {

    List<Cuota> findByCreditoId(Long creditoId);
    List<Cuota> findByCreditoIdAndEstado(Long creditoId, EstadoCuota estado);
    List<Cuota> findByEstado(EstadoCuota estado);

    boolean existsByCreditoIdAndEstado(Long creditoId, EstadoCuota estado); // para chequear si quedan impagas
}   

