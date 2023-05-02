export function getDateTime() {
  const now = new Date();
  const timeZone = "America/Santiago"; // Chile timezone

  const formattedDate = new Intl.DateTimeFormat("es-CL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timeZone,
  }).format(now);

  return formattedDate.replace(/\//g, "-").replace(",", "");
}
