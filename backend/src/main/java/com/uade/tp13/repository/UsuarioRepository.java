package com.uade.tp13.repository;
 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.uade.tp13.enums.ROL_USUARIO;
import com.uade.tp13.model.Usuario;
 
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
 
    boolean existsByEmail(String email);
    //REVISAR HU22
    @Query("SELECT u FROM Usuario u WHERE " +
           "(:nombre IS NULL OR LOWER(u.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
           "(:rol IS NULL OR u.rol = :rol) AND " +
           "(:estado IS NULL OR u.estado = :estado)")
    Page<Usuario> buscarUsuariosConFiltro(
            @Param("nombre") String nombre,
            @Param("rol") ROL_USUARIO rol,
            @Param("estado") Boolean estado,
            Pageable pageable
    );
}
 