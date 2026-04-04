package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import com.uade.tp13.model.Etiqueta;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, String > {

   
    Page<Etiqueta> findByNombre(String nombre, Pageable pageable);
    Page<Etiqueta> findByDescripocion(String descripcion, Pageable pageable);
    Page<Etiqueta> findByColor(String color, Pageable pageable);

    

    List<Etiqueta> findByNombre(String nombre);
   
   


    boolean existsByNombre(String Nombre);

}
