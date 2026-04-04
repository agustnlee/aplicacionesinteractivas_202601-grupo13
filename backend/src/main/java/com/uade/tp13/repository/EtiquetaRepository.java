package com.uade.tp13.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tp13.model.Cliente;
import com.uade.tp13.model.Etiqueta;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, long > {

    Optional Binary <Etiqueta> findByNombre(String Nombre);
    
    boolean existsByNombre(String Nombre);
     
  
   
   


    

}
