package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

import com.uade.tp13.model.Etiqueta;


@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long > {

    Optional <Etiqueta> findByNombreIgnoreCase(String nombre);
   

    
    boolean existsByNombreIgoneCase(String nombre);
    boolean existsById(Long id);
     
  
   
   


    

}
