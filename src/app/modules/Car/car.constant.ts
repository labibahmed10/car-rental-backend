// car status array
export const carStatus = ["available", "unavailable"];

// car searchable fields array
export const carSearchableFields = ["name", "description", "color", "type"];

// depending on HH:MM formate it will calculate exact hour
export function calculateHourDifference(startTime: string, endTime: string): number {
  const startHours = parseInt(startTime.split(":")[0]);
  const startMinutes = parseInt(startTime.split(":")[1]);
  const endHours = parseInt(endTime.split(":")[0]);
  const endMinutes = parseInt(endTime.split(":")[1]);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  let hourDifference = Math.floor((endTotalMinutes - startTotalMinutes) / 60);

  if (hourDifference < 0) {
    hourDifference += 24;
  }

  return hourDifference;
}
