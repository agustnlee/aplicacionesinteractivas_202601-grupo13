package com.uade.tp13.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.uade.tp13.model.ClientesEtiqueta;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClientesEtiquetaRepository extends JpaRepository<ClientesEtiqueta, long>{

Page<Etiqueta> findByNombre(String nombre, Pageable pageable);
    Page<Etiqueta> Cliente(long Cliente, Pageable pageable);
    Page<Etiqueta> findByColor(String color, Pageable pageable);



}





