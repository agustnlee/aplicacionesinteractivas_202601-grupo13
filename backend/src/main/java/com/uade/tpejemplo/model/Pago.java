package com.uade.tpejemplo.model;

import com.uade.tpejemplo.enums.MetodoPago;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cuota", referencedColumnName = "id")
    private Cuota cuota; // Relación Cuota (Cuota)

    @Column(name = "fecha_pagado")
    private LocalDateTime fechaPagado; // Fecha_Pagado

    @NotNull
    @Column(name = "monto", nullable = false, precision = 12, scale = 2)
    private BigDecimal monto; // Monto (mismo de la cuota)

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo")
    private MetodoPago metodo; // Metodo (enum METODO_PAGO)

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_cobrador", referencedColumnName = "id")
    private Usuario cobradoPor; // Cobrado_Por (Usuario)

    @PrePersist
    protected void onCreate() {
        this.fechaPagado = LocalDateTime.now();
    }
}