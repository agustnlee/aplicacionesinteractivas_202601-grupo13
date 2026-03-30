package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tp13.model.Cobranza;

import java.util.List;

@Repository
public interface CobranzaRepository extends JpaRepository<Cobranza, Long> {

    List<Cobranza> findByCuotaIdIdCredito(Long idCredito);

    boolean existsByCuotaIdIdCreditoAndCuotaIdIdCuota(Long idCredito, Integer idCuota);
}
