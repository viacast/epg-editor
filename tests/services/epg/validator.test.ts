import shortUUID from 'short-uuid';
import Program, { ProgramRating } from '../../../src/services/epg/program';
import EPGValidator, {
  EPGValidationMessageType,
} from '../../../src/services/epg/validator';
import { addToDate } from '../../../src/utils/general';

describe('Validate programs', () => {
  it('should return no validation messages on a valid list of programs', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const validPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(validPrograms)).toMatchObject({
      [validPrograms[0].id]: EPGValidator.buildValidationMessages(),
      [validPrograms[1].id]: EPGValidator.buildValidationMessages(),
    });
  });
  it('should return a validation message of type `EMPTY_TITLE` when a program title is empty', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const emptyTitlePrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: '',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(emptyTitlePrograms)).toMatchObject({
      [emptyTitlePrograms[0].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.EMPTY_TITLE,
      ]),
      [emptyTitlePrograms[1].id]: EPGValidator.buildValidationMessages(),
    });
  });
  it('should return a validation message of type `EMPTY_DESCRIPTION` when a program description is empty', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const emptyDescriptionPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description: '',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(emptyDescriptionPrograms)).toMatchObject({
      [emptyDescriptionPrograms[0].id]: EPGValidator.buildValidationMessages(),
      [emptyDescriptionPrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.EMPTY_DESCRIPTION,
      ]),
    });
  });
  it('should return a validation message of type `INVALID_DURATION` when a program duration is not valid', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const invalidDurationPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: -1,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(invalidDurationPrograms)).toMatchObject({
      [invalidDurationPrograms[0].id]: EPGValidator.buildValidationMessages(),
      [invalidDurationPrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.INVALID_DURATION,
      ]),
    });
  });
  it('should return a validation message of type `NO_PARENTAL_RATING` when there is no parental rating', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const noParentalRatingPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.RSC,
      },
    ];
    expect(EPGValidator.validate(noParentalRatingPrograms)).toMatchObject({
      [noParentalRatingPrograms[0].id]: EPGValidator.buildValidationMessages(),
      [noParentalRatingPrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.NO_PARENTAL_RATING,
      ]),
    });
  });
  it('should return a validation message of type `PAST_START_DATE` when a program `startDateTime` is in the past', () => {
    const firstStartDateTime = addToDate(new Date(), -864000);
    const duration = 3660;
    const pastStartDatePrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(pastStartDatePrograms)).toMatchObject({
      [pastStartDatePrograms[0].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.PAST_START_DATE,
      ]),
      [pastStartDatePrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.PAST_START_DATE,
      ]),
    });
  });
  it('should return a validation message of type `FAR_START_DATE` when a program `startDateTime` is too far in the future', () => {
    const firstStartDateTime = addToDate(new Date(), 2592000);
    const duration = 3660;
    const farStartDatePrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(farStartDatePrograms)).toMatchObject({
      [farStartDatePrograms[0].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.FAR_START_DATE,
      ]),
      [farStartDatePrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.FAR_START_DATE,
      ]),
    });
  });
  it('should return a validation message of type `TIME_GAP` when there is a time gap between two programs', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const timeGapPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, 5700),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(timeGapPrograms)).toMatchObject({
      [timeGapPrograms[0].id]: EPGValidator.buildValidationMessages(),
      [timeGapPrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.TIME_GAP,
      ]),
    });
  });
  it('should return all possible validation messages', () => {
    const firstStartDateTime = new Date();
    const duration = 0;
    const allMessagesPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: '',
        description: '',
        startDateTime: addToDate(firstStartDateTime, -2592000),
        duration,
        rating: ProgramRating.RSC,
      },
      {
        id: shortUUID.toString(),
        title: '',
        description: '',
        startDateTime: addToDate(firstStartDateTime, 2592000),
        duration,
        rating: ProgramRating.RSC,
      },
    ];
    expect(EPGValidator.validate(allMessagesPrograms)).toMatchObject({
      [allMessagesPrograms[0].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.NO_PARENTAL_RATING,
        EPGValidationMessageType.PAST_START_DATE,
        EPGValidationMessageType.EMPTY_TITLE,
        EPGValidationMessageType.INVALID_DURATION,
        EPGValidationMessageType.EMPTY_DESCRIPTION,
      ]),
      [allMessagesPrograms[1].id]: EPGValidator.buildValidationMessages([
        EPGValidationMessageType.FAR_START_DATE,
        EPGValidationMessageType.NO_PARENTAL_RATING,
        EPGValidationMessageType.EMPTY_TITLE,
        EPGValidationMessageType.EMPTY_DESCRIPTION,
        EPGValidationMessageType.INVALID_DURATION,
        EPGValidationMessageType.TIME_GAP,
      ]),
    });
  });
});

describe('Adjust programs', () => {
  it('should return the same list of programs when adjusting programs that do not require adjustment', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const originalPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    const adjustedPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.adjustDateTimes(originalPrograms)).toEqual(
      adjustedPrograms,
    );
  });
  it('should return a programs list with adjusted start date times', () => {
    const firstStartDateTime = new Date();
    const duration = 3600;
    const originalPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, 5700),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    const adjustedPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: firstStartDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(firstStartDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.adjustDateTimes(originalPrograms)).toEqual(
      adjustedPrograms,
    );
  });
});
