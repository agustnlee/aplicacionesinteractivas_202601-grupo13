package com.uade.tp13.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.uade.tp13.model.Etiqueta;


@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long > {

    Optional <Etiqueta> findByNombreIgnoreCase(String nombre);
   

    
    boolean existsByNombreIgnoreCase(String nombre);
    boolean existsById(Long id);

    @Query("SELECT e FROM Etiqueta e WHERE " +
       "(:nombre IS NULL OR LOWER(e.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
       "(:color IS NULL OR LOWER(e.color) LIKE LOWER(CONCAT('%', :color, '%')))")
    Page <Etiqueta> findByFiltros(@Param("nombre") String nombre, @Param("color") String color, Pageable pageable);
     
}
