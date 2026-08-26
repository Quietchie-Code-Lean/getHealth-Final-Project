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