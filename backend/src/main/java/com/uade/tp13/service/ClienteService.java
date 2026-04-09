package com.uade.tp13.service;
 
import com.uade.tp13.dto.request.*;
import com.uade.tp13.dto.response.*;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.exception.*;
import com.uade.tp13.model.*;
import com.uade.tp13.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
 
@Service
@RequiredArgsConstructor
public class ClienteService {
 
    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final CreditoRepository creditoRepository;
    private final ClienteEtiquetaRepository clienteEtiquetaRepository;
 
    private static final Set<EstadoCredito> estadosCreditoInvalido = Set.of(
            EstadoCredito.ACTIVO,
            EstadoCredito.EN_MORA
    );
   
    //BusquedasDirecta
    @Transactional(readOnly = true)
    public ClienteResponse busquedaId(Long clienteId) {
        return mapToResponseBasico(getOrThrow(clienteId));
    }
 
    @Transactional(readOnly = true)
    public ClienteResponse busquedaDni(String dni) {
        Cliente cliente = clienteRepository.findByDni(dni)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró cliente con DNI: " + dni));
        return mapToResponseBasico(cliente);
    }
 
    @Transactional(readOnly = true)
    public PaginatedResponse<ClienteResponse> buscarClientes(String nombre, Boolean estado, Long creadoPorId, int p, int s) {
        String nombreLimpio = (nombre != null && !nombre.isBlank()) ? nombre : null;        
        Pageable pageable = buildPageable(p, s);
       
        Page<Cliente> page = clienteRepository.findByFiltros(nombreLimpio, estado, creadoPorId, pageable);
        return mapToPageResponseBasico(page);
    }
 
