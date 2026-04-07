package com.uade.tp13.service;

import org.springframework.stereotype.Service;

import com.uade.tp13.model.Cliente;
import com.uade.tp13.model.ClienteEtiqueta;
import com.uade.tp13.model.Etiqueta;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.repository.ClienteEtiquetaRepository;
import com.uade.tp13.repository.ClienteRepository;
import com.uade.tp13.repository.EtiquetaRepository;
import com.uade.tp13.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class CLienteEtiquetaService {
    private final ClienteEtiquetaRepository clienteEtiquetaRepository;
    private final ClienteRepository clienteRepository;
    private final EtiquetaRepository etiquetaRepository;
    private final UsuarioRepository usuarioRepository;

    // --- CREAR (Asignar Etiqueta) ---
    @Transactional
    public void asignarEtiqueta(ClienteEtiquetaRequest request) {
        // 1. Validar que el cliente exista por DNI
        Cliente cliente = clienteRepository.findByDni(request.getDniCliente())
                .orElseThrow(() -> new RuntimeException("No existe el cliente con DNI: " + request.getDniCliente()));

        // 2. Validar que la etiqueta exista
        Etiqueta etiqueta = etiquetaRepository.findById(request.getEtiquetaId())
                .orElseThrow(() -> new RuntimeException("La etiqueta no existe en el catálogo"));

        Usuario usuario= usuarioRepository.findById(request.getUsuarioId);

        ClienteEtiqueta clienteEtiqueta = clienteEtiquetaRepository.;

        // 3. Validar que no esté ya asignada (Evitar duplicados según uniqueConstraints)
        if (clienteEtiquetaRepository.existsByClienteDniAndEtiquetaId(request.getDniCliente(), request.getEtiquetaId())) {
            throw new RuntimeException("El cliente ya posee esta etiqueta");
        }

        // 4. Crear la relación
        ClienteEtiqueta nuevaAsignacion = ClienteEtiqueta.builder()
                .cliente(cliente)
                .etiqueta(etiqueta)
                .AsignadoPor(usuario)
                .AsignadoEn()
                .build();
        
        // El @PrePersist de ClienteEtiqueta establecerá la fecha AsignadoEn automáticamente
        clienteEtiquetaRepository.save(nuevaAsignacion);
    }

    // --- MODIFICAR (Cambiar una etiqueta por otra para el mismo registro) ---
    @Transactional
    public void modificarAsignacion(Long idAsignacion, Long nuevoEtiquetaId) {
        // 1. Buscar la asignación existente por su ID
        ClienteEtiqueta asignacion = clienteEtiquetaRepository.findById(idAsignacion)
                .orElseThrow(() -> new RuntimeException("La asignación no existe"));

        // 2. Buscar la nueva etiqueta
        Etiqueta nuevaEtiqueta = etiquetaRepository.findById(nuevoEtiquetaId)
                .orElseThrow(() -> new RuntimeException("La nueva etiqueta no existe"));

        // 3. Actualizar
        asignacion.setEtiqueta(nuevaEtiqueta);
        clienteEtiquetaRepository.save(asignacion);
    }

    // --- ELIMINAR (Quitar etiqueta del cliente) ---
    @Transactional
    public void quitarEtiqueta(String dni, Long etiquetaId) {
        // Buscamos la relación específica
        ClienteEtiqueta asignacion = clienteEtiquetaRepository.findByClienteDniAndEtiquetaId(dni, etiquetaId)
                .orElseThrow(() -> new RuntimeException("El cliente no tiene asignada esa etiqueta"));
        
        clienteEtiquetaRepository.delete(asignacion);
    }
    
    // Eliminación por ID directo (más común en tablas de gestión)
    @Transactional
    public void eliminarPorId(Long idAsignacion) {
        if (!clienteEtiquetaRepository.existsById(idAsignacion)) {
            throw new RuntimeException("No se encontró la asignación de etiqueta");
        }
        clienteEtiquetaRepository.deleteById(idAsignacion);
    }
}




   

