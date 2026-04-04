package com.uade.tp13.model;
 
import jakarta.persistence.*;
import lombok.*;
 
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
 
import java.util.Collection;
import java.util.List;
import com.uade.tp13.enums.ROL_USUARIO;
 
@Entity
@Table(name = "usuarios")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false)
    private String nombre;
 
    @Column(unique = true, nullable = false)
    private String email;
 
    @Column(nullable = false)
    private String password;
   
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ROL_USUARIO rol;
 
    @Builder.Default
    @Column(nullable = false)
    private Boolean estado = true;
 
    @Column(updatable = false)
    private java.time.LocalDate fechaCreacion;
    @PrePersist
    public void prePersist() {
        this.fechaCreacion = java.time.LocalDate.now();
    }
 
 
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(rol.name()));
    }
 
    @Override
    public String getUsername() {
        return this.email;
    }
 
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
 
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
 
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
 
    @Override
    public boolean isEnabled() {
        return this.estado;
    }
}