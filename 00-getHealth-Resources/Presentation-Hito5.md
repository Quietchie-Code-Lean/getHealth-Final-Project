# getHealth — Hito 5
## Presentación del proyecto

---

# Diapositiva 1 — getHealth

## Plataforma web para la gestión y agendamiento de citas médicas

### Integrantes

- Leandro Funes
- Lisandro Alvaravado

**Hito 5 — Presentación del proyecto**

<img width="815" height="461" alt="imagen" src="https://github.com/user-attachments/assets/8ceae40e-5613-4abc-9ac7-817069447b90" />


---

# Diapositiva 2 — La necesidad

## Paciente

- Buscar profesionales según su especialidad.
- Conocer su disponibilidad.
- Seleccionar fecha y horario.
- Gestionar sus citas.

## Profesional

- Gestionar su disponibilidad.
- Consultar las citas asignadas.
- Organizar su agenda.

### Necesidad

Contar con una plataforma que centralice el proceso de búsqueda,
disponibilidad y agendamiento de citas médicas.

<img width="815" height="459" alt="imagen" src="https://github.com/user-attachments/assets/c764d4b3-85ba-4e79-9a7f-fdec782ff1d1" />

---

# Diapositiva 3 — Arquitectura del sistema

## getHealth

### Frontend

**React + Vite**

- Interfaz para pacientes y profesionales.
- Navegación y experiencia de usuario.
- Gestión de sesiones y roles.
- Consumo de la API REST.

### Backend

**Node.js + Express**

- Autenticación y autorización.
- Lógica de negocio.
- Validaciones.
- Gestión de usuarios, profesionales, especialidades,
  disponibilidad y citas.

### Comunicación

**REST API**

Frontend y Backend se comunican mediante endpoints HTTP
utilizando datos en formato JSON.

### Persistencia

**Prisma + PostgreSQL**

Prisma gestiona el acceso a los datos almacenados en PostgreSQL.

<img width="815" height="457" alt="imagen" src="https://github.com/user-attachments/assets/e2f86019-a193-44ba-9868-e61c4289dd40" />

---

# Diapositiva 4 — Backend: API y lógica de negocio

## REST API

Permite que el frontend de getHealth se comunique con el backend
para consultar y gestionar usuarios, profesionales, especialidades,
disponibilidad y citas.

## Routes

Definen los endpoints de getHealth para las funcionalidades
de autenticación, usuarios, profesionales, especialidades,
disponibilidad y citas.

## Middleware

Protegen las funcionalidades mediante autenticación con JWT
y control de acceso según el rol del usuario:
**PATIENT** o **PROFESSIONAL**.

## Controllers

Reciben las solicitudes realizadas desde el frontend
y coordinan la operación correspondiente.

## Services

Contienen las reglas de negocio de getHealth, como la validación
de disponibilidad y la prevención de conflictos al agendar citas.

## Prisma

Gestiona desde el backend las operaciones sobre los datos
de getHealth.

## PostgreSQL

Almacena la información de usuarios, profesionales,
especialidades, disponibilidad y citas.

### Idea principal

**Cada capa tiene una responsabilidad específica,
permitiendo separar comunicación, seguridad,
lógica de negocio y persistencia.**

<img width="813" height="460" alt="imagen" src="https://github.com/user-attachments/assets/ebedd031-8c52-4bc5-aa0a-74b71705bd33" />

---

# Diapositiva 5 — Frontend: experiencia e integración

## React + Vite

Construye la interfaz de getHealth y permite gestionar
las acciones de pacientes y profesionales.

## Navegación

Organiza el acceso a las vistas públicas y privadas
según el flujo de la aplicación.

## Autenticación y roles

Mantiene la sesión mediante JWT y diferencia las funcionalidades
de **PATIENT** y **PROFESSIONAL**.

## Componentes y estado

Gestionan formularios, especialidades, profesionales,
fechas, horarios y citas.

## Servicios

Conectan el frontend con los endpoints del backend
para consultar y enviar información.

## Integración con la API

Las acciones realizadas por el usuario generan solicitudes
al backend y la interfaz se actualiza con las respuestas recibidas.

### Idea principal

**El Frontend transforma las funcionalidades del backend
en una experiencia de usuario para pacientes y profesionales.**

<img width="816" height="462" alt="imagen" src="https://github.com/user-attachments/assets/7611cc8c-f51e-4619-be22-c4ee2451b447" />

---

# Diapositiva 6 — Despliegue y puesta en producción

## Frontend — Vercel

El frontend de getHealth, desarrollado con React y Vite,
se despliega en Vercel, permitiendo acceder a la aplicación
desde un entorno web.

## Backend — Render

El backend, desarrollado con Node.js y Express,
se despliega en Render como servicio independiente.
Allí se ejecutan la API, la autenticación,
las validaciones y la lógica de negocio.

## Base de datos — PostgreSQL

La información de la aplicación se almacena en PostgreSQL.
Prisma permite gestionar desde el backend la comunicación
con la base de datos.

## Integración

Frontend y Backend se conectan mediante la API REST,
permitiendo que las acciones realizadas por el usuario
se procesen en el backend y se almacenen los resultados.

## Resultado

**getHealth funciona como una aplicación Full Stack integrada,
con frontend, backend y base de datos desplegados
en un entorno de producción.**

### De la necesidad al desarrollo y a una aplicación funcionando.

<img width="815" height="458" alt="imagen" src="https://github.com/user-attachments/assets/2ffc793b-4391-465a-b5ce-d467dda75066" />
