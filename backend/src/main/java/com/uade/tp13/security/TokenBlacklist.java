package com.uade.tp13.security;

import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenBlacklist {
    private final Map<String, Long> blacklistedTokens = new ConcurrentHashMap<>();

    public void blacklist(String token, long expirationTimeMs) {
        blacklistedTokens.put(token, expirationTimeMs);
    }

    public boolean isBlacklisted(String token) { 
        Long expiry = blacklistedTokens.get(token);
        if (expiry == null) return false;
        if (System.currentTimeMillis() > expiry) {
            blacklistedTokens.remove(token); // auto-clean
            return false;
        }
        return true; // if esta en el hashmap y no paso el tiempo de expiracion
    }
}