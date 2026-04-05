package com.uade.tp13.service;


import org.hibernate.sql.results.NoMoreOutputsException;

import com.uade.tp13.dto.request.CrearEtiquetaRequest;
import com.uade.tp13.dto.request.ModificarEtiquetaRequest;
import com.uade.tp13.dto.response.EtiquetaResponse;
import com.uade.tp13.repository.EtiquetaRepository;
import com.uade.tp13.model.Etiqueta;



public class EtiquetaService {
    
    private final EtiquetaRepository etiquetaRepository;

    private String nombreEtiqueta;

   

    public EtiquetaResponse crearEtiqueta (CrearEtiquetaRequest request){

        nombreEtiqueta=request.getNombreEtiqueta();


        if (etiquetaRepository.existsByNombre( nombreEtiqueta )== false){



            Etiqueta etiqueta = Etiqueta.builder().nombre(nombreEtiqueta)
            .color(request.getColorEtiqueta())
            .descripcion(request.getDescripcionEtiqueta())
            .fechaCreacion(request.getFechaCreacionEtiqueta())
            .fechaModificacion(request.getFechaModificacionEtiqueta()).build;

            return mapToResponse(etiquetaRepository.save(etiqueta));

        }

         
    }


    EtiquetaResponse modificarEtiqueta(ModificarEtiquetaRequest request){


             
            Etiqueta etiqueta = get(request)
            
    
            
            Etiqueta.get.nombre(request.getNombreEtiqueta())
            .color(request.getColorEtiqueta())
            .descripcion(request.getDescripcionEtiqueta())
            .fechaCreacion(request.getFechaCreacionEtiqueta())
            .fechaModificacion(request.getFechaModificacionEtiqueta()).build;

            if (EtiquetaRepository.existsByNombre()==){


            }

            return mapToResponse(etiquetaRepository.save(etiqueta));


    }
    EtiquetaResponse eliminar(CrearEtiquetaRequest request){

    }

    



    
}
