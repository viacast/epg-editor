import shortUUID from 'short-uuid';
import Program, { ProgramRating } from '../../../src/services/epg/program';
import EPGValidator, {
  EPGValidationMessageType,
} from '../../../src/services/epg/validator';
import { addToDate } from '../../../src/utils/general';

type ProgramWithValidationMessages = Program & {
  validationMessages: EPGValidationMessageType[];
};

describe('Validate programs', () => {
  it('should return no validation messages on a valid list of programs', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `EMPTY_TITLE` when a program title is empty', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: '',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.EMPTY_TITLE],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `EMPTY_DESCRIPTION` when a program description is empty', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description: '',
        startDateTime: addToDate(startDateTime, duration),
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.EMPTY_DESCRIPTION],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `INVALID_DURATION` when a program duration is not valid', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration: -1,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.INVALID_DURATION],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `NO_PARENTAL_RATING` when there is no parental rating', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration,
        rating: ProgramRating.RSC,
        validationMessages: [EPGValidationMessageType.NO_PARENTAL_RATING],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `PAST_START_DATE` when a program `startDateTime` is in the past', () => {
    const startDateTime = addToDate(new Date(), -864000);
    const duration = 3660;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.PAST_START_DATE],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.PAST_START_DATE],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `FAR_START_DATE` when a program `startDateTime` is too far in the future', () => {
    const startDateTime = addToDate(new Date(), 2592000);
    const duration = 3660;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.FAR_START_DATE],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.FAR_START_DATE],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return a validation message of type `TIME_GAP` when there is a time gap between two programs', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
        validationMessages: [],
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, 5700),
        duration,
        rating: ProgramRating.R12,
        validationMessages: [EPGValidationMessageType.TIME_GAP],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
  it('should return all possible validation messages', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 0;
    const programs: ProgramWithValidationMessages[] = [
      {
        id: shortUUID.generate(),
        title: '',
        description: '',
        startDateTime: addToDate(startDateTime, -2592000),
        duration,
        rating: ProgramRating.RSC,
        validationMessages: [
          EPGValidationMessageType.NO_PARENTAL_RATING,
          EPGValidationMessageType.PAST_START_DATE,
          EPGValidationMessageType.EMPTY_TITLE,
          EPGValidationMessageType.INVALID_DURATION,
          EPGValidationMessageType.EMPTY_DESCRIPTION,
        ],
      },
      {
        id: shortUUID.generate(),
        title: '',
        description: '',
        startDateTime: addToDate(startDateTime, 2592000),
        duration,
        rating: ProgramRating.RSC,
        validationMessages: [
          EPGValidationMessageType.FAR_START_DATE,
          EPGValidationMessageType.NO_PARENTAL_RATING,
          EPGValidationMessageType.EMPTY_TITLE,
          EPGValidationMessageType.EMPTY_DESCRIPTION,
          EPGValidationMessageType.INVALID_DURATION,
          EPGValidationMessageType.TIME_GAP,
        ],
      },
    ];
    const validation = EPGValidator.validate(programs);
    programs.forEach(p => {
      expect(validation[p.id]).toEqual(new Set(p.validationMessages));
    });
  });
});

describe('Adjust programs', () => {
  it('should return the same list of programs when adjusting programs that do not require adjustment', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const originalPrograms: Program[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    const adjustedPrograms: Program[] = [
      {
        id: originalPrograms[0].id,
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: originalPrograms[1].id,
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.adjustDateTimes(originalPrograms)).toMatchObject(
      adjustedPrograms,
    );
  });
  it('should return a programs list with adjusted start date times', () => {
    const startDateTime = addToDate(new Date(), 1000);
    const duration = 3600;
    const originalPrograms: Program[] = [
      {
        id: shortUUID.generate(),
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: shortUUID.generate(),
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, 5700),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    const adjustedPrograms: Program[] = [
      {
        id: originalPrograms[0].id,
        title: 'VALE A PENA VER DE NOVO',
        description:
          'Belíssima. A trama aborda o universo da beleza e da obrigação de colocar a aparência à frente de tudo.',
        startDateTime,
        duration,
        rating: ProgramRating.R12,
      },
      {
        id: originalPrograms[1].id,
        title: 'MALHAÇÃO - VIDAS BRASILEIRAS',
        description:
          'Em Malhação: Vidas Brasileiras, uma figura importante vai mergulhar fundo no universo dos alunos do ensino médio da escola Sapiência: a professora Gabriela Fortes.',
        startDateTime: addToDate(startDateTime, duration),
        duration: 2100,
        rating: ProgramRating.R12,
      },
    ];
    expect(EPGValidator.adjustDateTimes(originalPrograms)).toMatchObject(
      adjustedPrograms,
    );
  });
});
