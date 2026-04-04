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

    Page<ClientesEtiqueta> findByEtiqueta (String etiqueta_id, Pageable pageable);
    Page<ClientesEtiqueta> findByCliente_id(long cliente_id, Pageable pageable);
    Page<ClientesEtiqueta> findByUsuario(long asignado_por_id, Pageable pageable);


    List<ClientesEtiqueta>findByEtiqueta(String etiqueta_id);
    List<ClientesEtiqueta>findByCliente_id(long cliente_id );
    List<ClientesEtiqueta>findByUsuario(long asignado_por_id);

    boolean existsById(long id);








}





