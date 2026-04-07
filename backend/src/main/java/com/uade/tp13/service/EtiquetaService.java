package com.uade.tp13.service;


import java.time.LocalDate;

import org.hibernate.sql.results.NoMoreOutputsException;

import com.uade.tp13.dto.request.EtiquetaRequest;
import com.uade.tp13.dto.request.ModificarEtiquetaRequest;
import com.uade.tp13.dto.response.EtiquetaResponse;
import com.uade.tp13.repository.EtiquetaRepository;
import com.uade.tp13.model.Etiqueta;



 public class EtiquetaService {
    
    private final EtiquetaRepository etiquetaRepository;



    public EtiquetaResponse obtenerEtiquetaId(Long etiquetaId){

    }

    @Transactional

// validacion al crear etiqueta. Si el nombre ya existe
    public Etiqueta crearEtiqueta(EtiquetaRequest request) {
        if (etiquetaRepository.existsByNombreIgnoreCase(request.getNombre())) {
            throw new RuntimeException("Ya existe una etiqueta con ese nombre.");
        }
        Etiqueta etiqueta = Etiqueta.builder()
                .nombre(request.getNombre())
                .color(request.getColor())
                .descripcion(request.getDescripcion())
                .build();
        return etiquetaRepository.save(etiqueta);
    }
 

        public void eliminarEtiquetaDelCatalogo(Long id, boolean forzar) {
        if (!forzar && clienteEtiquetaRepository.existsByEtiquetaId(id)) {
            throw new RuntimeException("La etiqueta tiene clientes asignados. Use la opción de quitar etiquetas primero.");
        }
        if (forzar) {
            clienteEtiquetaRepository.deleteAllByEtiquetaId(id);
        }
        etiquetaRepository.deleteById(id);
    }

}


         
    
