# TP Grupo 13 — Aplicaciones Interactivas UADE 1C 2026

Sistema de gestión de créditos interno desarrollado como trabajo práctico obligatorio para la materia
**Aplicaciones Interactivas (3.4.082)** de la UADE.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Java 21 + Spring Boot 3.4.3 |
| Persistencia | Spring Data JPA + Hibernate |
| Base de datos | H2 (en memoria) |
| Seguridad | Spring Security + JWT (jjwt 0.12.6) |
| Build | Maven |
| Frontend | React 18 + Vite 7 |
| Routing | React Router v7 |
| Estado global | Redux Toolkit + React-Redux |

---

## Estructura del proyecto

```
proyecto/
├── backend/
│   └── src/
│       └── main/
│           └── java/com/uade/tp13/
│               ├── config/
│               ├── controller/
│               ├── dto/
│               │   ├── request/
│               │   └── response/
│               ├── enums/
│               ├── exception/
│               ├── mapper/
│               ├── model/
│               ├── repository/
│               ├── scheduler/
│               ├── security/
│               ├── service/
│               └── TpGrupo13.java
└── frontend/
    └── (por definir)
```

---

## Modelo de datos

### Cliente
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| nombre | String | Nombre completo |
| dni | String | DNI |
| email | String | Email único |
| telefono | String | Número de teléfono |
| domicilio | String | Domicilio |
| estado | Boolean | Estado Activo/Inactivo |
| fechaCreacion | LocalDateTime | Fecha de creación |
| creadoPor | Usuario (FK) | Usuario creador |

### Usuario
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| nombre | String | Nombre completo |
| email | String | Email único |
| password | String | Contraseña encriptada |
| rol | ROL_USUARIO | Admin/Analista/Cobrador |
| estado | Boolean | Estado Activo/Inactivo |
| fechaCreacion | LocalDateTime | Fecha de creación |

### Credito
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| cliente | Cliente (FK) | Receptor del credito |
| cobrador | Usuario (FK)| Cobrador asignado que registra pagos |
| creadoPor | Usuario (FK) | Usuario creador Admin/Analista |
| monto | BigDecimal | Monto base (cantidad recibida por el cliente) |
| cantidadCuotas | Integer | Número de cuotas |
| interes | BigDecimal | Interés del crédito aplicado en cuotas |
| estado | EstadoCredito | Estado del crédito ACTIVO/EN_MORA/CANCELADO/CANCELADO_REFINANCIACION/CERRADO |
| fechaCreacion | LocalDateTime | Fecha de creación |
| cuotas | List<Cuota> (FK) | Lista de cuotas del crédito |

### Cuota
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| credito | Credito (FK)| Crédito al que pertenece |
| fechaVencimiento | LocalDate | Vencimiento mensual auto-generado |
| numeroCuota | Integer | Id local |
| monto | BigDecimal | Monto base de la cuota |
| montoRecargo | BigDecimal | Monto agregado en mora |
| estado | EstadoCuota | PAGADA/VENCIDA/PENDIENTE |
| pago | Pago (FK) | Pago realizado de la cuota |

> Al crear un crédito se generan automáticamente N cuotas con vencimiento semanal.

### Pago
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| cuota | Cuota (FK) | Cuota asociada al pago |
| fechaPagado | LocalDateTime | Fecha registrada del pago |
| monto | BigDecimal | Monto pagado |
| metodo | MetodoPago | Metodo del pago EFECTIVO/TARJETA/TRANSFERENCIA/OTRO |
| cobradoPor | Usuario (FK) | Cobrador registrado del pago |
| observaciones | String | Informacion adicional agregado |

### Etiqueta
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| nombre | String | Nombre normalizado |
| color | String | Color asignado |
| descripcion | String | Descripcion adicional |
| fechaCreacion | LocalDate | Fecha creación |
| fechaModificacion | LocalDate | Fecha última modificación |

### ClienteEtiqueta
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long (PK) | Id interno |
| cliente | Cliente (FK) | Cliente asignado |
| etiqueta | Etiqueta (FK) | Etiqueta asignada |
| asignadoPorId | Usuario (FK) | Usuario asignador de etiqueta a cliente |
| asignadoEn | LocalDate | Fecha asignación |

---

## API REST

### Autenticación (pública)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/auth/login` | Iniciar sesión, devuelve token JWT | Ninguno |
| POST | `/api/auth/logout` | Cerrar sesión, blacklist token JWT | Ninguno |

