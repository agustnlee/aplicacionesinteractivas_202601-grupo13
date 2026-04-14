package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clientes")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false, unique = true)
    private String dni;
    private String email;
    private String telefono;
    private String domicilio;

    @Builder.Default
    @Column(nullable = false)
    private Boolean estado = true;

    @Column(updatable = false)
    private java.time.LocalDateTime fechaCreacion;
    @PrePersist
    protected void prePersist() {
        this.fechaCreacion = java.time.LocalDateTime.now();
    }
    @ManyToOne (optional = false)
    @JoinColumn(name = "creado_por_id")
    private Usuario creadoPor;

}
