import { Program } from './program';

export default class EPGBuilder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static buildXml(programs: Program[]): string {
    throw new Error('not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static buildCsv(programs: Program[]): string {
    throw new Error('not implemented');
  }
}
