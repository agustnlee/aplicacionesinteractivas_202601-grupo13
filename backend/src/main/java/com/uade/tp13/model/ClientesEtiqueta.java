package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity 
@Table(name = "clientesEtiqueta", uniqueConstraints={@UniqueConstraint(columnNames={"Cliente", "Etiqueta"})})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder

public class ClientesEtiqueta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    
    //@ManyToOne( optional = false)
    //@JoinColumn(name="Cliente")
    //private Cliente cliente;

   
    @ManyToOne( optional = false)
    @JoinColumn(name = "Etiqueta")
    private Etiqueta etiqueta; //fk etiqueta

    //@ManyToOne(optional = false)
    //@JoinColumn(name = "Asignado_por_id")
    //private Usuario AsignadoPor;

    
    
    private LocalDate AsignadoEn;

     @PrePersist
    public void prePersist() {
        this.AsignadoEn = LocalDate.now();}





}