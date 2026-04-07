package com.uade.tp13.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.uade.tp13.dto.request.ClienteEtiquetaRequest;
import com.uade.tp13.dto.response.ClienteEtiquetaResponse;
import com.uade.tp13.dto.response.EtiquetaResumenResponse;
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
    // 1. Validar Cliente
    Cliente cliente = clienteRepository.findByDni(request.getDniCliente())
            .orElseThrow(() -> new RuntimeException("No existe el cliente con DNI: " + request.getDniCliente()));

    // 2. Validar Etiqueta
    Etiqueta etiqueta = etiquetaRepository.findById(request.getEtiquetaId())
            .orElseThrow(() -> new RuntimeException("La etiqueta no existe"));

    // 3. Validar Usuario (Asignador)
    Usuario usuario = usuarioRepository.findById(request.getIdUsuarioAsignador())
            .orElseThrow(() -> new RuntimeException("Usuario asignador no encontrado"));

    // 4. Validar Duplicado
    if (clienteEtiquetaRepository.existsByClienteDniAndEtiquetaId(cliente.getDni(), etiqueta.getId())) {
        throw new RuntimeException("El cliente ya tiene asignada esta etiqueta");
    }

    // 5. Crear y persistir
    ClienteEtiqueta nuevaAsignacion = ClienteEtiqueta.builder()
            .cliente(cliente)
            .etiqueta(etiqueta)
            .AsignadoPor(usuario) // <--- Aquí vinculamos al usuario
            // No seteamos AsignadoEn porque lo hace el @PrePersist de la entidad
            .build();
    
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

public Page<EtiquetaResumenResponse> obtenerResumenEtiquetas(Pageable pageable) {
        // Pagina sobre el catálogo de etiquetas
        Page<Etiqueta> etiquetas = etiquetaRepository.findAll(pageable);

        return etiquetas.map(etiqueta -> {
            long cantidad = clienteEtiquetaRepository.countByEtiquetaId(etiqueta.getId());
            
            return EtiquetaResumenResponse.builder()
                    .nombreEtiqueta(etiqueta.getNombre())
                    .colorEtiqueta(etiqueta.getColor())
                    .cantidadClientes(cantidad)
                    .build();
        });
    }

    // --- HU48: Listar etiquetas por cliente (Paginado con Trazabilidad) ---
    public Page<ClienteEtiquetaResponse> obtenerEtiquetasPorCliente(String dni, Pageable pageable) {
        Page<ClienteEtiqueta> asignaciones = clienteEtiquetaRepository.findByClienteDni(dni, pageable);
        
        return asignaciones.map(this::mapToResponse);
    }

    //
    private ClienteEtiquetaResponse mapToResponse(ClienteEtiqueta ce) {
        return ClienteEtiquetaResponse.builder()
                .etiquetaId(ce.getEtiqueta().getId())
                .clienteDni(ce.getCliente().getDni()) 
                .asignadoPorId(ce.getAsignadoPor().getId())
                .asignadoEn(ce.getAsignadoEn())// Usamos el ID de la relación ManyToOne
                .build();

    
    }



}




   

