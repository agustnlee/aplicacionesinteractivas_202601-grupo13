package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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
    private Credito credito;

    private Integer numeroCuota;

    private LocalDate fechaVencimiento;

    private BigDecimal monto;

    private BigDecimal montoRecargo;

     // private Boolean pagada = false;

    // TODO liberar cuando este pago

    //@OneToMany(mappedBy = "cuota", cascade = CascadeType.ALL)
    //private List<Pago> pagos;
}