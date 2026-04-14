package com.uade.tp13.repository;

import com.uade.tp13.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByCuota_Credito_Id(Long creditoId);

    @Modifying
    @Query("DELETE FROM Pago p WHERE p.id = :pagoId")
    void deleteByIdDirecto(@Param("pagoId") Long pagoId);
}