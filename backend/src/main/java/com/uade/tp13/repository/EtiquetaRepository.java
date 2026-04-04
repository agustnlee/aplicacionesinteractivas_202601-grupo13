package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.uade.tp13.model.Etiqueta;


@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long > {

    Optional Binary <Etiqueta> findByNombre(String Nombre);
    
    boolean existsByNombre(String Nombre);
     
  
   
   


    

}
