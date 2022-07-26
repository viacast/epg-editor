import { addToDate } from 'utils';
import Program, { ProgramRating } from './program';

// eslint-disable-next-line no-shadow
export enum EPGValidationMessageLevel {
  UNKNOWN = 'UNKNOWN',
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

export default class EPGValidator {
  static validate(
    programs: Program[],
  ): Record<string, Set<EPGValidationMessageType>> {
    const messages: Record<string, Set<EPGValidationMessageType>> = {};
    programs.forEach((p, i, progs) => {
      const messageTypes = new Set<EPGValidationMessageType>();
      if (p.title === '') {
        messageTypes.add(EPGValidationMessageType.EMPTY_TITLE);
      }
      if (p.description === '') {
        messageTypes.add(EPGValidationMessageType.EMPTY_DESCRIPTION);
      }
      if (p.duration <= 0) {
        messageTypes.add(EPGValidationMessageType.INVALID_DURATION);
      }
      if (p.rating === ProgramRating.RSC) {
        messageTypes.add(EPGValidationMessageType.NO_PARENTAL_RATING);
      }
      if (p.startDateTime < new Date()) {
        messageTypes.add(EPGValidationMessageType.PAST_START_DATE);
      }
      if (p.startDateTime >= addToDate(new Date(), 2592000)) {
        // the start time is 30 days far from now
        messageTypes.add(EPGValidationMessageType.FAR_START_DATE);
      }
      if (
        i > 0 &&
        p.startDateTime.getTime() !==
          addToDate(progs[i - 1].startDateTime, progs[i - 1].duration).getTime()
      ) {
        messageTypes.add(EPGValidationMessageType.TIME_GAP);
      }
      messages[p.id] = messageTypes;
    });
    return messages;
  }

  static getValidationMessageLevel(
    type: EPGValidationMessageType,
  ): EPGValidationMessageLevel {
    return (
      {
        [EPGValidationMessageType.EMPTY_TITLE]: EPGValidationMessageLevel.ERROR,
        [EPGValidationMessageType.EMPTY_DESCRIPTION]:
          EPGValidationMessageLevel.ERROR,
        [EPGValidationMessageType.INVALID_DURATION]:
          EPGValidationMessageLevel.ERROR,
        [EPGValidationMessageType.NO_PARENTAL_RATING]:
          EPGValidationMessageLevel.WARN,
        [EPGValidationMessageType.PAST_START_DATE]:
          EPGValidationMessageLevel.WARN,
        [EPGValidationMessageType.FAR_START_DATE]:
          EPGValidationMessageLevel.INFO,
        [EPGValidationMessageType.TIME_GAP]: EPGValidationMessageLevel.ERROR,
      }[type] ?? EPGValidationMessageLevel.UNKNOWN
    );
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
