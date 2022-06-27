import short from 'short-uuid';
import {
  csvLineToArray,
  hmsToSeconds,
  InvalidFile,
  isValidCsv,
  parseDate,
} from 'utils';
import { Program, ProgramRating } from './program';
import mockupPrograms from './mockupPrograms';

export default class EPGParser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static parseXml(xml: string): Program[] {
    throw new Error('not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static parseCsv(csv: string): Program[] {
    const lines = csv.split('\n');

    if (!isValidCsv(csv)) {
      throw new InvalidFile('Invalid CSV');
    }

    const progs = lines.slice(1);
    const aux: Program[] = [];

    // eslint-disable-next-line consistent-return
    progs.forEach(prog => {
      if (!csvLineToArray(prog)) {
        aux.push({
          id: short.generate(),
          title: '',
          description: '',
          startDate: new Date(),
          startTime: new Date(),
          duration: 2400,
          rating: ProgramRating.RL,
        });
        return aux;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const p: string[] = csvLineToArray(prog)!;

      const date = p[4];

      const year = Number(date.substring(0, 4));
      const month = Number(date.substring(4, 6));
      const day = Number(date.substring(6, 8));

      const formatDate = new Date(year, month - 1, day);

      const time = p[5];

      const hour = Number(time.substring(0, 2));
      const minute = Number(time.substring(2, 4));
      const second = Number(time.substring(4, 6));

      const formatTime = new Date(year, month - 1, day, hour, minute, second);

      const duration = p[6];

      const h = Number(duration.substring(0, 2));
      const min = Number(duration.substring(2, 4));
      const sec = Number(duration.substring(4, 6));

      const formatDuration = h * 3600 + min * 60 + sec;

      const title = p[7];
      const progTitle = title.replace(/['"]+/g, '');
      const description = p[8];
      const progDescription = description.replace(/['"]+/g, '');

      const rate = {
        0b0001: ProgramRating.RL,
        0b0010: ProgramRating.R10,
        0b0011: ProgramRating.R12,
        0b0100: ProgramRating.R14,
        0b0101: ProgramRating.R16,
        0b0110: ProgramRating.R18,
      };

      const rating = p[58];

      const hex2bin = data =>
        data
          .slice(3, 5)
          .split('')
          .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
          .join('');

      const base = '0b';
      const brate = base.concat(hex2bin(rating));
      const pg: ProgramRating = rate[Number(brate)];

      aux.push({
        id: short.generate(),
        title: progTitle,
        description: progDescription,
        startDate: formatDate,
        startTime: formatTime,
        duration: formatDuration,
        rating: pg,
      });
    });

    return aux;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async parseFile(file: File): Promise<Program[]> {
    // const content = await readFileAsync(file);
    // if (content is xml) {
    //   return this.parseXml(content);
    // }
    // if (content is csv) {
    //   return this.parseCsv(content);
    // }
    const programs = mockupPrograms;
    return programs.map(
      ({ title, description, startDate, startTime, duration, rating }) => ({
        id: short.generate(),
        title,
        description,
        startDate: parseDate(startDate, 'dd/MM/yyyy'),
        startTime: parseDate(startTime, 'HH:mm:ss'),
        duration: hmsToSeconds(duration),
        rating,
      }),
    );
  }
}
