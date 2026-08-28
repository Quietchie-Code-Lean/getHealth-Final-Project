import { dateToTimeString } from "./dateTime.utils.js";

// ============================================================
// AVAILABILITY RESPONSE MAPPERS
// ============================================================

// Converts a Prisma availability record into the API response format.
export const formatAvailabilityResponse = (availability) => {

  return {
    id: availability.id,
    weekday: availability.weekday,
    start_time: dateToTimeString(availability.startTime),
    end_time: dateToTimeString(availability.endTime),
    slot_duration: availability.slotDuration,
    is_active: availability.availableSlot,
  };
};



// Converts a newly created availability into the POST response format.
export const formatCreatedAvailabilityResponse = (availability, professionalId) => {

  return {
    id: availability.id,
    professional_id: professionalId,
    weekday: availability.weekday,
    start_time: dateToTimeString(availability.startTime),
    end_time: dateToTimeString(availability.endTime),
    slot_duration: availability.slotDuration,
    is_active: availability.availableSlot,
  };
};



// Converts an updated availability into the PUT response format.
export const formatUpdatedAvailabilityResponse = (availability, professionalId) => {

  return {
    id: availability.id,
    professional_id: professionalId,
    weekday: availability.weekday,
    start_time: dateToTimeString(availability.startTime),
    end_time: dateToTimeString(availability.endTime),
    slot_duration: availability.slotDuration,
    is_active: availability.availableSlot,
    updated_at: availability.updatedAt,
  };
};


// ============================================================
// AVAILABLE SLOT GENERATION
// ============================================================

// Generates appointment slots from a professional availability schedule.
export const generateAvailabilitySlots = (availability) => {

  const slots = [];

  const startTime = dateToTimeString(availability.startTime);
  const endTime = dateToTimeString(availability.endTime);
  const startMinutes =timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  let currentStartMinutes = startMinutes;

  while (currentStartMinutes + availability.slotDuration <= endMinutes) {

    const currentEndMinutes = currentStartMinutes + availability.slotDuration;

    slots.push({
      startTime: minutesToDate(currentStartMinutes),
      endTime: minutesToDate(currentEndMinutes),
    });

    currentStartMinutes = currentEndMinutes;

  }

  return slots;
};



// Checks whether an appointment already occupies a generated slot.
export const isAvailabilitySlotOccupied = (slot, appointments) => {

  return appointments.some((appointment) => {

    const appointmentStart = appointment.startAppointment;
    const appointmentEnd = appointment.endAppointment;

    return (appointmentStart < slot.endTime && appointmentEnd > slot.startTime);

  });
};


// Converts an available appointment slot into the API response format.
export const formatAvailableSlotResponse = (slot) => {

  return {
    start_time: dateToTimeString(slot.startTime),
    end_time: dateToTimeString(slot.endTime),
  };
};