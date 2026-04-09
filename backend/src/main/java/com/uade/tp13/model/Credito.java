package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.uade.tp13.enums.EstadoCredito;;

@Entity
@Table(name = "creditos")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Credito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(optional = false) 
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cobrador_id")
    private Usuario cobrador;

    @ManyToOne(optional = false)
    @JoinColumn(name = "creado_por_id")
    private Usuario creadoPor;

    private BigDecimal monto;
    private Integer cantidadCuotas;
    private BigDecimal interes;

    @Enumerated(EnumType.STRING)
    private EstadoCredito estado;

    private LocalDate fechaCreacion;

    @OneToMany(mappedBy = "credito", cascade = CascadeType.ALL, orphanRemoval = true) // cuota va a tener FK credito, cascade para propagar eventos a hijos
    @Builder.Default
    private List<Cuota> cuotas = new ArrayList<>();



    @PrePersist // anotacion para hacer que el metodo se ejecute antes de insertar en h2
    public void prePersist() {
        this.fechaCreacion = LocalDate.now();
        if (estado == null) estado = EstadoCredito.ACTIVO;
    }
}