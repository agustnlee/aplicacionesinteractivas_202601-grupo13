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

    private final UsuarioRepository         usuarioRepository;
    private final ClienteRepository         clienteRepository;
    private final CreditoRepository         creditoRepository;
    private final CuotaRepository           cuotaRepository;
    private final PasswordEncoder           passwordEncoder;
    private final EtiquetaRepository        etiquetaRepository;
    private final ClienteEtiquetaRepository clienteEtiquetaRepository;

    @Override
    public void run(String... args) {

        if (usuarioRepository.count() > 0) return;

        // ── Usuarios ─────────────────────────────────────────
        Usuario admin = usuarioRepository.save(Usuario.builder()
                .nombre("Super Admin").email("admin@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.ADMIN).estado(true).build());

        Usuario analista = usuarioRepository.save(Usuario.builder()
                .nombre("Ana Analista").email("analista@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.ANALISTA).estado(true).build());

        Usuario analista2 = usuarioRepository.save(Usuario.builder()
                .nombre("Bruno Benitez").email("bruno@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.ANALISTA).estado(true).build());

        Usuario cobrador1 = usuarioRepository.save(Usuario.builder()
                .nombre("Carlos Cobrador").email("cobrador@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.COBRADOR).estado(true).build());

        Usuario cobrador2 = usuarioRepository.save(Usuario.builder()
                .nombre("Laura Lopez").email("laura@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.COBRADOR).estado(true).build());

        Usuario cobrador3 = usuarioRepository.save(Usuario.builder()
                .nombre("Marcos Medina").email("marcos@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.COBRADOR).estado(true).build());

        Usuario cobrador4 = usuarioRepository.save(Usuario.builder()
                .nombre("Daniela Díaz").email("daniela@tp13.com")
                .password(passwordEncoder.encode("admin123"))
                .rol(ROL_USUARIO.COBRADOR).estado(false).build());

        // ── Clientes ─────────────────────────────────────────
        Cliente c1 = clienteRepository.save(Cliente.builder()
                .nombre("Juan Pérez").dni("30123456").email("juan@mail.com")
                .telefono("1155551234").domicilio("Av. Corrientes 1234")
                .estado(true).creadoPor(admin).build());

        Cliente c2 = clienteRepository.save(Cliente.builder()
                .nombre("María García").dni("27654321").email("maria@mail.com")
                .telefono("1144449876").domicilio("Av. Santa Fe 567")
                .estado(true).creadoPor(admin).build());

        Cliente c3 = clienteRepository.save(Cliente.builder()
                .nombre("Roberto Silva").dni("33789012").email("roberto@mail.com")
                .telefono("1166667890").domicilio("Rivadavia 890")
                .estado(true).creadoPor(analista).build());

        Cliente c4 = clienteRepository.save(Cliente.builder()
                .nombre("Sofía Romero").dni("29001122").email("sofia@mail.com")
                .telefono("1177778888").domicilio("Cabildo 321")
                .estado(true).creadoPor(analista).build());

        Cliente c5 = clienteRepository.save(Cliente.builder()
                .nombre("Diego Fernández").dni("31445566").email("diego@mail.com")
                .telefono("1188889999").domicilio("Belgrano 456")
                .estado(true).creadoPor(admin).build());

        Cliente c6 = clienteRepository.save(Cliente.builder()
                .nombre("Valentina Torres").dni("26778899").email("vale@mail.com")
                .telefono("1199990000").domicilio("Lavalle 789")
                .estado(false).creadoPor(analista2).build());

        Cliente c7 = clienteRepository.save(Cliente.builder()
                .nombre("Nicolás Herrera").dni("32334455").email("nico@mail.com")
                .telefono("1111112222").domicilio("Tucumán 1011")
                .estado(true).creadoPor(admin).build());

        Cliente c8 = clienteRepository.save(Cliente.builder()
                .nombre("Camila Díaz").dni("28990011").email("camila@mail.com")
                .telefono("1122223333").domicilio("Avellaneda 222")
                .estado(true).creadoPor(cobrador1).build());

        Cliente c9 = clienteRepository.save(Cliente.builder()
                .nombre("Facundo Acosta").dni("34556677").email("facu@mail.com")
                .telefono("1133334444").domicilio("Mitre 333")
                .estado(true).creadoPor(admin).build());

        Cliente c10 = clienteRepository.save(Cliente.builder()
                .nombre("Luciana Méndez").dni("25112233").email("luci@mail.com")
                .telefono("1144445555").domicilio("San Martín 44")
                .estado(false).creadoPor(analista).build());

        // ── Créditos ─────────────────────────────────────────
        crearCredito(c1, cobrador1, admin,    new BigDecimal("50000"),  new BigDecimal("15"), 8,  EstadoCredito.ACTIVO);
        crearCredito(c1, cobrador2, admin,    new BigDecimal("20000"),  new BigDecimal("10"), 4,  EstadoCredito.CERRADO);
        crearCredito(c2, cobrador1, admin,    new BigDecimal("80000"),  new BigDecimal("20"), 12, EstadoCredito.EN_MORA);
        crearCredito(c2, cobrador2, analista, new BigDecimal("15000"),  new BigDecimal("5"),  3,  EstadoCredito.CANCELADO);
        crearCredito(c3, cobrador1, admin,    new BigDecimal("100000"), new BigDecimal("18"), 6,  EstadoCredito.ACTIVO);
        crearCredito(c3, cobrador2, analista, new BigDecimal("45000"),  new BigDecimal("10"), 8,  EstadoCredito.EN_MORA);
        crearCredito(c4, cobrador3, admin,    new BigDecimal("60000"),  new BigDecimal("12"), 6,  EstadoCredito.ACTIVO);
        crearCredito(c4, cobrador1, analista2,new BigDecimal("30000"),  new BigDecimal("8"),  4,  EstadoCredito.CERRADO);
        crearCredito(c5, cobrador2, admin,    new BigDecimal("90000"),  new BigDecimal("22"), 12, EstadoCredito.EN_MORA);
        crearCredito(c5, cobrador3, analista, new BigDecimal("25000"),  new BigDecimal("8"),  4,  EstadoCredito.CANCELADO);
        crearCredito(c6, cobrador1, admin,    new BigDecimal("40000"),  new BigDecimal("15"), 6,  EstadoCredito.ACTIVO);
        crearCredito(c7, cobrador2, analista2,new BigDecimal("70000"),  new BigDecimal("18"), 10, EstadoCredito.ACTIVO);
        crearCredito(c7, cobrador3, admin,    new BigDecimal("12000"),  new BigDecimal("5"),  3,  EstadoCredito.CANCELADO);
        crearCredito(c8, cobrador1, analista, new BigDecimal("55000"),  new BigDecimal("20"), 8,  EstadoCredito.EN_MORA);
        crearCredito(c8, cobrador2, admin,    new BigDecimal("18000"),  new BigDecimal("10"), 6,  EstadoCredito.CERRADO);
        crearCredito(c9, cobrador3, admin,    new BigDecimal("110000"), new BigDecimal("25"), 12, EstadoCredito.EN_MORA);
        crearCredito(c9, cobrador1, analista2,new BigDecimal("33000"),  new BigDecimal("10"), 6,  EstadoCredito.ACTIVO);
        crearCredito(c10,cobrador2, admin,    new BigDecimal("48000"),  new BigDecimal("15"), 8,  EstadoCredito.CERRADO);
        crearCredito(c10,cobrador3, analista, new BigDecimal("75000"),  new BigDecimal("18"), 10, EstadoCredito.ACTIVO);
        crearCredito(c1, cobrador1, analista, new BigDecimal("35000"),  new BigDecimal("12"), 6,  EstadoCredito.ACTIVO);
        crearCredito(c2, cobrador3, admin,    new BigDecimal("22000"),  new BigDecimal("8"),  4,  EstadoCredito.CERRADO);
        crearCredito(c3, cobrador1, analista2,new BigDecimal("66000"),  new BigDecimal("16"), 8,  EstadoCredito.ACTIVO);
        crearCredito(c5, cobrador2, admin,    new BigDecimal("44000"),  new BigDecimal("11"), 6,  EstadoCredito.EN_MORA);

        // ── Etiquetas ─────────────────────────────────────────
        Etiqueta eUrgente      = save("Urgente",       "#d72b31", "Requiere atención inmediata");
        Etiqueta eImportante   = save("Importante",    "#e94a22", "Alta prioridad");
        Etiqueta ePendiente    = save("Pendiente",     "#f69e31", "Pendiente de revisión");
        Etiqueta eSeguimiento  = save("Seguimiento",   "#b7ba03", "Requiere seguimiento activo");
        Etiqueta ePagado       = save("Pagado",        "#60c04c", "Caso pagado");
        Etiqueta eActivo       = save("Activo",        "#21917b", "Caso activo en el sistema");
        Etiqueta eInfo         = save("Info",          "#225575", "Información general");
        Etiqueta eArchivado    = save("Archivado",     "#5f3675", "Caso archivado");
        Etiqueta eMora         = save("En mora",       "#d72b31", "Cliente con cuotas vencidas");
        Etiqueta eRefinanciado = save("Refinanciado",  "#e94a22", "Crédito refinanciado");
        Etiqueta eNuevo        = save("Nuevo cliente", "#21917b", "Cliente reciente");
        Etiqueta eVIP          = save("VIP",           "#5f3675", "Cliente de alta prioridad comercial");
        Etiqueta eContactar    = save("Contactar",     "#f69e31", "Pendiente de llamado");
        Etiqueta eVerificado   = save("Verificado",    "#60c04c", "Datos verificados");
        Etiqueta eDocumentacion= save("Documentación", "#225575", "Falta documentación");
        Etiqueta eGarantia     = save("Garantía",      "#b7ba03", "Requiere garantía adicional");
        Etiqueta eRiesgo       = save("Riesgo alto",   "#d72b31", "Perfil de riesgo elevado");
        Etiqueta eJudicial     = save("Judicial",      "#5f3675", "En proceso judicial");
        Etiqueta eRecuperable  = save("Recuperable",   "#60c04c", "Deuda potencialmente recuperable");

        // ── Asignaciones ─────────────────────────────────────
        // c1 → TODAS las etiquetas (stress test visual)
        clienteEtiquetaRepository.saveAll(List.of(
            asignar(c1, eUrgente,      admin),
            asignar(c1, eImportante,   admin),
            asignar(c1, ePendiente,    analista),
            asignar(c1, eSeguimiento,  analista),
            asignar(c1, ePagado,       cobrador1),
            asignar(c1, eActivo,       admin),
            asignar(c1, eInfo,         analista2),
            asignar(c1, eArchivado,    cobrador2),
            asignar(c1, eMora,         admin),
            asignar(c1, eRefinanciado, analista),
            asignar(c1, eNuevo,        admin),
            asignar(c1, eVIP,          admin),
            asignar(c1, eContactar,    cobrador1),
            asignar(c1, eVerificado,   analista),
            asignar(c1, eDocumentacion,admin),
            asignar(c1, eGarantia,     analista2),
            asignar(c1, eRiesgo,       admin),
            asignar(c1, eJudicial,     cobrador2),
            asignar(c1, eRecuperable,  admin),

            asignar(c2, eSeguimiento,  admin),
            asignar(c2, eActivo,       cobrador1),
            asignar(c2, eInfo,         analista),
            asignar(c2, eVIP,          admin),
            asignar(c2, eContactar,    cobrador2),

            asignar(c3, ePagado,       admin),
            asignar(c3, eArchivado,    cobrador2),
            asignar(c3, eUrgente,      admin),
            asignar(c3, eMora,         analista),

            asignar(c4, eNuevo,        analista),
            asignar(c4, eVerificado,   admin),
            asignar(c4, eGarantia,     analista2),

            asignar(c5, eRiesgo,       admin),
            asignar(c5, eMora,         cobrador3),
            asignar(c5, eJudicial,     admin),

            asignar(c6, eImportante,   analista2),
            asignar(c6, eContactar,    cobrador1),

            asignar(c7, eActivo,       cobrador2),
            asignar(c7, eVIP,          admin),
            asignar(c7, eVerificado,   analista),

            asignar(c8, ePendiente,    admin),
            asignar(c8, eDocumentacion,analista),

            asignar(c9, eRefinanciado, admin),
            asignar(c9, eRecuperable,  cobrador3),
            asignar(c9, eRiesgo,       analista2),

            asignar(c10, eJudicial,    admin),
            asignar(c10, eArchivado,   cobrador2)
        ));

        System.out.println(">>> AdminInitializerConfig: datos de prueba cargados.");
    }

    // ── Helpers ───────────────────────────────────────────────
    private Etiqueta save(String nombre, String color, String descripcion) {
        return etiquetaRepository.save(
            Etiqueta.builder().nombre(nombre).color(color).descripcion(descripcion).build()
        );
    }

    private ClienteEtiqueta asignar(Cliente cliente, Etiqueta etiqueta, Usuario usuario) {
        return ClienteEtiqueta.builder()
                .cliente(cliente)
                .etiqueta(etiqueta)
                .asignadoPorId(usuario)
                .build();
    }

    // sobrecarga para el caso fraude donde pasás la etiqueta directo
    private ClienteEtiqueta eFraudeAdmin(Etiqueta etiqueta, Usuario usuario) {
        return ClienteEtiqueta.builder()
                .cliente(null) // se sobreescribe en el saveAll
                .etiqueta(etiqueta)
                .asignadoPorId(usuario)
                .build();
    }

    private void crearCredito(Cliente cliente, Usuario cobrador, Usuario creadoPor,
                               BigDecimal monto, BigDecimal interes, int cantidad,
                               EstadoCredito estado) {

        BigDecimal factor     = BigDecimal.ONE.add(interes.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP));
        BigDecimal montoCuota = monto.multiply(factor).divide(BigDecimal.valueOf(cantidad), 2, RoundingMode.HALF_UP);

        Credito credito = creditoRepository.save(Credito.builder()
                .cliente(cliente).cobrador(cobrador).creadoPor(creadoPor)
                .monto(monto).cantidadCuotas(cantidad).interes(interes).estado(estado)
                .build());

        List<Cuota> cuotas = new ArrayList<>();
        for (int i = 1; i <= cantidad; i++) {
            cuotas.add(Cuota.builder()
                    .credito(credito).numeroCuota(i)
                    .fechaVencimiento(LocalDate.now().plusDays(7L * i))
                    .monto(montoCuota).montoRecargo(BigDecimal.ZERO)
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