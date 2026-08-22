// ============================================================
// TIME CONVERSION
// ============================================================

// Converts a HH:mm time string into minutes since midnight.
export const timeToMinutes = (time) => {
  // Validate the expected HH:mm format.
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timePattern.test(time)) {
    const error = new Error("Invalid time");
    error.statusCode = 400;
    throw error;
  }

  // Convert hours and minutes into a single numeric value.
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

// ============================================================
// DATE CONVERSION
// ============================================================

// Converts minutes since midnight into a Date compatible with Prisma @db.Time.
export const minutesToDate = (minutes) => {
  // Create a neutral UTC date to avoid timezone changes.
  const date = new Date(Date.UTC(1970, 0, 1));

  // Set the hour and minute represented by the total minutes.
  date.setUTCHours(Math.floor(minutes / 60), minutes % 60, 0, 0);

  return date;
};

// Converts a Date object into HH:mm format.
export const dateToTimeString = (date) => {
  return date.toISOString().slice(11, 16);
};

// ============================================================
// APPOINTMENT DATE
// ============================================================

// Converts a YYYY-MM-DD string into a Date compatible with Prisma @db.Date.
export const parseAppointmentDate = (date) => {
  // Validate the expected YYYY-MM-DD format.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const error = new Error("Invalid date");
    error.statusCode = 400;
    throw error;
  }

  // Create the date at midnight UTC.
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  // Verify that JavaScript created a valid date.
  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error("Invalid date");
    error.statusCode = 400;
    throw error;
  }

  return parsedDate;
};

// ============================================================
// WEEKDAY
// ============================================================

// Returns the weekday name used by the Prisma Weekday enum.
export const getWeekday = (date) => {
  // JavaScript returns 0 for Sunday and 6 for Saturday.
  const weekdays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return weekdays[date.getUTCDay()];
};
