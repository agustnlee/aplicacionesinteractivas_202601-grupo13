package com.uade.tp13.config;

import com.uade.tp13.model.Etiqueta;
import com.uade.tp13.repository.EtiquetaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/* 
@Configuration
public class EtiquetaInitializerConfig {

    @Bean
    CommandLineRunner initEtiquetas(EtiquetaRepository etiquetaRepository) {
        return args -> {
            crearEtiquetaSiNoExiste(
                    etiquetaRepository,
                    "VIP",
                    "#f59e0b",
                    "Cliente prioritario"
            );

            crearEtiquetaSiNoExiste(
                    etiquetaRepository,
                    "Moroso",
                    "#ef4444",
                    "Cliente con pagos atrasados"
            );

            crearEtiquetaSiNoExiste(
                    etiquetaRepository,
                    "Nuevo",
                    "#3b82f6",
                    "Cliente registrado recientemente"
            );
        };
    }

    private void crearEtiquetaSiNoExiste(
            EtiquetaRepository etiquetaRepository,
            String nombre,
            String color,
            String descripcion
    ) {
        if (!etiquetaRepository.existsByNombreIgnoreCase(nombre)) {
            Etiqueta etiqueta = Etiqueta.builder()
                    .nombre(nombre)
                    .color(color)
                    .descripcion(descripcion)x
                    .build();

            etiquetaRepository.save(etiqueta);

            System.out.println("Etiqueta creada: " + nombre);
        }
    }
}

*/