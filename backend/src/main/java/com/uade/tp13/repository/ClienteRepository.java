package com.uade.tp13.repository;
 
import org.springframework.boot.autoconfigure.integration.IntegrationProperties.RSocket.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
 
import com.uade.tp13.model.Cliente;
import com.uade.tp13.model.Usuario;

import java.util.Optional;
 
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Segun las HU Las busquedas son directas o personalizadas
    /*
    HU03 : Como admin y analista, quiero buscar clientes por nombre o DNI,
     para encontrarlos rápidamente sin navegar toda la lista (se va a poder 
     filtrar por “creados por mí” ( y etiquetas adicionalmente, detallado en sección etiquetas).
     Lo que supne una busqueda personalizada, por lo que lo mas optimo decidimos que sera una consulta con Query
     */
    Optional<Cliente> findByDni(String dni);
    boolean existsByDni (String dni);
    Page<Cliente> findByNombre(String nombre, Pageable pageable);
    Page<Cliente> findByEstado(Boolean estado, Pageable pageable);
    Page<Cliente> findByCreadoPorId(Long usuarioId, Pageable pageable);    
    //Consultas personalizadas
    @Query("SELECT c FROM Cliente c WHERE " +
       "(:nombre IS NULL OR LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
       "(:estado IS NULL OR c.estado = :estado) AND " +
       "(:creadoPorId IS NULL OR c.creadoPor.id = :creadoPorId)")
Page<Cliente> findByFiltros(
        @Param("nombre") String nombre,
        @Param("estado") Boolean estado,
        @Param("creadoPorId") Long creadoPorId,
        Pageable pageable
    );
}