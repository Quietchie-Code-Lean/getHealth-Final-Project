// Formats an ISO date string as DD/MM/YYYY.
export const formatAppointmentDate = (date) => {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.substring(0, 10).split("-");

  return `${day}/${month}/${year}`;
};

// Formats an ISO time string as HH:mm.
export const formatAppointmentTime = (time) => {
  if (!time) {
    return "";
  }

  return time.substring(11, 16);
};