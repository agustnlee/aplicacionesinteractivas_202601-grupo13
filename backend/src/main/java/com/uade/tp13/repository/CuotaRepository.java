package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tp13.model.Cuota;
import com.uade.tp13.model.CuotaId;

import java.util.List;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, CuotaId> {

    List<Cuota> findByIdIdCredito(Long idCredito);
}
