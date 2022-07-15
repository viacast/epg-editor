import { addToDate } from 'utils/general';
import Program from './program';

// eslint-disable-next-line no-shadow
export enum EPGValidationMessageLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// eslint-disable-next-line no-shadow
export enum EPGValidationMessageType {
  EMPTY_TITLE = 'EMPTY_TITLE',
  EMPTY_DESCRIPTION = 'EMPTY_DESCRIPTION',
  INVALID_DURATION = 'INVALID_DURATION',
  NO_PARENTAL_RATING = 'NO_PARENTAL_RATING',
  PAST_START_DATE = 'PAST_START_DATE',
  FAR_START_DATE = 'FAR_START_DATE',
  TIME_GAP = 'TIME_GAP',
}

export type EPGValidationMessages = Record<
  string, // programId
  Record<EPGValidationMessageLevel, EPGValidationMessageType[]>
>;

export default class EPGValidator {
  static validate(programs: Program[]): EPGValidationMessages {
    throw new Error('not implemented');
  }

  static adjustDateTimes(programs: Program[]): Program[] {
    programs.forEach((p, i) => {
      if (i === programs.length - 1) {
        return;
      }
      const { startDateTime, duration } = programs[i];
      const endTime = addToDate(startDateTime, duration);
      // eslint-disable-next-line no-param-reassign
      programs[i + 1].startDateTime = endTime;
    });
    return programs;
  }
}
