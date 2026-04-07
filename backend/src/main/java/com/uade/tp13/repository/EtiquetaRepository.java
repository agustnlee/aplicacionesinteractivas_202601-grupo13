package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

import com.uade.tp13.model.Etiqueta;


@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long > {

    Optional <Etiqueta> findByNombre(String Nombre);
    Optional <Etiqueta> findByFechaCreacion(LocalDate FechaCreacion);

    
    boolean existsByNombre(String Nombre);
    boolean existsByEtiquetaId(Long etiquetaId);
     
  
   
   


    

}
