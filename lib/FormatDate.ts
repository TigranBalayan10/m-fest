export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

export function formatDate(date: string | number | Date): string {
  return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date));
}
