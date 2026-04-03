package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.model.Cuota;

import java.util.List;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {

    List<Cuota> findByCredito_Id(Long creditoId);
    List<Cuota> findByCredito_IdAndPagada(Long creditoId, EstadoCuota pagada);
     List<Cuota> findByPagada(EstadoCuota pagada);

    boolean existsByCredito_IdAndPagada(Long creditoId, EstadoCuota pagada); // para chequear si quedan impagas
}   

