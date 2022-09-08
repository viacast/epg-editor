import { addToDate, EntityMap } from 'utils';
import Program, { ProgramRating } from './program';

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
  EPGValidationMessageLevel,
  EPGValidationMessageType[]
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
    });
    return messages;
  }

  static countMessages(message: Record<string, EPGValidationMessages>) {
    const messages = Object.values(message).map(p =>
      Object.values(p).map(e => e.length),
    );

    const totalInfo = messages
      .map(q => q[0])
      .reduce((partialSum, a) => partialSum + a, 0);
    const totalWarn = messages
      .map(q => q[1])
      .reduce((partialSum, a) => partialSum + a, 0);
    const totalError = messages
      .map(q => q[2])
      .reduce((partialSum, a) => partialSum + a, 0);

    return { INFO: totalInfo, WARN: totalWarn, ERROR: totalError };
  }

  static countAlerts(
    programs: EntityMap<Program>,
    messages: Record<string, EPGValidationMessages>,
  ) {
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let e = 0;
    let f = 0;
    let g = 0;
    programs.toArray().forEach(p => {
      messages[p.id].ERROR.map(m => {
        if (m === 'EMPTY_TITLE') {
          a += 1;
        }
        if (m === 'EMPTY_DESCRIPTION') {
          b += 1;
        }
        if (m === 'INVALID_DURATION') {
          c += 1;
        }
        if (m === 'TIME_GAP') {
          g += 1;
        }
        return [a, b, c, g];
      });
      messages[p.id].WARN.map(m => {
        if (m === 'NO_PARENTAL_RATING') {
          d += 1;
        }
        if (m === 'PAST_START_DATE') {
          f += 1;
        }
        return [d, f];
      });
      messages[p.id].INFO.map(m => {
        if (m === 'FAR_START_DATE') {
          e += 1;
        }
        return e;
      });
      return [a, b, c, d, e, f, g];
    });
    return [a, b, c, d, e, f, g];
  }

  static menuAlert(
    selectedProgram: Program,
    messages: Record<string, EPGValidationMessages>,
  ) {
    let a = false;
    let b = false;
    let c = false;
    let d = false;
    let e = false;
    let f = false;
    let g = false;
    messages[selectedProgram.id].ERROR.map(m => {
      if (m === 'EMPTY_TITLE') {
        a = true;
      }
      if (m === 'EMPTY_DESCRIPTION') {
        b = true;
      }
      if (m === 'INVALID_DURATION') {
        c = true;
      }
      if (m === 'TIME_GAP') {
        g = true;
      }
      return [a, b, c, g];
    });
    messages[selectedProgram.id].WARN.map(m => {
      if (m === 'NO_PARENTAL_RATING') {
        d = true;
      }
      if (m === 'PAST_START_DATE') {
        f = true;
      }
      return [d, f];
    });
    messages[selectedProgram.id].INFO.map(m => {
      if (m === 'FAR_START_DATE') {
        e = true;
      }
      return e;
    });
    return [a, b, c, d, e, f, g];
  }

  static validate(programs: Program[]): Record<string, EPGValidationMessages> {
    const messages: Record<string, EPGValidationMessages> = {};
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
        // the start time is 30 days far from now
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
