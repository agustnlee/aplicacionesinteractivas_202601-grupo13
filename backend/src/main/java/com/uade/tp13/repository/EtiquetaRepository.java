package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import com.uade.tp13.model.Etiqueta;

import java.util.List;

@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, String > {

   
    Page<Etiqueta> findByNombre(String Nombre, Pageable pageable);

    List<Etiqueta> findByNombre(String Nombre, Pageable pageable);

    boolean existsByNombre(String Nombre);

}
