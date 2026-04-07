package com.uade.tp13.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.uade.tp13.model.ClienteEtiqueta;

import jakarta.transaction.Transactional;

@Repository
public interface ClienteEtiquetaRepository extends JpaRepository<ClienteEtiqueta, Long> {


    Optional<ClienteEtiqueta> findByClienteDniAndEtiquetaId(String dni, long id);

    long countByEtiquetaId(Long etiquetaId);

    
    void deleteByClienteIdAndEtiquetaId(Long clienteId, Long etiquetaId);
    Page<ClienteEtiqueta> findByEtiquetaId (long etiqueta_id, Pageable pageable);
   //HU47

    Page<ClienteEtiqueta> findByClienteDni(String cliente_dni, Pageable pageable);
    //Hu45


    Page<ClienteEtiqueta> findByAsignadoPorId(long asignado_por_id, Pageable pageable);

    //Hu48

    
 
    boolean existsById(long id);
    boolean existsByEtiquetaId(Long id);
    boolean existsByClienteDniAndEtiquetaId(String dni , Long id);

    @ Modifying// Necesario para queries de actualización/borrado
    @Transactional
    @ Query("DELETE FROM ClienteEtiqueta ce WHERE ce.etiqueta.id = :etiquetaId")
    void deleteAllByEtiquetaId(Long etiquetaId);



}





