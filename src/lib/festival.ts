import dayjs from "dayjs";
import { activeFestival } from "@/config/festivals/pchum-ben";

export const KHMER_DIGITS: Record<string, string> = {
  "0": "០", "1": "១", "2": "២", "3": "៣", "4": "៤",
  "5": "៥", "6": "៦", "7": "៧", "8": "៨", "9": "៩",
};

export function toKhmerNumerals(value: string | number) {
  return String(value).replace(/\d/g, (d) => KHMER_DIGITS[d]);
}

export function getCambodiaDateISO(input = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: activeFestival.timezone,
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(input);
  const pick = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

function dateOnlyUtc(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function differenceInCalendarDays(a: string, b: string) {
  return Math.round((dateOnlyUtc(a) - dateOnlyUtc(b)) / 86400000);
}

export function getFestivalStatus(dateIso = getCambodiaDateISO()) {
  const { observanceStart, pchumBenDate, totalDays } = activeFestival;
  const dayFromStart = differenceInCalendarDays(dateIso, observanceStart);
  const until = differenceInCalendarDays(pchumBenDate, dateIso);
  const isBeforeFestival = dateIso < observanceStart;
  const isAfterFestival = dateIso > pchumBenDate;
  const isDuringFestival = !isBeforeFestival && !isAfterFestival;
  const kanBenNumber = isDuringFestival ? dayFromStart + 1 : null;
  const progressPercentage = isBeforeFestival ? 0 : isAfterFestival ? 100 : Math.min(100, Math.max(0, Math.round(((kanBenNumber ?? 0) / totalDays) * 100)));
  return {
    today: dateIso,
    isBeforeFestival,
    isDuringFestival,
    isPchumBen: dateIso === pchumBenDate,
    isAfterFestival,
    kanBenNumber,
    daysUntilPchumBen: Math.max(0, until),
    progressPercentage,
  };
}

export function daysBeforePchumBen(daysBefore: number) {
  return dayjs(activeFestival.pchumBenDate).subtract(daysBefore, "day").format("YYYY-MM-DD");
}

export function checklistPercentage(completed: number, total: number) {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
}

export function isOfficialHoliday(dateIso: string) {
  return getPublicHolidays(dateIso).length > 0;
}

export function getPublicHolidays(dateIso: string) {
  return activeFestival.publicHolidays.filter((holiday) => holiday.date === dateIso);
}

export function kanBenForDate(dateIso: string) {
  return activeFestival.kanBenDays.find((d) => d.date === dateIso) ?? null;
}

export function formatDate(dateIso: string, locale: "km" | "en", khmerNumbers = false) {
  const date = new Date(`${dateIso}T12:00:00+07:00`);
  const text = new Intl.DateTimeFormat(locale === "km" ? "km-KH" : "en-US", {
    timeZone: activeFestival.timezone,
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(date);
  return locale === "km" && khmerNumbers ? toKhmerNumerals(text) : text;
}

export function getPreparationMessage(percent: number, locale: "km" | "en") {
  if (percent === 100) return locale === "km" ? "រួចរាល់សម្រាប់ភ្ជុំបិណ្ឌ ❤️" : "Ready for Pchum Ben!";
  if (percent >= 75) return locale === "km" ? "ត្រៀមជិតរួចរាល់" : "Almost ready!";
  if (percent >= 50) return locale === "km" ? "ជិតរួចរាល់ហើយ" : "You're getting ready.";
  if (percent >= 25) return locale === "km" ? "កំពុងដំណើរការ" : "Good start.";
  return locale === "km" ? "ចាប់ផ្តើមរៀបចំបានហើយ!" : "Let's start preparing.";
}
