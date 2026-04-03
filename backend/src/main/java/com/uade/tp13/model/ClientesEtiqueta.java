package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity 
@Table(name = "ClienteEtiquetas", uniqueConstraints={@UniqueConstraint(columnNames={"Cliente.cliente", "Etiqueta.etiqueta"})})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder

public class EtiquetaClientes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    //@ManyToOne( optional = false)
    //private Cliente cliente;

   
    @ManyToOne( optional = false)
    private Etiqueta etiqueta; //fk etiqueta

    //@ManyToOne(optional = false)
    //@JoinColumn(name = "Asignado_por_id")
    //private Usuario AsignadoPor;

    //@ManyToOne(optional = false)
    //@JoinColumn(name = "Asignado_en_id")
    //private Usuario AsignadoEn;



}
