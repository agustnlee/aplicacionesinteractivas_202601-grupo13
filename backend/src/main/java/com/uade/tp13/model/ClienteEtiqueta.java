package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity 
@Table(name = "clientes_etiqueta", uniqueConstraints={@UniqueConstraint(columnNames={"cliente_id", "etiqueta_id"})})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder 

public class ClienteEtiqueta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    
    @ManyToOne( optional = false)
    @JoinColumn(name="cliente_id", nullable = false)
    private Cliente cliente;

   
    @ManyToOne( optional = false)
    @JoinColumn(name = "etiqueta_id", nullable = false)
    private Etiqueta etiqueta; //fk etiqueta

    @ManyToOne(optional = false)
    @JoinColumn(name = "asignado_por_id", nullable = false)
    private Usuario asignado_por_id;

    
    @Column(name = "asignado_en", nullable = false)
    private LocalDate asignado_en;

     @PrePersist
    public void prePersist() {
        this.asignado_en = LocalDate.now();}

}