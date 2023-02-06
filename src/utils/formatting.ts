import { format, parse } from 'date-fns';
import { ProgramContent } from 'services/epg/program';
import papaparse from 'papaparse';

interface HMS {
  hours: number;
  minutes: number;
  seconds: number;
}

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

export function durationToHms(duration: number): HMS {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor((duration % 3600) % 60);
  return {
    hours,
    minutes,
    seconds,
  };
}

export function hmsToDuration(hms: HMS): number {
  const { hours, minutes, seconds } = hms;
  return hours * 3600 + minutes * 60 + seconds;
}

export function yyyyMMddHHmmToDuration(s: string): Date {
  const aux = String(s);
  const y = aux.substring(0, 4);
  const m = aux.substring(4, 6);
  const d = aux.substring(6, 8);
  const h = aux.substring(8, 10);
  const mm = aux.substring(10, 12);
  return new Date(`${y}-${m}-${d}T${h}:${mm}:00`);
}

export function getLength(start: string, stop: string): number {
  const s1 = yyyyMMddHHmmToDuration(start).getTime();
  const s2 = yyyyMMddHHmmToDuration(stop).getTime();
  return Math.abs(s2 - s1) / 1000;
}
export function getProgramTime(program) {
  let length = 0;
  if (program.length === undefined) {
    length = getLength(program.start, program.stop);
  } else {
    length = Number(program.length['#text']) * 60;
  }
  return length;
}

export function getIconCode(s: string): string {
  let code;
  if (s === 'RSC') {
    code = 'csv: 0x00\nxml: 00';
  } else if (s === 'RL,') {
    code = 'csv: 0x00\nxml: 00';
  } else if (s === 'R10') {
    code = 'csv: 0x00\nxml: 00';
  } else if (s === 'R12') {
    code = 'csv: 0x00\nxml: 00';
  } else if (s === 'R14') {
    code = 'csv: 0x00\nxml: 00';
  } else if (s === 'R16') {
    code = 'csv: 0x00\nxml: 00';
  } else if (s === 'R18') {
    code = 'csv: 0x00\nxml: 00';
  }
  return code;
}

export function boolToPC(c: Array<boolean>): ProgramContent {
  const c1 = c[0];
  const c2 = c[1];
  const c3 = c[2];

  let array = '';

  if (c1) {
    array += 'Drugs';
  }
  if (c2) {
    array += 'Violence';
  }
  if (c3) {
    array += 'Sex';
  }

  let result;

  if (array === '') {
    result = ProgramContent.F;
  }
  if (array === 'Drugs') {
    result = ProgramContent.D;
  }
  if (array === 'Violence') {
    result = ProgramContent.V;
  }
  if (array === 'Sex') {
    result = ProgramContent.S;
  }
  if (array === 'DrugsViolence') {
    result = ProgramContent.DV;
  }
  if (array === 'DrugsSex') {
    result = ProgramContent.DS;
  }
  if (array === 'ViolenceSex') {
    result = ProgramContent.VS;
  }
  if (array === 'DrugsViolenceSex') {
    result = ProgramContent.DVS;
  }

  return result;
}

// adapted from https://stackoverflow.com/a/8497474/
export function csvLineToArray(rawText: string) {
  // const text = textT.replace(/","/g, '";"');
  return papaparse.parse(rawText).data;
  // console.log(text);
  // const reValid =
  //   /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*(?:;\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*)*$/;
  // const reValue =
  //   /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^;'"\s\\]*(?:\s+[^;'"\s\\]+)*))\s*(?:;|$)/g;
  // if (!reValid.test(text)) return null;
  // const a: string[] = [];
  // text.replace(reValue, (m0, m1, m2, m3) => {
  //   if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
  //   else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
  //   else if (m3 !== undefined) a.push(m3);
  //   return '';
  // });
  // if (/;\s*$/.test(text)) a.push('');
  // return a;
}
