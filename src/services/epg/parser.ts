import short from 'short-uuid';

import { hmsToSeconds, parseDate } from 'utils';

import { Program } from './program';
import mockupPrograms from './mockupPrograms';

export default class EPGParser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static parseXml(xml: string): Program[] {
    throw new Error('not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static parseCsv(csv: string): Program[] {
    throw new Error('not implemented');
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
      ({ title, description, startDate, startHour, duration, rating }) => ({
        id: short.generate(),
        title,
        description,
        startDate: parseDate(startDate, 'dd/MM/yyyy'),
        startHour: parseDate(startHour, 'HH:mm:ss'),
        duration: hmsToSeconds(duration),
        rating,
      }),
    );
  }
}
