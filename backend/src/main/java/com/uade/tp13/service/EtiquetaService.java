package com.uade.tp13.service;


import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.uade.tp13.dto.request.EtiquetaRequest;

import com.uade.tp13.dto.response.EtiquetaResponse;
import com.uade.tp13.repository.ClienteEtiquetaRepository;
import com.uade.tp13.repository.EtiquetaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import com.uade.tp13.model.Etiqueta;


@Service
@RequiredArgsConstructor
 public class EtiquetaService {
    
    private final EtiquetaRepository etiquetaRepository;
    private final ClienteEtiquetaRepository clienteEtiquetaRepository;



   

    @Transactional

// validacion al crear etiqueta. Si el nombre ya existe
    public Etiqueta crearEtiqueta(EtiquetaRequest request) {
        if (etiquetaRepository.existsByNombreIgnoreCase(request.getNombreEtiqueta())) {
            throw new RuntimeException("Ya existe una etiqueta con ese nombre.");
        }

        String nombre= request.getNombreEtiqueta();
        nombre.toLowerCase().trim();
        Etiqueta etiqueta = Etiqueta.builder()
                .nombre(nombre)
                .color(request.getColorEtiqueta())
                .descripcion(request.getDescripcionEtiqueta())
                .build();
        return etiquetaRepository.save(etiqueta);}

        @Transactional
    public Etiqueta modificarEtiqueta(Long id, EtiquetaRequest request) {
    // 1. Buscar la etiqueta existente
    Etiqueta etiqueta = etiquetaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Etiqueta no encontrada con el ID: " + id));

    // 2. Validar integridad del catálogo (HU43)
    // Si el nombre está cambiando, verificamos que el nuevo no exista ya en otra etiqueta
    if (!etiqueta.getNombre().equalsIgnoreCase(request.getNombreEtiqueta()) && 
        etiquetaRepository.existsByNombreIgnoreCase(request.getNombreEtiqueta())) {
        throw new RuntimeException("No se puede renombrar: ya existe otra etiqueta llamada " + request.getNombreEtiqueta());
    }

    // 3. Actualizar los campos (HU40)
    etiqueta.setNombre(request.getNombreEtiqueta());
    etiqueta.setColor(request.getColorEtiqueta());
    etiqueta.setDescripcion(request.getDescripcionEtiqueta());
    
    
    
   
    return  etiquetaRepository.save(etiqueta);}
 

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


         
    
