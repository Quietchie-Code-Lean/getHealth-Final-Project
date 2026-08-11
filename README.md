---

# 1. Interface Design

The initial interface design defines the main structure, navigation, and user experience of the getHealth application.

The documentation includes the initial wireframes for the main views, including the Home, Specialties, Professionals, Profiles, Authentication, and Appointment Scheduling views.

[**View the complete Interface Design →**](00-getHealth-Resources/Interface-Design.md)

---

# 2. Navigation Between Views

The getHealth application defines public and private views, with private views requiring user authentication.

The complete navigation structure and access classification are documented in:

[View the complete Navigation Definition →](./00-getHealth-Resources/Navigation-Views.md)

---

# 3. Technology Stack

The project uses a React frontend and a Node.js/Express backend, with Prisma ORM managing the PostgreSQL database hosted on Neon.

## Frontend

- React
- React Router
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL on Neon

## Authentication

- JWT
- bcrypt

## Development Tools

- dotenv
- cors
- nodemon
- Prettier

For detailed installation and configuration instructions:

[**View the Setup Guide →**](00-getHealth-Resources/Setup-Guide.md)

---

# 4. Database Design

The application uses PostgreSQL as its relational database, hosted on Neon and managed through Prisma ORM.

The database is structured around the main entities required for user management, healthcare professionals, specialties, availability, and appointments.

The main entities include:

- Users
- Patient Profiles
- Professional Profiles
- Specialties
- Professional Specialties
- Availabilities
- Appointments

For the complete entity-relationship diagram, database tables, fields, and relationships:

[**View the complete Database Design →**](00-getHealth-Resources/Database-Design.md)

---

# 5. REST API

The REST API is organized by domain and provides the endpoints required for authentication, specialty management, healthcare professionals, availability, and appointments.

The main API domains are:

- Authentication
- Specialties
- Professionals
- Availability
- Appointments

The complete API contract includes request bodies, response structures, access rules, HTTP status codes, and error handling.

[**View the complete REST API Contract →**](00-getHealth-Resources/API-Contract.md)
