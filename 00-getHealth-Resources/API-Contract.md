# getHealth — REST API Contract


## Contents

- [Authentication](#authentication)
- [Specialties](#specialties)
- [Professionals](#professionals)
- [Availability](#availability)
- [Appointments](#appointments)

---

## Authentication

<details>
  <summary><strong><code>POST /api/auth/register/patient</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
body: {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: String,
    date_of_birth: Date,
    identification_number: String
}
```

#### Response

```text
201 Created

body: {
    message: String,
    user: {
        id: Number,
        email: String,
        role: "PATIENT",
        is_active: Boolean
    },
    patient_profile: {
        id: Number,
        user_id: Number,
        phone: String,
        date_of_birth: Date,
        identification_number: String
    }
}
```

#### Errors

**400 Bad Request**
- Missing required fields
- Invalid input data

**409 Conflict**
- Email already registered
- Identification number already registered

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>POST /api/auth/register/professional</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
body: {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    license_number: String,
    date_of_birth: Date,
    identification_number: String
}
```

#### Response

```text
201 Created

body: {
    message: String,
    user: {
        id: Number,
        email: String,
        role: "PROFESSIONAL",
        is_active: Boolean
    },
    professional_profile: {
        id: Number,
        user_id: Number,
        license_number: String,
        approval_status: "PENDING",
        date_of_birth: Date,
        identification_number: String
    }
}
```

#### Errors

**400 Bad Request**
- Missing required fields
- Invalid input data

**409 Conflict**
- Email already registered
- License number already registered
- Identification number already registered

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>POST /api/auth/login</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
body: {
    email: String,
    password: String
}
```

#### Response

```text
200 OK

body: {
    message: String,
    token: String,
    user: {
        id: Number,
        first_name: String,
        last_name: String,
        email: String,
        role: String
    }
}
```

#### Errors

**400 Bad Request**
- Email and password are required

**401 Unauthorized**
- Invalid email or password

**403 Forbidden**
- User account is inactive

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>GET /api/auth/profile</code></strong></summary>

**Access**

`AUTHENTICATED`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}
```

#### Response

```text
200 OK

body: {
    user: {
        id: Number,
        first_name: String,
        last_name: String,
        email: String,
        role: String,
        is_active: Boolean
    },
    profile: Object
}
```

#### Errors

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**404 Not Found**
- User profile not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

## Specialties

<details>
  <summary><strong><code>GET /api/specialties</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
None
```

#### Response

```text
200 OK

body: {
    specialties: [
        {
            id: Number,
            name: String,
            description: String,
            is_active: Boolean,
            created_at: Date,
            updated_at: Date
        }
    ]
}
```

#### Errors

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>GET /api/specialties/:id</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
params: {
    id: Number
}
```

#### Response

```text
200 OK

body: {
    specialty: {
        id: Number,
        name: String,
        description: String,
        is_active: Boolean,
        created_at: Date,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid specialty id

**404 Not Found**
- Specialty not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>POST /api/specialties</code></strong></summary>

**Access**

`ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

body: {
    name: String,
    description: String
}
```

#### Response

```text
201 Created

body: {
    message: String,
    specialty: {
        id: Number,
        name: String,
        description: String,
        is_active: Boolean,
        created_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Name is required
- Invalid input data

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Admin role required

**409 Conflict**
- Specialty already exists

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PUT /api/specialties/:id</code></strong></summary>

**Access**

`ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    name: String,
    description: String,
    is_active: Boolean
}
```

#### Response

```text
200 OK

body: {
    message: String,
    specialty: {
        id: Number,
        name: String,
        description: String,
        is_active: Boolean,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid specialty id
- Invalid input data

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Admin role required

**404 Not Found**
- Specialty not found

**409 Conflict**
- Specialty name already exists

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PATCH /api/specialties/:id/status</code></strong></summary>

**Access**

`ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    is_active: Boolean
}
```

#### Response

```text
200 OK

body: {
    message: String,
    specialty: {
        id: Number,
        name: String,
        is_active: Boolean,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid specialty id
- is_active must be a Boolean

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Admin role required

**404 Not Found**
- Specialty not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

## Professionals

<details>
  <summary><strong><code>GET /api/professionals</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
query: {
    specialty_id: Number,   // optional
    is_active: Boolean      // optional
}
```

#### Response

```text
200 OK

body: {
    professionals: [
        {
            id: Number,
            user_id: Number,
            first_name: String,
            last_name: String,
            license_number: String,
            biography: String,
            approval_status: String,
            specialties: [
                {
                    id: Number,
                    name: String
                }
            ]
        }
    ]
}
```

#### Errors

**400 Bad Request**
- Invalid query parameters

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>GET /api/professionals/:id</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
params: {
    id: Number
}
```

#### Response

```text
200 OK

body: {
    professional: {
        id: Number,
        user_id: Number,
        first_name: String,
        last_name: String,
        license_number: String,
        biography: String,
        approval_status: String,
        specialties: [
            {
                id: Number,
                name: String
            }
        ]
    }
}
```

#### Errors

**400 Bad Request**
- Invalid professional id

**404 Not Found**
- Professional not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PATCH /api/professionals/:id</code></strong></summary>

**Access**

- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    biography: String,
    license_number: String,
    date_of_birth: Date,
    identification_number: String
}
```

#### Response

```text
200 OK

body: {
    message: String,
    professional: {
        id: Number,
        user_id: Number,
        license_number: String,
        biography: String,
        date_of_birth: Date,
        identification_number: String,
        approval_status: String,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid professional id
- Invalid input data

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Professional can only modify their own profile
- Admin role required for restricted changes

**404 Not Found**
- Professional not found

**409 Conflict**
- License number already registered

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PATCH /api/professionals/:id/status</code></strong></summary>

**Access**

`ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    approval_status: String
}
```

**Allowed values**

- `"PENDING"`
- `"APPROVED"`
- `"REJECTED"`
- `"SUSPENDED"`

#### Response

```text
200 OK

body: {
    message: String,
    professional: {
        id: Number,
        approval_status: String,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid professional id
- Invalid approval status

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Admin role required

**404 Not Found**
- Professional not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>POST /api/professionals/:id/specialties</code></strong></summary>

**Access**

`ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    specialty_id: Number
}
```

#### Response

```text
201 Created

body: {
    message: String,
    professional_specialty: {
        professional_id: Number,
        specialty_id: Number
    }
}
```

#### Errors

**400 Bad Request**
- Invalid professional id
- Invalid specialty id

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Admin role required

**404 Not Found**
- Professional not found
- Specialty not found

**409 Conflict**
- Specialty already assigned to this professional

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>DELETE /api/professionals/:id/specialties/:specialtyId</code></strong></summary>

**Access**

`ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number,
    specialtyId: Number
}
```

#### Response

```text
200 OK

body: {
    message: "Specialty removed from professional successfully"
}
```

#### Errors

**400 Bad Request**
- Invalid professional id
- Invalid specialty id

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Admin role required

**404 Not Found**
- Professional-specialty relationship not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

## Availability

<details>
  <summary><strong><code>GET /api/professionals/:id/availability</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
params: {
    id: Number
}
```

#### Response

```text
200 OK

body: {
    professional_id: Number,
    availability: [
        {
            id: Number,
            weekday: String,
            start_time: String,
            end_time: String,
            slot_duration: Number,
            is_active: Boolean
        }
    ]
}
```

#### Errors

**400 Bad Request**
- Invalid professional id

**404 Not Found**
- Professional not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>POST /api/professionals/:id/availability</code></strong></summary>

**Access**

- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    weekday: String,
    start_time: String,
    end_time: String,
    slot_duration: Number
}
```

**Allowed weekday values**

- `"MONDAY"`
- `"TUESDAY"`
- `"WEDNESDAY"`
- `"THURSDAY"`
- `"FRIDAY"`
- `"SATURDAY"`
- `"SUNDAY"`

#### Response

```text
201 Created

body: {
    message: String,
    availability: {
        id: Number,
        professional_id: Number,
        weekday: String,
        start_time: String,
        end_time: String,
        slot_duration: Number,
        is_active: Boolean
    }
}
```

#### Errors

**400 Bad Request**
- Invalid professional id
- Invalid weekday
- Invalid time range
- Invalid slot duration

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Professional can only manage their own availability
- Admin role required for managing another professional

**404 Not Found**
- Professional not found

**409 Conflict**
- Availability overlaps with an existing schedule

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PUT /api/availability/:id</code></strong></summary>

**Access**

- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    weekday: String,
    start_time: String,
    end_time: String,
    slot_duration: Number,
    is_active: Boolean
}
```

#### Response

```text
200 OK

body: {
    message: String,
    availability: {
        id: Number,
        professional_id: Number,
        weekday: String,
        start_time: String,
        end_time: String,
        slot_duration: Number,
        is_active: Boolean,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid availability id
- Invalid weekday
- Invalid time range
- Invalid slot duration

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Professional can only modify their own availability
- Admin role required for managing another professional

**404 Not Found**
- Availability not found

**409 Conflict**
- Updated schedule overlaps with another availability

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>DELETE /api/availability/:id</code></strong></summary>

**Access**

- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}
```

#### Response

```text
200 OK

body: {
    message: "Availability deleted successfully"
}
```

#### Errors

**400 Bad Request**
- Invalid availability id

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Professional can only delete their own availability
- Admin role required for managing another professional

**404 Not Found**
- Availability not found

**409 Conflict**
- Availability cannot be deleted because future appointments depend on it

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>GET /api/professionals/:id/available-slots</code></strong></summary>

**Access**

`PUBLIC`

#### Request

```text
params: {
    id: Number
}

query: {
    date: Date
}
```

#### Response

```text
200 OK

body: {
    professional_id: Number,
    date: Date,
    available_slots: [
        {
            start_time: String,
            end_time: String
        }
    ]
}
```

#### Errors

**400 Bad Request**
- Invalid professional id
- Date is required
- Invalid date format
- Date is outside the allowed booking period

**404 Not Found**
- Professional not found
- No availability configured for this day

**500 Internal Server Error**
- Unexpected server error

</details>

---

## Appointments

<details>
  <summary><strong><code>POST /api/appointments</code></strong></summary>

**Access**

`PATIENT`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

body: {
    professional_id: Number,
    specialty_id: Number,
    appointment_date: Date,
    start_time: String,
    reason: String
}
```

#### Response

```text
201 Created

body: {
    message: String,
    appointment: {
        id: Number,
        patient_id: Number,
        professional_id: Number,
        specialty_id: Number,
        appointment_date: Date,
        start_time: String,
        end_time: String,
        status: "SCHEDULED",
        reason: String,
        created_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Missing required fields
- Invalid date
- Invalid time
- Appointment date is outside the allowed booking period
- Selected time is outside professional availability

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Patient role required

**404 Not Found**
- Professional not found
- Specialty not found
- Patient profile not found

**409 Conflict**
- Selected slot is no longer available
- Professional does not belong to the selected specialty

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>GET /api/appointments/me</code></strong></summary>

**Access**

- `PATIENT`
- `PROFESSIONAL`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}
```

#### Response

```text
200 OK

body: {
    appointments: [
        {
            id: Number,
            appointment_date: Date,
            start_time: String,
            end_time: String,
            status: String,
            reason: String,

            patient: {
                id: Number,
                first_name: String,
                last_name: String
            },

            professional: {
                id: Number,
                first_name: String,
                last_name: String
            },

            specialty: {
                id: Number,
                name: String
            }
        }
    ]
}
```

#### Errors

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- User role not allowed

**404 Not Found**
- Associated profile not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>GET /api/appointments/:id</code></strong></summary>

**Access**

- `PATIENT`
- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}
```

#### Response

```text
200 OK

body: {
    appointment: {
        id: Number,
        appointment_date: Date,
        start_time: String,
        end_time: String,
        status: String,
        reason: String,
        cancellation_reason: String,

        patient: {
            id: Number,
            first_name: String,
            last_name: String
        },

        professional: {
            id: Number,
            first_name: String,
            last_name: String
        },

        specialty: {
            id: Number,
            name: String
        },

        created_at: Date,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid appointment id

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- User does not have permission to view this appointment

**404 Not Found**
- Appointment not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PATCH /api/appointments/:id/reschedule</code></strong></summary>

**Access**

- `PATIENT`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    appointment_date: Date,
    start_time: String
}
```

#### Response

```text
200 OK

body: {
    message: String,
    appointment: {
        id: Number,
        appointment_date: Date,
        start_time: String,
        end_time: String,
        status: String,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid appointment id
- Invalid date
- Invalid time
- Date is outside the allowed booking period
- Selected time is outside professional availability
- Appointment cannot be rescheduled in its current status

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- Patient can only reschedule their own appointment

**404 Not Found**
- Appointment not found

**409 Conflict**
- Selected slot is already booked

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PATCH /api/appointments/:id/cancel</code></strong></summary>

**Access**

- `PATIENT`
- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    cancellation_reason: String
}
```

#### Response

```text
200 OK

body: {
    message: String,
    appointment: {
        id: Number,
        status: "CANCELLED",
        cancellation_reason: String,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid appointment id
- Appointment is already cancelled
- Appointment cannot be cancelled in its current status

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- User does not have permission to cancel this appointment

**404 Not Found**
- Appointment not found

**500 Internal Server Error**
- Unexpected server error

</details>

---

<details>
  <summary><strong><code>PATCH /api/appointments/:id/status</code></strong></summary>

**Access**

- `PROFESSIONAL`
- `ADMIN`

#### Request

```text
headers: {
    Authorization: "Bearer <token>"
}

params: {
    id: Number
}

body: {
    status: String
}
```

**Allowed values**

- `"SCHEDULED"`
- `"COMPLETED"`
- `"NO_SHOW"`

#### Response

```text
200 OK

body: {
    message: String,
    appointment: {
        id: Number,
        status: String,
        updated_at: Date
    }
}
```

#### Errors

**400 Bad Request**
- Invalid appointment id
- Invalid appointment status
- Invalid status transition

**401 Unauthorized**
- Token missing
- Token invalid
- Token expired

**403 Forbidden**
- User does not have permission to modify this appointment

**404 Not Found**
- Appointment not found

**500 Internal Server Error**
- Unexpected server error

</details>
