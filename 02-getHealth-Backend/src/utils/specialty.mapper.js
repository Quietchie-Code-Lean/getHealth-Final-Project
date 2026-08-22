// Maps a specialty database record to the API response format.
export const mapSpecialty = (specialty) => ({
  id: specialty.id,
  name: specialty.name,
  description: specialty.description,
  is_active: specialty.isActive,
  created_at: specialty.createdAt,
  updated_at: specialty.updatedAt,
});

// Maps a specialty database record to the API response format used when creating a specialty.
export const mapCreatedSpecialty = (specialty) => ({
  id: specialty.id,
  name: specialty.name,
  description: specialty.description,
  is_active: specialty.isActive,
  created_at: specialty.createdAt,
});

// Maps a specialty database record to the API response format used when updating a specialty.
export const mapUpdatedSpecialty = (specialty) => ({
  id: specialty.id,
  name: specialty.name,
  description: specialty.description,
  is_active: specialty.isActive,
  updated_at: specialty.updatedAt,
});

// Maps a specialty database record to the API response format used when updating its active status.
export const mapSpecialtyStatus = (specialty) => ({
  id: specialty.id,
  name: specialty.name,
  is_active: specialty.isActive,
  updated_at: specialty.updatedAt,
});
