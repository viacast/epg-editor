import { addToDate, EntityMap } from 'utils';
import Program, { ProgramRating } from './program';

// eslint-disable-next-line no-shadow
export enum EPGValidationMessageLevel {
  ALL = 'ALL',
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
  EPGValidationMessageLevel,
  EPGValidationMessageType[]
>;

export type EPGValidationMessagesByProgram = Record<
  string,
  EPGValidationMessages
>;

export const EPGValidationMessageTypeLevels = {
  [EPGValidationMessageType.EMPTY_TITLE]: EPGValidationMessageLevel.ERROR,
  [EPGValidationMessageType.EMPTY_DESCRIPTION]: EPGValidationMessageLevel.ERROR,
  [EPGValidationMessageType.INVALID_DURATION]: EPGValidationMessageLevel.ERROR,
  [EPGValidationMessageType.NO_PARENTAL_RATING]: EPGValidationMessageLevel.WARN,
  [EPGValidationMessageType.PAST_START_DATE]: EPGValidationMessageLevel.WARN,
  [EPGValidationMessageType.FAR_START_DATE]: EPGValidationMessageLevel.INFO,
  [EPGValidationMessageType.TIME_GAP]: EPGValidationMessageLevel.ERROR,
};
export default class EPGValidator {
  static buildValidationMessages(
    types: EPGValidationMessageType[] = [],
  ): EPGValidationMessages {
    const messages = {} as EPGValidationMessages;
    Object.values(EPGValidationMessageLevel).forEach(l => {
      messages[l] = [];
    });
    types.forEach(t => {
      messages[EPGValidationMessageTypeLevels[t]].push(t);
      messages.ALL.push(t);
    });
    return messages;
  }

  static getMessageLevel(
    message: EPGValidationMessageType,
  ): EPGValidationMessageLevel {
    return EPGValidationMessageTypeLevels[message];
  }

  static countMessagesByLevel(messages: EPGValidationMessagesByProgram) {
    const count = {} as Record<EPGValidationMessageLevel, number>;
    Object.values(EPGValidationMessageLevel).forEach(l => {
      count[l] = 0;
    });
    Object.values(messages).forEach(m => {
      Object.entries(m).forEach(([level, mm]) => {
        count[level] += mm.length;
      });
    });

    return count;
  }

  static countMessagesByType(
    programs: EntityMap<Program>,
    messages: EPGValidationMessagesByProgram,
  ) {
    const count = {} as Record<EPGValidationMessageType, number>;
    Object.values(EPGValidationMessageType).forEach(l => {
      count[l] = 0;
    });
    programs.toArray().forEach(p => {
      messages[p.id].ALL.forEach(m => {
        count[m] += 1;
      });
    });
    return count;
  }

  static validate(programs: Program[]): EPGValidationMessagesByProgram {
    const messages = {} as EPGValidationMessagesByProgram;
    programs.forEach((p, i, progs) => {
      const messageTypes: EPGValidationMessageType[] = [];
      if (p.title === '') {
        messageTypes.push(EPGValidationMessageType.EMPTY_TITLE);
      }
      if (p.description === '') {
        messageTypes.push(EPGValidationMessageType.EMPTY_DESCRIPTION);
      }
      if (p.duration <= 0) {
        messageTypes.push(EPGValidationMessageType.INVALID_DURATION);
      }
      if (p.rating === ProgramRating.RSC) {
        messageTypes.push(EPGValidationMessageType.NO_PARENTAL_RATING);
      }
      if (p.startDateTime < new Date()) {
        messageTypes.push(EPGValidationMessageType.PAST_START_DATE);
      }
      if (p.startDateTime >= addToDate(new Date(), 2592000)) {
        // the start time is 30 days forward from now
        messageTypes.push(EPGValidationMessageType.FAR_START_DATE);
      }
      if (
        i > 0 &&
        p.startDateTime.getTime() !==
          addToDate(progs[i - 1].startDateTime, progs[i - 1].duration).getTime()
      ) {
        messageTypes.push(EPGValidationMessageType.TIME_GAP);
      }
      messages[p.id] = EPGValidator.buildValidationMessages(messageTypes);
    });
    return messages;
  }

  static adjustDateTimes(programs: Program[]): Program[] {
    const adjusted: Program[] = [];
    programs.forEach((p, i) => {
      if (!i) {
        adjusted.push(new Program({ ...p }));
        return;
      }
      const { startDateTime, duration } = adjusted[i - 1];
      adjusted.push(
        new Program({
          ...p,
          startDateTime: addToDate(startDateTime, duration),
        }),
      );
    });
    return adjusted;
  }
}
