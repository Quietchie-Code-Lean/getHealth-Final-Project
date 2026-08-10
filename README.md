

# 3. Technology Stack

The project uses a React frontend and a Node.js/Express backend, with Prisma managing the PostgreSQL database hosted on Neon.

## Technologies

### Frontend
- React
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL on Neon


## Dependencies

### Authentication
- JWT
- bcrypt

### Utilities
- dotenv
- cors
- nodemon


## Frontend Setup
![Frontend Installation](./00-getHealth-Resources/Frontend-Installation.png)

```bash
npm create vite@latest 
npm install
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom@latest  OR npm install react-router-dom@7.11.0 
npm install axios 
```


## Backend Setup
![Backend Installation](./00-getHealth-Resources/Backend-Installation.png)

```bash
npm init -y
npm install express
npm install cors
npm install dotenv
npm install bcrypt
npm install @prisma/client
npm install @prisma/adapter-pg
npm install pg
```

### Development dependencies

```bash
npm install -D nodemon prisma 
npm install -D prettier 
```




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

The REST API is organized by domain. The list below provides a quick endpoint overview; the complete contract is maintained in a separate Markdown document.

## API Contract

For detailed request bodies, responses, access rules, status codes, and error cases, see the dedicated API documentation:

**[View the complete REST API Contract →](./00-getHealth-Resources/API-Contract.md)**


### Authentication

- `POST /api/auth/register/patient`
- `POST /api/auth/register/professional`
- `POST /api/auth/login`
- `GET /api/auth/profile`


### Specialties

- `GET /api/specialties`
- `GET /api/specialties/:id`
- `POST /api/specialties`
- `PUT /api/specialties/:id`
- `PATCH /api/specialties/:id/status`


### Professionals

- `GET /api/professionals`
- `GET /api/professionals/:id`
- `PATCH /api/professionals/:id`
- `PATCH /api/professionals/:id/status`

- `POST /api/professionals/:id/specialties`
- `DELETE /api/professionals/:id/specialties/:specialtyId` 


### Availability

- `GET /api/professionals/:id/availability`
- `POST /api/professionals/:id/availability`
- `PUT /api/availability/:id`
- `DELETE /api/availability/:id`

- `GET /api/professionals/:id/available-slots` — *(This is going to be to incorporate the calendar)


### Appointments

- `POST /api/appointments`
- `GET /api/appointments/me`
- `GET /api/appointments/:id`
- `PATCH /api/appointments/:id/reschedule`
- `PATCH /api/appointments/:id/cancel`
- `PATCH /api/appointments/:id/status`
