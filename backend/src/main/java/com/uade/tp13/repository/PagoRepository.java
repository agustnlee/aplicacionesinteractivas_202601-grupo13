package com.uade.tp13.repository;

import com.uade.tp13.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByCuota_Credito_Id(Long creditoId);
}