package com.uade.tp13.config;

import com.uade.tp13.enums.ROL_USUARIO;
import com.uade.tp13.model.Usuario;
import com.uade.tp13.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializerConfig {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String emailAdmin = "admin@tp13.com";
            String passwordAdmin = "admin123";

            if (!usuarioRepository.existsByEmail(emailAdmin)) {
                Usuario superAdmin = Usuario.builder()
                        .nombre("Super Administrador")
                        .email(emailAdmin)
                        .password(passwordEncoder.encode(passwordAdmin))
                        .rol(ROL_USUARIO.ADMIN)
                        .estado(true)
                        .build();
                usuarioRepository.save(superAdmin);

                System.out.println("----------------------------------------------============----------------------------------------------");
                System.out.println("----------------------------------------------ADMIN CREADO----------------------------------------------");
                System.out.println("----------------------------------------------============----------------------------------------------");
            } else {
                System.out.println("Admin ya existe");
            }
        };
    }
}