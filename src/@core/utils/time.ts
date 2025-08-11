export function splitMinutes(totalMinutes: number | undefined | null): {
  hours: number;
  minutes: number;
} {
  const total = Number.isFinite(totalMinutes as number)
    ? Math.max(0, Math.floor(totalMinutes as number))
    : 0;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return { hours, minutes };
}

export function combineToMinutes(
  hoursInput: number | string,
  minutesInput: number | string
): number {
  const h = Number.parseInt(String(hoursInput), 10);
  const m = Number.parseInt(String(minutesInput), 10);
  const safeH = Number.isFinite(h) && h > 0 ? h : 0;
  let safeM = Number.isFinite(m) && m > 0 ? m : 0;
  const extraHours = Math.floor(safeM / 60);
  safeM = safeM % 60;
  return safeH * 60 + extraHours * 60 + safeM;
}

export function formatMinutesAsHHMM(
  totalMinutes: number | undefined | null
): string {
  const { hours, minutes } = splitMinutes(totalMinutes ?? 0);
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function parseHHMMToMinutes(input: string): number {
  if (!input) return 0;
  const onlyDigits = input.replace(/\D/g, "");
  if (onlyDigits.length === 0) return 0;
  const minutesPart = onlyDigits.slice(-2);
  const hoursPart = onlyDigits.slice(0, Math.max(0, onlyDigits.length - 2));
  const hours = parseInt(hoursPart || "0", 10);
  let minutes = parseInt(minutesPart || "0", 10);
  if (!Number.isFinite(minutes)) minutes = 0;
  if (!Number.isFinite(hours)) return 0;
  minutes = Math.min(59, Math.max(0, minutes));
  return hours * 60 + minutes;
}
