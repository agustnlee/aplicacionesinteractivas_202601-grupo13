package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity 
@Table(name = "clientes_etiqueta", uniqueConstraints={@UniqueConstraint(columnNames={"Cliente", "Etiqueta"})})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder

public class ClientesEtiqueta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    
    //@ManyToOne( optional = false)
    //@JoinColumn(name="cliente_id")
    //private Cliente cliente;

   
    @ManyToOne( optional = false)
    @JoinColumn(name = "etiqueta_id")
    private Etiqueta etiqueta; //fk etiqueta

    //@ManyToOne(optional = false)
    //@JoinColumn(name = "asignado_por_id")
    //private Usuario AsignadoPor;

    
    
    private LocalDate AsignadoEn;

     @PrePersist
    public void prePersist() {
        this.AsignadoEn = LocalDate.now();}
}