package com.uade.tp13.config;

import com.uade.tp13.enums.EstadoCredito;
import com.uade.tp13.enums.EstadoCuota;
import com.uade.tp13.enums.ROL_USUARIO;
import com.uade.tp13.model.*;
import com.uade.tp13.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AdminInitializerConfig implements CommandLineRunner {

    private final UsuarioRepository  usuarioRepository;
    private final ClienteRepository  clienteRepository;
    private final CreditoRepository  creditoRepository;
    private final CuotaRepository    cuotaRepository;
    private final PasswordEncoder    passwordEncoder;

    @Override
    public void run(String... args) {

        if (usuarioRepository.count() > 0) return; // ya inicializado

        // Usuarios
        Usuario admin = usuarioRepository.save(Usuario.builder()
                .nombre("Super Admin")
                .email("admin@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.ADMIN)
                .estado(true)
                .build());

        Usuario analista = usuarioRepository.save(Usuario.builder()
                .nombre("Ana Analista")
                .email("analista@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.ANALISTA)
                .estado(true)
                .build());

        Usuario cobrador1 = usuarioRepository.save(Usuario.builder()
                .nombre("Carlos Cobrador")
                .email("cobrador@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.COBRADOR)
                .estado(true)
                .build());

        Usuario cobrador2 = usuarioRepository.save(Usuario.builder()
                .nombre("Laura Lopez")
                .email("laura@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.COBRADOR)
                .estado(true)
                .build());

        // Clientes
        Cliente c1 = clienteRepository.save(Cliente.builder()
        .nombre("Juan Pérez")
        .dni("30123456")
        .telefono("1155551234")
        .estado(true)
        .creadoPor(admin)    // ← agregar
        .build());

Cliente c2 = clienteRepository.save(Cliente.builder()
        .nombre("María García")
        .dni("27654321")
        .telefono("1144449876")
        .estado(true)
        .creadoPor(admin)    // ← agregar
        .build());

Cliente c3 = clienteRepository.save(Cliente.builder()
        .nombre("Roberto Silva")
        .dni("33789012")
        .telefono("1166667890")
        .estado(true)
        .creadoPor(admin)    // ← agregar
        .build());

        // Créditos
        crearCredito(c1, cobrador1, admin,    new BigDecimal("50000"),  new BigDecimal("15"), 8,  EstadoCredito.ACTIVO);
crearCredito(c1, cobrador2, admin,    new BigDecimal("20000"),  new BigDecimal("10"), 4,  EstadoCredito.CERRADO);
crearCredito(c2, cobrador1, admin,    new BigDecimal("80000"),  new BigDecimal("20"), 12, EstadoCredito.EN_MORA);
crearCredito(c2, cobrador2, analista, new BigDecimal("15000"),  new BigDecimal("5"),  3,  EstadoCredito.CANCELADO);
crearCredito(c3, cobrador1, admin,    new BigDecimal("100000"), new BigDecimal("18"), 6,  EstadoCredito.ACTIVO);

// 15 adicionales
crearCredito(c1, cobrador1, admin,    new BigDecimal("35000"),  new BigDecimal("12"), 6,  EstadoCredito.ACTIVO);
crearCredito(c1, cobrador2, analista, new BigDecimal("60000"),  new BigDecimal("18"), 10, EstadoCredito.EN_MORA);
crearCredito(c2, cobrador1, admin,    new BigDecimal("25000"),  new BigDecimal("8"),  4,  EstadoCredito.CERRADO);
crearCredito(c2, cobrador2, admin,    new BigDecimal("90000"),  new BigDecimal("22"), 12, EstadoCredito.ACTIVO);
crearCredito(c3, cobrador2, analista, new BigDecimal("45000"),  new BigDecimal("10"), 8,  EstadoCredito.EN_MORA);
crearCredito(c3, cobrador1, admin,    new BigDecimal("12000"),  new BigDecimal("5"),  3,  EstadoCredito.CANCELADO);
crearCredito(c1, cobrador1, analista, new BigDecimal("70000"),  new BigDecimal("15"), 12, EstadoCredito.ACTIVO);
crearCredito(c2, cobrador2, admin,    new BigDecimal("18000"),  new BigDecimal("10"), 6,  EstadoCredito.CERRADO);
crearCredito(c3, cobrador1, admin,    new BigDecimal("55000"),  new BigDecimal("20"), 8,  EstadoCredito.EN_MORA);
crearCredito(c1, cobrador2, admin,    new BigDecimal("30000"),  new BigDecimal("12"), 6,  EstadoCredito.ACTIVO);
crearCredito(c2, cobrador1, analista, new BigDecimal("110000"), new BigDecimal("25"), 12, EstadoCredito.EN_MORA);
crearCredito(c3, cobrador2, admin,    new BigDecimal("22000"),  new BigDecimal("8"),  4,  EstadoCredito.CANCELADO);
crearCredito(c1, cobrador1, admin,    new BigDecimal("48000"),  new BigDecimal("15"), 8,  EstadoCredito.CERRADO);
crearCredito(c2, cobrador2, analista, new BigDecimal("75000"),  new BigDecimal("18"), 10, EstadoCredito.ACTIVO);
crearCredito(c3, cobrador1, admin,    new BigDecimal("33000"),  new BigDecimal("10"), 6,  EstadoCredito.CANCELADO);

        System.out.println(">>> AdminInitializerConfig: datos de prueba cargados.");
    }

    private void crearCredito(Cliente cliente, Usuario cobrador, Usuario creadoPor,
                               BigDecimal monto, BigDecimal interes, int cantidad,
                               EstadoCredito estado) {

        BigDecimal factor     = BigDecimal.ONE.add(interes.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP));
        BigDecimal montoCuota = monto.multiply(factor).divide(BigDecimal.valueOf(cantidad), 2, RoundingMode.HALF_UP);

        Credito credito = creditoRepository.save(Credito.builder()
                .cliente(cliente)
                .cobrador(cobrador)
                .creadoPor(creadoPor)
                .monto(monto)
                .cantidadCuotas(cantidad)
                .interes(interes)
                .estado(estado)
                .build());

        List<Cuota> cuotas = new ArrayList<>();
        for (int i = 1; i <= cantidad; i++) {
            cuotas.add(Cuota.builder()
                    .credito(credito)
                    .numeroCuota(i)
                    .fechaVencimiento(LocalDate.now().plusDays(7L * i))
                    .monto(montoCuota)
                    .montoRecargo(BigDecimal.ZERO)
                    .estado(resolverEstadoCuota(estado, i, cantidad))
                    .build());
        }
        cuotaRepository.saveAll(cuotas);
    }

    private EstadoCuota resolverEstadoCuota(EstadoCredito estadoCredito, int numeroCuota, int total) {
        return switch (estadoCredito) {
            case CERRADO                              -> EstadoCuota.PAGADA;
            case CANCELADO, CANCELADO_REFINANCIACION -> EstadoCuota.PENDIENTE;
            case EN_MORA                             -> numeroCuota <= 2 ? EstadoCuota.PAGADA : EstadoCuota.PENDIENTE;
            default                                  -> numeroCuota <= total / 2 ? EstadoCuota.PAGADA : EstadoCuota.PENDIENTE;
        };
    }
}