### Cliente (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/clientes` | Crear cliente | Por Definir |
| GET | `/api/clientes` | Listar clientes con filtros (nombre, estado, creadoPorId, paginado) | Por Definir |
| GET | `/api/clientes/{id}` | Buscar por ID | Por Definir |
| GET | `/api/clientes/dni/{dni}` | Buscar por DNI | Por Definir |
| GET | `/api/clientes/{id}/ficha` | Obtener ficha completa del cliente | Por Definir |
| GET | `/api/clientes/dni/{dni}/ficha` | Obtener ficha completa del cliente por DNI | Por Definir |
| PUT | `/api/clientes/{id}` | Editar cliente | Por Definir |
| PATCH | `/api/clientes/{id}/estado` | Activar/desactivar cliente | Por Definir |

### Crédito (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/creditos` | Crear crédito (genera cuotas automáticamente) | Por Definir |
| POST | `/api/creditos/preview` | Previsualizar plan de cuotas sin confirmar | Por Definir |
| GET | `/api/creditos/{id}` | Buscar por ID (incluye cuotas con estado pagada/pendiente) | Por Definir |
| GET | `/api/creditos` | Listar créditos con filtros (estado, clienteId, cobradorId, creadoPorId, paginado) | Por Definir |
| PATCH | `/api/creditos/{id}/cobrador` | Cambiar cobrador asignado | Por Definir |
| PATCH | `/api/creditos/{id}/cancelar` | Cancelar crédito | Por Definir |

### Cuota (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/api/creditos/{creditoId}/cuotas` | Listar todas las cuotas de un crédito | Por Definir |
| GET | `/api/creditos/{creditoId}/cuotas/pendientes` | Listar cuotas pendientes | Por Definir |
| GET | `/api/creditos/{creditoId}/cuotas/vencidas` | Listar cuotas vencidas | Por Definir |

### Pago (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/pagos/registrar/{cuotaId}` | Registrar pago de una cuota (método, observaciones) | Por Definir |
| GET | `/api/pagos/credito/{creditoId}` | Obtener pagos de un crédito | Por Definir |
| DELETE | `/api/pagos/{pagoId}` | Cancelar un pago | Por Definir |

### Mora (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/mora/forzar/{creditoId}` | Forzar mora manualmente sobre un crédito | Por Definir |

### Etiqueta (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/etiquetas` | Crear etiqueta | Por Definir |
| GET | `/api/etiquetas` | Listar/buscar etiquetas con filtros (nombre, color, paginado) | Por Definir |
| GET | `/api/etiquetas/{id}` | Obtener etiqueta por ID | Por Definir |
| PUT | `/api/etiquetas/{id}` | Modificar etiqueta | Por Definir |
| DELETE | `/api/etiquetas/{id}` | Eliminar etiqueta (param: forzar) | Por Definir |

### ClienteEtiqueta (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/clientes-etiquetas/{clienteId}/etiquetas/{etiquetaId}` | Asignar etiqueta a cliente | Por Definir |
| GET | `/api/clientes-etiquetas/cliente/{clienteId}` | Obtener etiquetas de un cliente (paginado) | Por Definir |
| GET | `/api/clientes-etiquetas/resumen` | Resumen estadístico de etiquetas (paginado) | Por Definir |
| DELETE | `/api/clientes-etiquetas/{idAsignacion}` | Quitar etiqueta de un cliente | Por Definir |

### Usuario (requiere JWT)
| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/usuarios` | Crear usuario | Por Definir |
| GET | `/api/usuarios` | Listar usuarios con filtros (nombre, rol, estado, paginado) | Por Definir |
| PUT | `/api/usuarios/{id}` | Editar usuario | Por Definir |
| PATCH | `/api/usuarios/{id}/estado` | Activar/desactivar usuario | Por Definir |
| PATCH | `/api/usuarios/{id}/password` | Resetear contraseña | Por Definir |

---




## Frontend React + Redux (POR DEFINIR)


## Cómo correr el proyecto

### Backend
```bash
cd backend
mvn spring-boot:run
# Corre en http://localhost:8080
# Consola H2: http://localhost:8080/h2-console
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Corre en http://localhost:5173
```

---

## Temas de la materia cubiertos

| Unidad | Tema | Implementado en |
|--------|------|----------------|
| I | Spring Boot, arquitectura, estructura de proyectos | `/backend` |
| II | Hibernate/JPA, entidades, repositorios | `/moderl`, `/repository` |
| II | Seguridad con JWT | `/security` |
| III | React + Vite, componentes, props | (Por Definir) |
| III | React Hooks (`useState`, `useEffect`) | /frontend |
| III | React Router | (Por Definir) |
| IV | Fetch, consumo de API | `/api` |
| IV | Renderizado condicional | Estados de carga + error en cada página |
| V | Redux I y II: acciones, reducers, store, thunks | `store/slices/`, `store/index.js` |
