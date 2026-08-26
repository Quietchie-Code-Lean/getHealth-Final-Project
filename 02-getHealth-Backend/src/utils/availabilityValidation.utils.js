import { 
    timeToMinutes,
    parseAppointmentDate,
} from "./dateTime.utils.js";


const MAX_BOOKING_DAYS = 30;

// ============================================================
// AVAILABILITY VALIDATION CONFIGURATION
// ============================================================

const allowedWeekdays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

// ============================================================
// WEEKDAY VALIDATION
// ============================================================

// Validates that the weekday is supported by the availability schedule.
export const validateAvailabilityWeekday = (weekday) => {

  if (
    typeof weekday !== "string" ||
    !allowedWeekdays.includes(weekday)
  ) {

    const error = new Error("Invalid weekday.");
    error.statusCode = 400;

    throw error;
  }
};

// ============================================================
// TIME RANGE VALIDATION
// ============================================================

// Validates availability times and ensures the start time is before the end time.
export const validateAvailabilityTimeRange = (startTime, endTime) => {

  if (typeof startTime !== "string" || typeof endTime !== "string") {

    const error = new Error("Start time and end time must be strings.");

    error.statusCode = 400;

    throw error;
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes >= endMinutes) {

    const error = new Error("Start time must be earlier than end time.");

    error.statusCode = 400;

    throw error;
  }
};

// ============================================================
// SLOT DURATION VALIDATION
// ============================================================

// Validates that the slot duration is a positive integer.
export const validateAvailabilitySlotDuration = (slotDuration) => {

  if (!Number.isInteger(slotDuration) || slotDuration <= 0) {

    const error = new Error("Slot duration must be a positive integer.");

    error.statusCode = 400;

    throw error;
  }
};

// ============================================================
// ACTIVE STATUS VALIDATION
// ============================================================

// Validates that the availability active status is a boolean.
export const validateAvailabilityActiveStatus = (isActive) => {

  if (typeof isActive !== "boolean") {

    const error = new Error("Active status must be a boolean.");

    error.statusCode = 400;

    throw error;
  }
};


// ============================================================
// BOOKING DATE VALIDATION
// ============================================================

// Validates and converts the requested booking date.
export const validateAvailabilityDate = (date) => {

  if (!date) {

    const error = new Error("Date is required");
    error.statusCode = 400;

    throw error;
  }

  if (typeof date !== "string") {

    const error = new Error("Invalid date format");
    error.statusCode = 400;

    throw error;
  }

  return parseAppointmentDate(date);

};


// ============================================================
// BOOKING PERIOD VALIDATION
// ============================================================

// Validates that the requested date is within the allowed booking period.
export const validateBookingPeriod = (requestedDate) => {

  const today = new Date();

  // Normalize today to midnight UTC.
  today.setUTCHours(0, 0, 0, 0);

  const maximumDate = new Date(today);

  // Calculate the last allowed booking date.
  maximumDate.setUTCDate(maximumDate.getUTCDate() + MAX_BOOKING_DAYS);

  // Reject past dates and dates beyond the booking window.
  if (requestedDate < today || requestedDate > maximumDate) {

    const error = new Error("Date is outside the allowed booking period");

    error.statusCode = 400;

    throw error;
  }
};