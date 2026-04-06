package com.uade.tp13.service;


import java.time.LocalDate;

import org.hibernate.sql.results.NoMoreOutputsException;

import com.uade.tp13.dto.request.CrearEtiquetaRequest;
import com.uade.tp13.dto.request.ModificarEtiquetaRequest;
import com.uade.tp13.dto.response.EtiquetaResponse;
import com.uade.tp13.repository.EtiquetaRepository;
import com.uade.tp13.model.Etiqueta;



public class EtiquetaService {
    
    private final EtiquetaRepository etiquetaRepository;

    private String nombreEtiqueta;
    private String colorEtiqueta;
    private String descripcionEtiqueta;
    private LocalDate fechaCreacionEtiqueta;
    private LocalDate fechaModificacionEtiqueta;

   

    public EtiquetaResponse crearEtiqueta (CrearEtiquetaRequest request){

        nombreEtiqueta=request.getNombreEtiqueta();
        colorEtiqueta=request.getColorEtiqueta();
        descripcionEtiqueta= request.getDescripcionEtiqueta();
        fechaCreacionEtiqueta= request.getFechaCreacionEtiqueta();
        



        if (etiquetaRepository.existsByNombre( nombreEtiqueta )== false){



            Etiqueta etiqueta = Etiqueta.builder().nombre(nombreEtiqueta)
            .color(colorEtiqueta)
            .descripcion(descripcionEtiqueta)
            .fechaCreacion(fechaCreacionEtiqueta)
            .fechaModificacion(fechaCreacionEtiqueta).build;

            return mapToResponse(etiquetaRepository.save(etiqueta));

        }

         
    }


    EtiquetaResponse modificarEtiqueta( Long etiquetaId , ModificarEtiquetaRequest request){


        Etiqueta etiqueta = get(etiquetaId);

        //TODO: validar que el nombre no coincida con el nombre de otra etiqueta

        etiqueta.setNombreEtiqueta(nombreEtiqueta).setColor(colorEtiqueta).setDescripcion(descripcionEtiqueta).setFechaModificacionEtiqueta(fechaModificacionEtiqueta);
        
            
    
           return mapToResponse(etiquetaRepository.save(etiqueta));

            }

            


    
    //EtiquetaResponse eliminar( request){


        // return mapToResponse
    //}

    



    
}
