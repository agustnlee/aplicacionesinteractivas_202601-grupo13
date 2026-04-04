package com.uade.tp13.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.uade.tp13.model.ClientesEtiqueta;

@Repository
public interface ClientesEtiquetaRepository extends JpaRepository<ClientesEtiqueta, Long> {

    Page<ClientesEtiqueta> findByEtiquetaId (long etiqueta_id, Pageable pageable);
   //HU47

    Page<ClientesEtiqueta> findByClienteId(long cliente_id, Pageable pageable);
    //Hu45


    Page<ClientesEtiqueta> findByAsignadoPorId(long asignado_por_id, Pageable pageable);
    //Hu48
 
    boolean existsById(long id);
}





