# Database Design

The following entity-relationship diagram represents the initial database structure and the relationships between the main entities.

## Entity Relationship Diagram

![getHealth Entity Relationship Diagram](./ERD-Database.png)

## Database Tables

### `users`

- id
- first_name
- last_name
- email
- password_hash
- role
- is_active
- created_at
- updated_at

### `patient_profiles`

- id
- user_id
- phone
- date_of_birth
- identification_number

### `professional_profiles`

- id
- user_id
- license_number
- biography
- approval_status

### `specialties`

- id
- name
- description
- is_active
- created_at
- updated_at

### `professional_specialties`

- id
- professional_id
- specialty_id
- created_at

### `availabilities`

- id
- professional_id
- weekday
- start_time
- end_time
- slot_duration
- available_slot
- created_at
- updated_at

### `appointments`

- id
- patient_id
- professional_id
- specialty_id
- appointment_date
- start_time
- end_time
- status
- reason
- cancellation_reason
- created_at
- updated_at
