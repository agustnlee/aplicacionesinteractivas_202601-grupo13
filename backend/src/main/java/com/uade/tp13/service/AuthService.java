package com.uade.tp13.service;

import com.uade.tp13.dto.request.LoginRequest;
import com.uade.tp13.dto.response.AuthResponse;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.security.JwtUtils;
import com.uade.tp13.security.TokenBlacklist;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final TokenBlacklist tokenBlacklist;

    public AuthResponse login(LoginRequest request) {
        // validacion credenciales (compara passwords con Bcrypt)
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // getPrincipal() devuelve Usuario cargado por UserdetailsService
        Usuario usuario = (Usuario) auth.getPrincipal();
        
        // Generar token y devolver datos minimos que necesita front
        return AuthResponse.builder()
                .token(jwtUtils.generateToken(usuario))
                .id(usuario.getId())
                .rol(usuario.getRol())
                .build();
    }

    public void logout(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            long expirationTimeMs = jwtUtils.getExpirationTimeMs(token);
            tokenBlacklist.blacklist(token, expirationTimeMs);
            SecurityContextHolder.clearContext();
        }
    }
}
