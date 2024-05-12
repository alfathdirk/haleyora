import { intervalToDuration, formatDuration } from "date-fns";

export const statusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "tag-green";
    case "Submited":
      return "tag-blue";
    case "Process":
      return "tag-orange";
    case "Closed":
      return "tag-black";
    case "Reported":
      return "tag-yellow";
    case "Submit":
      return "tag-pink";
    default:
      return "bg-warning text-white";
  }
};

export const formatDateTime = (date: string | null, withTime?: boolean) => {
  if (!date) return;

  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  const time = withTime ? ` ${d.toLocaleTimeString()}` : "";
  return `${day} ${month} ${year}${time}`;
};

// Create a function to format the duration
export function formatDurationFromMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration = intervalToDuration({
    start: 0,
    end: hours * 3600 * 1000 + minutes * 60 * 1000,
  });

  const formattedHours = duration.hours || 0;
  const formattedMinutes = duration.minutes || 0;

  let result = "";
  if (formattedHours > 0) {
    result += `${formattedHours}h `;
  }
  if (formattedMinutes > 0) {
    result += `${formattedMinutes}m`;
  }

  return result.trim();
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
