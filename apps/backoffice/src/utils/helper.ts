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
