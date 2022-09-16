import { format, parse } from 'date-fns';

export function round(number: number, places = 0): number {
  const d = 10 ** places;
  return Math.round(number * d + Number.EPSILON) / d;
}

export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function formatDate(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}

export function formatTime(date: Date | number): string {
  return format(new Date(date), 'HH:mm:ss');
}

export function formatDateTime(
  date: Date | number,
  f = 'dd/MM/yyyy HH:mm:ss',
): string {
  return format(new Date(date), f);
}

export function parseDate(date: string, f = 'dd/MM/yyyy HH:mm:ss'): Date {
  return parse(date, f, Date.now());
}

export function hmsToSeconds(hms: string): number {
  const match = hms.match(/(\d\d?):(\d\d?):(\d\d?)/);
  if (!match) {
    return 0;
  }
  const [h, m, s] = match.slice(1);
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

export function secondsToHms(seconds: number, sep = ':'): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(sep);
}

// adapted from https://stackoverflow.com/a/8497474/
export function csvLineToArray(text: string) {
  const reValid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*(?:;\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*)*$/;
  const reValue =
    /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^;'"\s\\]*(?:\s+[^;'"\s\\]+)*))\s*(?:;|$)/g;
  if (!reValid.test(text)) return null;
  const a: string[] = [];
  text.replace(reValue, (m0, m1, m2, m3) => {
    if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
    else if (m3 !== undefined) a.push(m3);
    return '';
  });
  if (/;\s*$/.test(text)) a.push('');
  return a;
}

// adapted from https://stackoverflow.com/questions/20684737/force-leading-zero-in-number-input
export function leadingZeros(str: string): string {
  if (str.length === 1) {
    return `0${str}`;
  }
  if (str === '') {
    return '00';
  }
  if (str.length > 2) {
    return str.slice(0, 2);
  }
  return str;
}

// adapted from https://aguidehub.com/blog/mui-textfield-set-max-length/
export function isNum(str: string): string {
  const regex = /^[0-9\b]+$/;
  if (str === '' || regex.test(str)) {
    return str.slice(0, 2);
  }
  return str;
}
