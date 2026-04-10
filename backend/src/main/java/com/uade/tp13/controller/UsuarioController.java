package com.uade.tp13.controller;
 
import com.uade.tp13.dto.request.*;
import com.uade.tp13.dto.response.*;
import com.uade.tp13.enums.ROL_USUARIO;
import com.uade.tp13.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
 
    private final UsuarioService usuarioService;
 
    @PostMapping
    public ResponseEntity<UsuarioResponse> crear(@Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.crearUsuario(request));
    }
 
    @GetMapping
    public ResponseEntity<PaginatedResponse<UsuarioResponse>> listar(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) ROL_USUARIO rol,
            @RequestParam(required = false) Boolean estado,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio
    ) {
        return ResponseEntity.ok(usuarioService.buscarUsuarios(nombre, rol, estado, pagina, tamanio));
    }
 
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioUpdateRequest request
    ) {
        return ResponseEntity.ok(usuarioService.editarUsuario(id, request));
    }
 
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Void> cambiarEstado(@PathVariable Long id) {
        usuarioService.alterarEstado(id);
        return ResponseEntity.noContent().build();
    }
 
    @PatchMapping("/{id}/password")
    public ResponseEntity<Void> resetearPassword(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioPasswordRequest request
    ) {
        usuarioService.resetearPassword(id, request);
        return ResponseEntity.noContent().build();
    }
}