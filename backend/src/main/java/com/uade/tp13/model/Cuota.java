package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.uade.tp13.enums.EstadoCuota;

@Entity
@Table(name = "cuotas")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Cuota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) // fk credito
    @JoinColumn(name = "credito_id")
    private Credito credito;

    private Integer numeroCuota;
    private LocalDate fechaVencimiento;
    private BigDecimal monto;
    private BigDecimal montoRecargo;

    @Enumerated(EnumType.STRING)
    private EstadoCuota estado;

    /*TODO: Liberar cuando este pago
    @OneToOne(mappedBy = "cuota", cascade = CascadeType.ALL)
    private Pago pago;*/

    @PrePersist
    public void prePersist() {
        if (estado == null) estado = EstadoCuota.PENDIENTE;
        if (montoRecargo == null) montoRecargo = BigDecimal.ZERO;
    }
}