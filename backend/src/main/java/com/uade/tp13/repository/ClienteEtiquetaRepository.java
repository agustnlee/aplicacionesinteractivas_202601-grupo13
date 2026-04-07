package com.uade.tp13.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.uade.tp13.model.ClienteEtiqueta;

@Repository
public interface ClienteEtiquetaRepository extends JpaRepository<ClienteEtiqueta, Long> {


    

    
    void deleteByClienteIdAndEtiquetaId(Long clienteId, Long etiquetaId);
    Page<ClienteEtiqueta> findByEtiquetaId (long etiqueta_id, Pageable pageable);
   //HU47

    Page<ClienteEtiqueta> findByClienteId(long cliente_id, Pageable pageable);
    //Hu45


    Page<ClienteEtiqueta> findByAsignadoPorId(long asignado_por_id, Pageable pageable);
    //Hu48
 
    boolean existsById(long id);

    @ Modifying// Necesario para queries de actualización/borrado
    @ Query("DELETE FROM ClienteEtiqueta ce WHERE ce.etiqueta.id = :etiquetaId")
    void deleteAllByEtiquetaId(Long etiquetaId);

    

}





