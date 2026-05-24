# TP Grupo 13 — Aplicaciones Interactivas UADE 1C 2026

Sistema de gestión de créditos interno desarrollado como trabajo práctico obligatorio para la materia
**Aplicaciones Interactivas (3.4.082)** de la UADE.

---

## Módulos Incluídos

### Cliente
Incluye la gestión de clentes externos, quienes no forman parte de los usuarios del sistema. Las operaciones más relevantes son la alta, la modificación de sus datos, la baja lógica y el listaje.

### Usuario
Incluye la gestión de los usuarios del sistema, siendo los empleados internos. Los roles asignables son ADMIN, ANALISTA, y COBRADOR, los cuales van a tener autorizaciones y permisos diferentes según sus responsabilidades.

### Crédito
Incluye la gestión de créditos asignados a un cliente, junto a un cobrador designado, y las cuotas y pagos relacionados. Las operaciones mas relevantes son la creación, el listaje, y la cancelación de créditos, el listaje de cuotas por estado, y la realización total y cancelación de pagos.

### Mora
Incluye la gestión automática de créditos en mora. El propósito de este módulo es la adición de una penalización si no se pagan las cuotas en su debido tiempo. Las operaciónes más relevantes son la evaluación diaria de créditos, para establecerlos en estado EN_MORA junto a un recargo adicional de sus cuotas, y la evaluación del estado de mora al cancelar un pago de una cuota.

### Etiqueta
Incluye la gestión de etiquetas y asignaciones de las mismas a los clientes. El propósito de este módulo es la agregación de un pantallazo general del cliente de forma conscisa, para apoyar la toma de desición durante la aprobación de un crédito. Las operaciones más relevantes son la creación, modificación y eliminación de etiquetas, y la asignación/desasignación de estas a un cliente existente.


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
| UI / Estilos | CSS Modules + TailwindCSS |
| Iconografía | Lucide React |

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
    └── src/
        ├── api/                             
        ├── components/
        │      ├── common/              
        │      ├── creditos/
        │      ├── usuarios/
        │      ├── layout/
        │      └── ui/
        ├── hooks/
        ├── pages/
        │   ├── auth/
        │   ├── clientes/
        │   ├── creditos/
        │   ├── etiquetas/
        │   └── usuarios/
        ├── store/                       
        └── utils/


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


---
## Estética

La interfaz fue diseñada utilizando una combinación de tonos blancos, grises suaves y acentos azules con el objetivo de transmitir claridad visual, confianza y profesionalismo.

La elección del color azul responde tanto a criterios estéticos como psicológicos y contextuales del dominio financiero y de gestión de créditos, siendo estos:


### Justificación visual y contextual

| Elemento | Justificación |
|---|---|
| Azul principal | Asociado a confianza, seguridad y estabilidad |
| Blanco y grises claros | Mejoran legibilidad y reducen fatiga visual |
| Contrastes suaves | Favorecen lectura prolongada y uso administrativo |
| Íconos e indicadores azules | Refuerzan navegación y jerarquía visual |


### Relación con el dominio

Al tratarse de un sistema interno de gestión de créditos y cobranzas, se buscó mantener una estética sobria y profesional similar a plataformas bancarias y financieras modernas.

El uso de acentos azules permite:
- transmitir sensación de seguridad
- irradiar confiabilidad
- evitar una interfaz visualmente agresiva
- mantener foco en los datos y operaciones

### Diseño responsive

La interfaz fue desarrollada priorizando:
- distribución clara de información
- navegación simple
- reutilización visual y familiaridad

Cabe destacar que no se iplementó teniendo en cuenta la responsividad para diferentes dispositivos dado que en el contexto del proyecto, la aplicación va a ser utilizada exclusivamente en una computadora

---

## Paginas Implementadas
| Concepto | Ruta  | Funcionalidad  |
|---|---|---|
| Formulario Login | `/login` | Autenticación mediante JWT, acceso al sistema y guarda de token |
| Página Inicio | `/` | Navegación principal, página de landing principal |
| Listado de Clientes | `/clientes` | Búsqueda, filtros y listado paginado de clientes + creación |
| Cliente Único | `/clientes/:id` | Visualización y gestión completa del cliente, etiquetas y créditos |
| Listado de Créditos | `/creditos` | Listado paginado con filtros por estado y cobrador |
| Crédito Único | `/creditos/:id` | Detalle y gestión del crédito, cuotas y pagos asociados |
| Listado de Usuarios | `/usuarios` | Administración y visualización de usuarios internos + creación |
| Usuario Único | `/usuarios/:id` | Información detallada y edición de usuario |
| Listado de Etiquetas | `/etiquetas` | Listado y búsqueda de etiquetas |
| Etiqueta Única | `/etiquetas/:id` | Detalle y gestión de etiquetas + asignación/desasignación de etiquetas a clientes |

---

---

## Componentes Reutilizables
| Componente | Responsabilidad |
|---|---|
| `PaginatedContainer` | Manejo reutilizable de paginación, filtros y gestión de estados |
| `LoadingWrapper` | Estados de carga, error y vacío |
| `Modal` | Ventanas modales reutilizables |
| `ModalForm` | Formularios reutilizables dentro de modales |
| `Button` | Botones textuales reutilizables con/sin íconos |
| `IconButton` | Botones visuales con solo íconos |
| `FilterSearch` | Búsqueda con debounce |
| `Spinner` | Indicador visual de carga |
| `Dropdown` | Selectores reutilizables |
| `DataField` | Visualización label/valor para paginas de detalle |
| `ShowToast` | Sistema global de notificaciones visuales |


---

---

## Manejo de Estados Visuales
| Estado | Implementación | Objetivo |
|---|---|---|
| Loading | `LoadingWrapper` / `PaginatedContainer` / `Spinner` | Mostrar feedback visual durante cargas |
| Error | `LoadingWrapper` / `PaginatedContainer` | Centralizar errores de fetch |
| Empty State | `LoadingWrapper` / `PaginatedContainer` | Mostrar ausencia de datos de forma consistente |
| Paginación | `PaginatedContainer` | Navegación reutilizable entre páginas para listado paginado |
| Búsqueda | `FilterSearch` | Optimizar búsquedas mediante debounce |
| Feedback visual | `ShowToast` | Mostrar confirmaciones y errores globales |
| Modal abierto | `useLockBodyScroll` | Evitar scroll de fondo |
| Navegación protegida | `PrivateRoute` | Restringir acceso sin JWT |
| Render condicional | React conditional rendering | Mostrar contenido según estado |

---


---
## Justificación de Dependencias adicionales

### Lucide React
Utilizada para mejorar la visualización de acciones e iconografía del sistema mediante íconos SVG modernos y reutilizables.

### TailwindCSS
Utilizado parcialmente en la Home para acelerar el desarrollo visual y facilitar la construcción de layouts, con proyección de crecimiento constante de secciones.

---


---

## Estados Redux (POR DEFINIR)

---

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
| III | React + Vite, componentes, props |  `/frontend` |
| III | React Hooks (`useState`, `useEffect`) | `/frontend` |
| III | React Router | `/App.jsx`  |
| IV | Fetch, consumo de API | `/api/apiClient`, `/frontend` |
| IV | Renderizado condicional |  `/pages`,  `components/common/LoadingWrapper.jsx`, `components/common/PaginatedContainer.jsx` |
| V | Redux I y II: acciones, reducers, store, thunks | (por definir) |
