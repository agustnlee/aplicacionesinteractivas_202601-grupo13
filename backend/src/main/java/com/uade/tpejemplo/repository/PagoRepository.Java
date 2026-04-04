package com.uade.tpejemplo.repository;

import com.uade.tpejemplo.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    // Siguiendo el estilo de búsqueda de Agus:
    List<Pago> findByClienteDni(String dni);
    
    // Esto serviría para ver si un pago específico ya existe (opcional)
    boolean existsById(Long id);
}