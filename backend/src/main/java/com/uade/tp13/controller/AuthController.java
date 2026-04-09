package com.uade.tp13.controller;
 
 
import com.uade.tp13.dto.request.LoginRequest;
import com.uade.tp13.dto.response.AuthResponse;
import com.uade.tp13.service.AuthService;
import lombok.RequiredArgsConstructor;
 
import org.springframework.http.ResponseEntity;
 
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
 
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}