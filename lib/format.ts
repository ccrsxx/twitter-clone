import type { Timestamp } from 'firebase/firestore';

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat('en-gb', {
  numeric: 'auto'
});

const units = {
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
};

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-GB', {
    notation: number > 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(number);
}

function getRelativeTime(date: Date): string {
  const elapsed = +date - +new Date();

  if (elapsed > 0) return 'now';

  const unitsItems = Object.entries(units).slice(0, -1);

  for (const [unit, millis] of unitsItems)
    if (Math.abs(elapsed) > millis)
      return RELATIVE_TIME_FORMATTER.format(
        Math.round(elapsed / millis),
        unit as Intl.RelativeTimeFormatUnit
      );

  return RELATIVE_TIME_FORMATTER.format(
    Math.round(elapsed / units.second),
    'second'
  );
}

function getFullTime(date: Date): string {
  const fullDate = new Intl.DateTimeFormat('en-gb', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);

  const splittedDate = fullDate.split(', ');

  const formattedDate =
    splittedDate.length === 2
      ? [...splittedDate].reverse().join(' · ')
      : [splittedDate.slice(0, 2).join(', '), splittedDate.slice(-1)]
          .reverse()
          .join(' · ');

  return formattedDate;
}

function isToday(date: Date): boolean {
  return new Date().toDateString() === date.toDateString();
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === date.toDateString();
}

function isCurrentYear(date: Date): boolean {
  return date.getFullYear() === new Date().getFullYear();
}

function getPostTime(date: Date): string {
  if (isToday(date)) return getRelativeTime(date);
  if (isYesterday(date))
    return new Intl.DateTimeFormat('en-gb', {
      day: 'numeric',
      month: 'short'
    }).format(date);

  return new Intl.DateTimeFormat('en-gb', {
    day: 'numeric',
    month: 'short',
    year: isCurrentYear(date) ? undefined : 'numeric'
  }).format(date);
}

function getShortTime(date: Date): string {
  const isNear = isToday(date)
    ? 'today'
    : isYesterday(date)
    ? 'yesterday'
    : null;

  return isNear
    ? `${isNear === 'today' ? 'Today' : 'Yesterday'} at ${date
        .toLocaleTimeString('en-gb')
        .slice(0, -3)}`
    : getFullTime(date);
}

export function formatDate(
  targetDate: Timestamp,
  mode: 'post' | 'message' | 'full'
): string {
  const date = targetDate.toDate();

  if (mode === 'full') return getFullTime(date);
  if (mode === 'post') return getPostTime(date);

  return getShortTime(date);
}
