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
    private Cuota cuota; // Relación con Cuota (según el doc)

    @Column(name = "fecha_pagado")
    private LocalDateTime fechaPagado; // Se setea solo con @PrePersist

    @NotNull
    @Column(name = "monto", nullable = false, precision = 12, scale = 2)
    private BigDecimal monto; // Monto efectivamente pagado

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo")
    private MetodoPago metodo; // Enum METODO_PAGO (Efectivo, Tarjeta, etc.)

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_cobrador", referencedColumnName = "id")
    private Usuario cobradoPor; // Quién lo cobró

    @Column(name = "observaciones")
    private String observaciones; // El "parámetro" extra para detalles del pago

    @PrePersist
    protected void onCreate() {
        this.fechaPagado = LocalDateTime.now();
    }
}