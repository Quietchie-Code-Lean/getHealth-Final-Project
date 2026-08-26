import { timeToMinutes } from "./dateTime.utils.js";

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
export const validateAvailabilityTimeRange = (
  startTime,
  endTime
) => {

  if (
    typeof startTime !== "string" ||
    typeof endTime !== "string"
  ) {

    const error = new Error(
      "Start time and end time must be strings."
    );

    error.statusCode = 400;

    throw error;
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes >= endMinutes) {

    const error = new Error(
      "Start time must be earlier than end time."
    );

    error.statusCode = 400;

    throw error;
  }
};

// ============================================================
// SLOT DURATION VALIDATION
// ============================================================

// Validates that the slot duration is a positive integer.
export const validateAvailabilitySlotDuration = (
  slotDuration
) => {

  if (
    !Number.isInteger(slotDuration) ||
    slotDuration <= 0
  ) {

    const error = new Error(
      "Slot duration must be a positive integer."
    );

    error.statusCode = 400;

    throw error;
  }
};

// ============================================================
// ACTIVE STATUS VALIDATION
// ============================================================

// Validates that the availability active status is a boolean.
export const validateAvailabilityActiveStatus = (
  isActive
) => {

  if (typeof isActive !== "boolean") {

    const error = new Error(
      "Active status must be a boolean."
    );

    error.statusCode = 400;

    throw error;
  }
};