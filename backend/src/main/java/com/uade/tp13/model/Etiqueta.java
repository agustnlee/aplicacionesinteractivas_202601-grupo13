package com.uade.tp13.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "etiquetas")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder



public class Etiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nombre;
    private String color;
    private String descripcion;
    private LocalDate fechaCreacion;
    private LocalDate fechaModificacion;


    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDate.now();
        this.fechaModificacion = LocalDate.now();}

    @PreUpdate 
    public void preUpdate() {

        this.fechaModificacion= LocalDate.now();
    }

}
