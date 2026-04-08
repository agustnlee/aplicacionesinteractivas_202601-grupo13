package com.uade.tp13.service;
 
import com.uade.tp13.dto.request.*;
import com.uade.tp13.dto.response.*;
import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.enums.ROL_USUARIO;
import com.uade.tp13.exception.*;
import com.uade.tp13.model.*;
import com.uade.tp13.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
import java.util.Set;
 
@Service
@RequiredArgsConstructor
public class UsuarioService {
 
    private final UsuarioRepository usuarioRepository;
    private final CreditoRepository creditoRepository;
    private final PasswordEncoder passwordEncoder;
 
    private static final Set<EstadoCredito> estadosCreditoPendiente = Set.of(
            EstadoCredito.ACTIVO,
            EstadoCredito.EN_MORA
    );
 
    @Transactional
    public UsuarioResponse crearUsuario(UsuarioRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Ya existe un usuario con el email: " + request.getEmail());
        }
 
        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(request.getRol())
                .build();
 
        return mapToResponse(usuarioRepository.save(usuario));
    }
 
    @Transactional
    public UsuarioResponse editarUsuario(Long id, UsuarioUpdateRequest request) {
        Usuario usuario = getOrThrow(id);
        if (request.getEstado() != null && !request.getEstado() && usuario.getEstado()) {
            validarImpedimentosDeBaja(usuario);
        }
        usuario.setNombre(request.getNombre());
        usuario.setRol(request.getRol());
        if (request.getEstado() != null) {
            usuario.setEstado(request.getEstado());
        }
        return mapToResponse(usuarioRepository.save(usuario));
    }
 
    @Transactional
    public void alterarEstado(Long id) {
        Usuario usuario = getOrThrow(id);
       
        if (usuario.getEstado()) {
            validarImpedimentosDeBaja(usuario);
            usuario.setEstado(false);          
        } else {
            usuario.setEstado(true);          
        }
       
        usuarioRepository.save(usuario);
    }
    private void validarImpedimentosDeBaja(Usuario usuario) {
        if (usuario.getRol() == ROL_USUARIO.COBRADOR) {
            if (creditoRepository.existsByCliente_IdAndEstadoIn(usuario.getId(), estadosCreditoPendiente)) {
                throw new ReglaNegocioException("No se puede desactivar al cobrador porque tiene créditos activos o en mora.");
            }
        }
    }
 
    @Transactional
    public void resetearPassword(Long id, UsuarioPasswordRequest request) {
        Usuario usuario = getOrThrow(id);
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuarioRepository.save(usuario);
    }
 
   
    @Transactional(readOnly = true)
    public PaginatedResponse<UsuarioResponse> buscarUsuarios(String nombre, ROL_USUARIO rol, Boolean estado, int p, int s) {
        String nombreLimpio = (nombre != null && !nombre.isBlank()) ? nombre : null;        
        Pageable pageable = buildPageable(p, s);
       
        Page<Usuario> page = usuarioRepository.buscarUsuariosConFiltro(nombreLimpio, rol, estado, pageable);
        return PaginatedResponse.<UsuarioResponse>builder()
                .contenido(page.getContent().stream().map(this::mapToResponse).toList())
                .paginaActual(page.getNumber())
                .totalPaginas(page.getTotalPages())
                .totalElementos(page.getTotalElements())
                .build();
    }
   
 
 
    private Usuario getOrThrow(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
    }
    private Pageable buildPageable(int p, int s) {
        return PageRequest.of(p, Math.min(s, 50), Sort.by("nombre").ascending());
    }
   
    private UsuarioResponse mapToResponse(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId())
                .nombre(u.getNombre())
                .rol(u.getRol())
                .email(u.getEmail())
                .estado(u.getEstado())
                .fechaCreacion(u.getFechaCreacion())
                .build();
    }
}