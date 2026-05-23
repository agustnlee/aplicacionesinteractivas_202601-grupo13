package com.uade.tp13.config;

import com.uade.tp13.model.Cliente;
import com.uade.tp13.model.ClienteEtiqueta;
import com.uade.tp13.model.Etiqueta;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.repository.ClienteEtiquetaRepository;
import com.uade.tp13.repository.ClienteRepository;
import com.uade.tp13.repository.EtiquetaRepository;
import com.uade.tp13.repository.UsuarioRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class ClienteEtiquetaInitializerConfig {

    @Bean
    @Order(4)
    CommandLineRunner initClienteEtiquetas(
            ClienteEtiquetaRepository clienteEtiquetaRepository,
            ClienteRepository clienteRepository,
            EtiquetaRepository etiquetaRepository,
            UsuarioRepository usuarioRepository
    ) {
        return args -> {
            Cliente eze = clienteRepository
                    .findByDni("46213568")
                    .orElseThrow();

            Etiqueta vip = etiquetaRepository
                    .findByNombreIgnoreCase("VIP")
                    .orElseThrow();

            Usuario admin = usuarioRepository
                    .findByEmail("admin@tp13.com")
                    .orElseThrow();

            if (!clienteEtiquetaRepository.existsByClienteIdAndEtiquetaId(
                    eze.getId(),
                    vip.getId()
            )) {
                ClienteEtiqueta clienteEtiqueta = ClienteEtiqueta.builder()
                        .cliente(eze)
                        .etiqueta(vip)
                        .asignadoPorId(admin)
                        .build();

                clienteEtiquetaRepository.save(clienteEtiqueta);
                System.out.println("Etiqueta VIP asignada a Ezequiel Souza");
            }
        };
    }
}
