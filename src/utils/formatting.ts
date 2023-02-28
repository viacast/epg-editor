import { format, parse } from 'date-fns';
import Program, { ProgramContent } from 'services/epg/program';
import papaparse from 'papaparse';
import EntityMap from './entityMap';

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

// export function getInterval(start: Date, now: Date): number {
//   const diff = now.getTime() - start.getTime();
// }

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

interface SelectOption {
  label: string;
  value: string;
}

export function optionsArray(s: string): SelectOption[] {
  const array: SelectOption[] = [];
  if (s === 'Jornalismo') {
    array.push(
      { label: 'Telejornais', value: 'Telejornais' },
      { label: 'Reportagem', value: 'Reportagem' },
      { label: 'Documentário', value: 'Documentário' },
      { label: 'Biografia', value: 'Biografia' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Esporte') {
    array.push(
      { label: 'Esporte', value: 'Esporte' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Educativo') {
    array.push(
      { label: 'Educativo', value: 'Educativo' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Novela') {
    array.push(
      { label: 'Novela', value: 'Novela' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Minissérie') {
    array.push(
      { label: 'Minissérie', value: 'Minissérie' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Série/seriado') {
    array.push(
      { label: 'Série', value: 'Série' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Variedade') {
    array.push(
      { label: 'Auditório', value: 'Auditório' },
      { label: 'Show', value: 'Show' },
      { label: 'Musical', value: 'Musical' },
      { label: 'Making of', value: 'Making of' },
      { label: 'Feminino', value: 'Feminino' },
      { label: 'Game Show', value: 'Game Show' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Reality show') {
    array.push(
      { label: 'Reality show', value: 'Reality show' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Informação') {
    array.push(
      { label: 'Culinária', value: 'Culinária' },
      { label: 'Moda', value: 'Moda' },
      { label: 'Rural', value: 'Rural' },
      { label: 'Saúde', value: 'Saúde' },
      { label: 'Turismo', value: 'Turismo' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Humorístico') {
    array.push(
      { label: 'Humorístico', value: 'Humorístico' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Infantil') {
    array.push(
      { label: 'Infantil', value: 'Infantil' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Erótico') {
    array.push(
      { label: 'Erótico', value: 'Erótico' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Filme') {
    array.push(
      { label: 'Filme', value: 'Filme' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Sorteio, televendas, premiação') {
    array.push(
      { label: 'Sorteio', value: 'Sorteio' },
      { label: 'Televendas', value: 'Televendas' },
      { label: 'Premiação', value: 'Premiação' },
      { label: 'Outros', value: 'Outros' },
    );
  } else if (s === 'Debate/entrevista') {
    array.push(
      { label: 'Debate', value: 'Debate' },
      { label: 'Entrevista', value: 'Entrevista' },
      { label: 'Outros', value: 'Outros' },
    );
  } else {
    array.push(
      { label: 'Desenho adulto', value: 'Desenho adulto' },
      { label: 'Interativo', value: 'Interativo' },
      { label: 'Político', value: 'Político' },
      { label: 'Religioso', value: 'Religioso' },
      { label: 'Outros', value: 'Outros' },
    );
  }
  return array;
}

export function unique(program: EntityMap<Program>): EntityMap<Program> {
  const uniqueDataArray: Program[] = [];
  const datesSeen = new Set();

  const programsArray: Program[] = Object.values(program);
  const arrayofPrograms: Program[] = Object.values(programsArray[2]);

  arrayofPrograms.forEach(a => {
    if (!datesSeen.has(a.startDateTime.getTime())) {
      uniqueDataArray.push(a);
      datesSeen.add(a.startDateTime.getTime());
    }
  });

  const uniqueEntityMapPrograms = new EntityMap<Program>(
    uniqueDataArray?.map(p => new Program(p)),
  );

  return uniqueEntityMapPrograms;
}

export function compareDates(a: Date, b: Date): number {
  if (a.getTime() < b.getTime()) {
    return -1;
  }
  if (a.getTime() > b.getTime()) {
    return 1;
  }
  return 0;
}

export function sortArrayByDate(arr: Program[]): Program[] {
  const sortedArray: Program[] = [...arr];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sortedArray.length - 1; i++) {
    // eslint-disable-next-line no-plusplus
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (
        compareDates(
          sortedArray[j].startDateTime,
          sortedArray[i].startDateTime,
        ) < 0
      ) {
        // Swap elements
        const temp = sortedArray[i];
        sortedArray[i] = sortedArray[j];
        sortedArray[j] = temp;
      }
    }
  }

  return sortedArray;
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
