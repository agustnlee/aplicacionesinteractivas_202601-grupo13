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


    Optional<ClienteEtiqueta> findByClienteIdAndEtiquetaId(Long clienteId, long etiquetaId);

    long countByEtiquetaId(Long etiquetaId);

    
    void deleteByClienteIdAndEtiquetaId(Long clienteId, Long etiquetaId);
    Page<ClienteEtiqueta> findByEtiquetaId (long etiquetaId, Pageable pageable);
   //HU47

    Page<ClienteEtiqueta> findByClienteId(Long clienteId, Pageable pageable);
    //Hu45


    Page<ClienteEtiqueta> findByAsignadoPorId(long asignadoPorId, Pageable pageable);

    //Hu48

    
 
    boolean existsById(long id);
    boolean existsByEtiquetaId(Long etiquetaId);
    boolean existsByClienteIdAndEtiquetaId(Long clienteId, Long etiquetaId);

    @ Modifying// Necesario para queries de actualización/borrado
    @Transactional
    @ Query("DELETE FROM ClienteEtiqueta ce WHERE ce.etiqueta.id = :etiquetaId")
    void deleteAllByEtiquetaId(Long etiquetaId);



}





