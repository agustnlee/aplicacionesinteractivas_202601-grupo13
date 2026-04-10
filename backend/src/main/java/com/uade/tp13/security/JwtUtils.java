package com.uade.tp13.security;

import com.uade.tp13.model.Usuario;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private SecretKey getSigningKey() { // String secret -> clave criptografica usable por algoritmo HMAC-SHA
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // construccion y firma el token con datos ususario
    // claims en id y rol para poder usar sin DB 
    public String generateToken(Usuario usuario) {
        return Jwts.builder()
                .subject(usuario.getEmail())
                .claim("id", usuario.getId())
                .claim("rol", usuario.getRol().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    // cubre firma incorrecta, token expirado, token malformado
    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // metodo que verifica firma con la clave y devulve el payload token
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // metodo que devuelve el tiempo absoluto (tiempo exacto en donde expira en el futuro)
    public long getExpirationTimeMs(String token) {
        return parseClaims(token).getExpiration().getTime();
    }
}