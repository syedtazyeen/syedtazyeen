import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function formatTo12Hour(time: Date | string): string {
  const date = typeof time === "string" ? new Date(`1970-01-01T${time}`) : time;

  return new Intl.DateTimeFormat("en-US", {
    month: "short", // MMM
    day: "2-digit", // dd
    year: "numeric", // yyyy
    hour: "numeric", // h
    minute: "2-digit", // mm
    hour12: true, // a (AM/PM)
  }).format(date);
}
