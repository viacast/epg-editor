import shortUUID from 'short-uuid';
import Program, { ProgramRating } from '../../../src/services/epg/program';
import EPGValidator, {
  EPGValidationMessageLevel,
  EPGValidationMessageType,
} from '../../../src/services/epg/validator';

describe('Validate programs', () => {
  it('should return a list of programs when there are no exceptions', () => {
    const validPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(validPrograms)).toMatchObject({
      [validPrograms[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
      [validPrograms[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
    });
  });
  it('should return an `ERROR` validation message of type `EMPTY_TITLE` when a program title is empty', () => {
    const emptyTitle: Program[] = [
      {
        id: shortUUID.toString(),
        title: '',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(emptyTitle)).toMatchObject({
      [emptyTitle[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [
          EPGValidationMessageType.EMPTY_TITLE,
        ],
      },
      [emptyTitle[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
    });
  });
  it('should return an `ERROR` validation message of type `EMPTY_DESCRIPTION` when a program description is empty', () => {
    const emptyDescription: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description: '',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(emptyDescription)).toMatchObject({
      [emptyDescription[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
      [emptyDescription[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [
          EPGValidationMessageType.EMPTY_DESCRIPTION,
        ],
      },
    });
  });
  it('should return an `ERROR` validation message of type `INVALID_DURATION` when a program duration is zero', () => {
    const invalidDuration: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 0,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(invalidDuration)).toMatchObject({
      [invalidDuration[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [
          EPGValidationMessageType.INVALID_DURATION,
        ],
      },
      [invalidDuration[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
    });
  });
  it('should return an `WARN` validation message of type `NO_PARENTAL_RATING` when there are no parental rating', () => {
    const noParentalRating: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.RSC,
      },
    ];
    expect(EPGValidator.validate(noParentalRating)).toMatchObject({
      [noParentalRating[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
      [noParentalRating[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [
          EPGValidationMessageType.NO_PARENTAL_RATING,
        ],
        [EPGValidationMessageLevel.ERROR]: [],
      },
    });
  });
  it('should return an `WARN` validation message of type `PAST_START_DATE` when a program startDateTime is in the past', () => {
    const pastStartDate: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 12, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(pastStartDate)).toMatchObject({
      [pastStartDate[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [
          EPGValidationMessageType.PAST_START_DATE,
        ],
        [EPGValidationMessageLevel.ERROR]: [],
      },
      [pastStartDate[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
    });
  });
  it('should return an `INFO` validation message of type `FAR_START_DATE` when a program `startDateTime` is too far in the future', () => {
    const farStartDatePrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 6, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(farStartDatePrograms)).toMatchObject({
      [farStartDatePrograms[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
      [farStartDatePrograms[1].id]: {
        [EPGValidationMessageLevel.INFO]: [
          EPGValidationMessageType.FAR_START_DATE,
        ],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
    });
  });
  it('should return an `ERROR` validation message of type `TIME_GAP` when there are a gap between two programs', () => {
    const timeGap: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 18, 35, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.validate(timeGap)).toMatchObject({
      [timeGap[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [],
      },
      [timeGap[1].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [],
        [EPGValidationMessageLevel.ERROR]: [EPGValidationMessageType.TIME_GAP],
      },
    });
  });
  it('should return all possible validation messages', () => {
    const allExceptions: Program[] = [
      {
        id: shortUUID.toString(),
        title: '',
        description: '',
        startDateTime: new Date(2022, 4, 22, 16, 55, 0),
        duration: 0,
        rating: ProgramRating.RSC,
      },
      {
        id: shortUUID.toString(),
        title: '',
        description: '',
        startDateTime: new Date(2022, 6, 22, 18, 35, 0),
        duration: 0,
        rating: ProgramRating.RSC,
      },
    ];
    expect(EPGValidator.validate(allExceptions)).toMatchObject({
      [allExceptions[0].id]: {
        [EPGValidationMessageLevel.INFO]: [],
        [EPGValidationMessageLevel.WARN]: [
          EPGValidationMessageType.NO_PARENTAL_RATING,
          EPGValidationMessageType.PAST_START_DATE,
        ],
        [EPGValidationMessageLevel.ERROR]: [
          EPGValidationMessageType.EMPTY_TITLE,
          EPGValidationMessageType.INVALID_DURATION,
          EPGValidationMessageType.EMPTY_DESCRIPTION,
        ],
      },
      [allExceptions[1].id]: {
        [EPGValidationMessageLevel.INFO]: [
          EPGValidationMessageType.FAR_START_DATE,
        ],
        [EPGValidationMessageLevel.WARN]: [
          EPGValidationMessageType.NO_PARENTAL_RATING,
        ],
        [EPGValidationMessageLevel.ERROR]: [
          EPGValidationMessageType.EMPTY_TITLE,
          EPGValidationMessageType.EMPTY_DESCRIPTION,
          EPGValidationMessageType.INVALID_DURATION,
          EPGValidationMessageType.TIME_GAP,
        ],
      },
    });
  });
});

describe('Adjust programs', () => {
  it('should return the same list of programs when the startDateTimes are ordinated', () => {
    const originalPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    const ordinatedPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.adjustDateTimes(originalPrograms)).toEqual(
      ordinatedPrograms,
    );
  });
  it('should return an ordinated programs list', () => {
    const originalPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 18, 35, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    const ordinatedPrograms: Program[] = [
      {
        id: shortUUID.toString(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime: new Date(2022, 5, 22, 16, 55, 0),
        duration: 3600,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.toString(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: new Date(2022, 5, 22, 17, 55, 0),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.adjustDateTimes(originalPrograms)).toEqual(
      ordinatedPrograms,
    );
  });
});
