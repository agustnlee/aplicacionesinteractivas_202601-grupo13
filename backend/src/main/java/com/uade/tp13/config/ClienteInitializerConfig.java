package com.uade.tp13.config;

import com.uade.tp13.model.Cliente;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.repository.ClienteRepository;
import com.uade.tp13.repository.UsuarioRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class ClienteInitializerConfig {

    @Bean
    @Order(3)
    CommandLineRunner initClientes(ClienteRepository clienteRepository, UsuarioRepository usuarioRepository) {
        return args -> {
            Usuario admin = usuarioRepository
                    .findByEmail("admin@tp13.com")
                    .orElseThrow();

            String dniEze = "46213568";

            if (!clienteRepository.existsByDni(dniEze)) {
                Cliente eze = Cliente.builder()
                        .nombre("Ezequiel Souza")
                        .dni(dniEze)
                        .email("eze@test.com")
                        .telefono("1122334455")
                        .domicilio("Canning-Ezeiza")
                        .creadoPor(admin)
                        .build();

                clienteRepository.save(eze);
                System.out.println("Cliente creado: Ezequiel Souza");
            }

            String dniMatias = "28999111";

            if (!clienteRepository.existsByDni(dniMatias)) {
                Cliente matias = Cliente.builder()
                        .nombre("Matias Arraigada")
                        .dni(dniMatias)
                        .email("matias@test.com")
                        .telefono("1166778899")
                        .domicilio("Canning-Ezeiza")
                        .creadoPor(admin)
                        .build();

                clienteRepository.save(matias);
                System.out.println("Cliente creado: Matias Arraigada");
            }
        };
    }
}