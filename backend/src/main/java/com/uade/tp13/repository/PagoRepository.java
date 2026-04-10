package com.uade.tp13.repository;

import com.uade.tp13.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    // Hereda save, findById, etc.
}