    @Transactional
    public ClienteResponse crearCliente(ClienteRequest request, Long usuarioCreadorId) {
        if (clienteRepository.existsByDni(request.getDni())) {
            throw new ConflictException("Ya existe un cliente con DNI: " + request.getDni());
        }
        Usuario creador = usuarioRepository.findById(usuarioCreadorId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario creador no encontrado."));
 
        Cliente cliente = Cliente.builder()
                .nombre(request.getNombre())
                .dni(request.getDni())
                .email(request.getEmail())
                .telefono(request.getTelefono())
                .domicilio(request.getDomicilio())
                .estado(true)
                .creadoPor(creador)
                .build();
        return mapToResponseBasico(clienteRepository.save(cliente));
    }
 
    @Transactional
    public ClienteResponse editarCliente(Long id, ClienteUpdateRequest request) {
        Cliente cliente = getOrThrow(id);
        if (request.getEstado() != null && !request.getEstado() && cliente.getEstado()) {
            validarImpedimentosDeBaja(id);
        }
        cliente.setNombre(request.getNombre());
        cliente.setTelefono(request.getTelefono());
        cliente.setDomicilio(request.getDomicilio());
       
        if (request.getEstado() != null) {
            cliente.setEstado(request.getEstado());
        }
        return mapToResponseBasico(clienteRepository.save(cliente));
    }
    @Transactional
    public void alterarEstado(Long id) {
        Cliente cliente = getOrThrow(id);
        if (cliente.getEstado()) {
            validarImpedimentosDeBaja(id);
            cliente.setEstado(false);
        } else {
            cliente.setEstado(true);
        }
        clienteRepository.save(cliente);
    }
 
    private void validarImpedimentosDeBaja(Long clienteId) {
        if (creditoRepository.existsByCliente_IdAndEstadoIn(clienteId, estadosCreditoInvalido)) {
            throw new BusinessException("No se puede dar de baja: el cliente tiene créditos activos o en mora.");
        }
    }
 
    // Ficha por Id y DNI
    @Transactional(readOnly = true)
    public ClienteFichaResponse clienteFicha(Long id) {
        Cliente cliente = getOrThrow(id);
        Pageable limiteFicha = PageRequest.of(0, 100);
       
        List<Credito> creditos = creditoRepository.buscarConFiltros(EstadoCredito.ACTIVO,id,null,null, limiteFicha).getContent();
        List<ClienteEtiqueta> etiquetas = clienteEtiquetaRepository.findByCliente_Id(id, limiteFicha).getContent();
       
        return fichaCompleta(cliente, creditos, etiquetas);
    }
    @Transactional(readOnly = true)
    public ClienteFichaResponse clienteFichaDni(String dni){
        Cliente c= clienteRepository.findByDni(dni)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró cliente con DNI: " + dni));
        return clienteFicha(c.getId());
    }
 
    private Cliente getOrThrow(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));
    }
 
    private Pageable buildPageable(int p, int s) {
        return PageRequest.of(p, Math.min(s, 50), Sort.by("nombre").ascending());
    }
 
    private ClienteResponse mapToResponseBasico(Cliente c) {
        return ClienteResponse.builder()
                .id(c.getId())
                .nombre(c.getNombre())
                .dni(c.getDni())
                .email(c.getEmail())
                .telefono(c.getTelefono())
                .domicilio(c.getDomicilio())
                .estado(c.getEstado())
                .fechaCreacion(c.getFechaCreacion())
                .idCreadoPor(c.getCreadoPor() != null ? c.getCreadoPor().getId() : null)
                .nombreCreadoPor(c.getCreadoPor() != null ? c.getCreadoPor().getNombre() : "Sistema")
                .build();
    }
    private PaginatedResponse<ClienteResponse> mapToPageResponseBasico(Page<Cliente> page) {
        return PaginatedResponse.<ClienteResponse>builder()
                .contenido(page.getContent().stream().map(this::mapToResponseBasico).toList())
                .paginaActual(page.getNumber())
                .totalPaginas(page.getTotalPages())
                .totalElementos(page.getTotalElements())
                .build();
    }
 
    // FICHA COMPLETA DE CLIENTE
    private ClienteFichaResponse fichaCompleta(Cliente cliente, List<Credito> creditos, List<ClienteEtiqueta> etiquetas) {
        return ClienteFichaResponse.builder()
                .id(cliente.getId())
                .nombre(cliente.getNombre())
                .dni(cliente.getDni())
                .email(cliente.getEmail())
                .telefono(cliente.getTelefono())
                .domicilio(cliente.getDomicilio())
                .estado(cliente.getEstado())
                .fechaCreacion(cliente.getFechaCreacion())
                .idCreador(cliente.getCreadoPor() != null ? cliente.getCreadoPor().getId() : null)
                .creadorNombre(cliente.getCreadoPor() != null ? cliente.getCreadoPor().getNombre() : "Sistema")
                .detalleEtiquetas(detalleEtiquetaFicha(etiquetas))
                .historialCreditos(detalleCreditoFicha(creditos))
                .build();
    }
 
    private List<EtiquetaFichaResponse> detalleEtiquetaFicha(List<ClienteEtiqueta> asignaciones) {
        return asignaciones.stream()
                .map(ce -> EtiquetaFichaResponse.builder()
                        .idClienteEtiqueta(ce.getEtiqueta().getId())
                        .idEtiqueta(ce.getEtiqueta().getId())
                        .nombre(ce.getEtiqueta().getNombre())
                        .color(ce.getEtiqueta().getColor())
                        .build())
                .collect(Collectors.toList());
    }
 
    private List<CreditoFichaResponse> detalleCreditoFicha(List<Credito> creditos) {
        return creditos.stream()
                .map(cr -> CreditoFichaResponse.builder()
                        .id(cr.getId())
                        .monto(cr.getMonto())
                        .cobradorId(cr.getCobrador() != null ? cr.getCobrador().getId() : null)
                        .cobradorNombre(cr.getCobrador() != null ? cr.getCobrador().getNombre() : "Sin asignar")
                        .estado(cr.getEstado())
                        .fechaCreacion(cr.getFechaCreacion())
                        .build())
                .collect(Collectors.toList());
    }
}