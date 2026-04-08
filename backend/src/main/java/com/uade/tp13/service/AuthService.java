package com.uade.tp13.service;
 
import com.uade.tp13.dto.request.LoginRequest;
import com.uade.tp13.dto.response.AuthResponse;
import com.uade.tp13.exception.ResourceNotFoundException;
import com.uade.tp13.exception.UsuarioDesactivadoException;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.repository.UsuarioRepository;
import com.uade.tp13.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
@Service
@RequiredArgsConstructor
public class AuthService {
 
    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
 
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Credenciales incorrectas."));
        //VALIDACION activo
        if (!usuario.getEstado()) {
            throw new UsuarioDesactivadoException("La cuenta se encuentra desactivada.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
 
        String token = jwtUtil.generarToken(usuario);
        return AuthResponse.builder()
                .token(token)
                .id(usuario.getId())
                .rol(usuario.getRol())
                .build();
    }
}