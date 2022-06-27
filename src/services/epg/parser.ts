import short from 'short-uuid';
import { csvLineToArray, InvalidFile, readFileAsync } from 'utils';
import { XMLParser } from 'fast-xml-parser';
import { Program, ProgramRating } from './program';

export default class EPGParser {
  static parseXml(xml: string): Program[] {
    const parser = new XMLParser({
      allowBooleanAttributes: true,
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const aux: Program[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let document: Record<string, any>;
    try {
      document = parser.parse(xml);
    } catch (error) {
      throw new InvalidFile('Invalid XML');
    }
    const content = document.tv;
    const programs = content.programme;

    programs.forEach(program => {
      const title: string = program.title['#text'];
      const description: string = program.desc['#text'];
      const duration: number = Number(program.length['#text']) * 60;

      const rate = {
        L: ProgramRating.RL,
        '10': ProgramRating.R10,
        '12': ProgramRating.R12,
        '14': ProgramRating.R14,
        '16': ProgramRating.R16,
        '18': ProgramRating.R18,
      };

      const rating: ProgramRating = rate[program.rating.value];

      const date = program.start;

      const year = Number(date.substring(0, 4));
      const month = Number(date.substring(4, 6));
      const day = Number(date.substring(6, 8));
      const hour = Number(date.substring(8, 10));
      const minute = Number(date.substring(10, 12));

      const formatDate = new Date(year, month - 1, day);
      const formatTime = new Date(year, month - 1, day, hour, minute, 0);

      aux.push({
        id: short.generate(),
        title,
        description,
        startDate: formatDate,
        startTime: formatTime,
        duration,
        rating,
      });

      return aux;
    });

    return aux;
  }

  static parseCsv(csv: string): Program[] {
    const lines = csv.split('\n');

    const progs = lines.slice(1);
    const aux: Program[] = [];

    const firstLine = csvLineToArray(lines[0]);
    if (!firstLine) {
      throw new InvalidFile('Invalid CSV');
    }

    progs.forEach(prog => {
      const p = csvLineToArray(prog);
      if (!p) {
        throw new InvalidFile('Invalid CSV');
      }
      if (p.length !== firstLine.length) {
        throw new InvalidFile('Invalid CSV');
      }

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

  static async parseFile(file: File): Promise<Program[]> {
    const content = await readFileAsync(file);
    try {
      return this.parseCsv(content);
    } catch (error) {
      if (error instanceof InvalidFile) {
        return this.parseXml(content);
      }
      throw error;
    }
    // const programs = mockupPrograms;
    // return programs.map(
    //   ({ title, description, startDate, startTime, duration, rating }) => ({
    //     id: short.generate(),
    //     title,
    //     description,
    //     startDate: parseDate(startDate, 'dd/MM/yyyy'),
    //     startTime: parseDate(startTime, 'HH:mm:ss'),
    //     duration: hmsToSeconds(duration),
    //     rating,
    //   }),
    // );
  }
}
