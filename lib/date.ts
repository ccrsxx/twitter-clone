import type { Timestamp } from 'firebase/firestore';

const FORMATTER = new Intl.DateTimeFormat('en-gb', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
});

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat('en-gb', {
  numeric: 'auto'
});

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
};

function getRelativeTime(date: Date): string {
  const elapsed = +date - +new Date();

  if (elapsed > 0) return 'Now';

  const unitsItems = Object.entries(units).slice(0, -1);

  for (const [unit, millis] of unitsItems)
    if (Math.abs(elapsed) > millis)
      return RELATIVE_FORMATTER.format(
        Math.round(elapsed / millis),
        unit as Intl.RelativeTimeFormatUnit
      );

  return RELATIVE_FORMATTER.format(
    Math.round(elapsed / units.second),
    'second'
  );
}

function getShortTime(date: Date, type: 'today' | 'yesterday'): string {
  return `${type === 'today' ? 'Today' : 'Yesterday'} at ${date
    .toLocaleTimeString('en-gb')
    .slice(0, -3)}`;
}

function isToday(date: Date): boolean {
  return new Date().toDateString() === date.toDateString();
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === date.toDateString();
}

export function convertDate(targetDate: Timestamp, relative?: boolean): string {
  const date = targetDate.toDate();

  if (relative) return getRelativeTime(date);
  if (isToday(date)) return getShortTime(date, 'today');
  if (isYesterday(date)) return getShortTime(date, 'yesterday');

  return FORMATTER.format(date);
}
