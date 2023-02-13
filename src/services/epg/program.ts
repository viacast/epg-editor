import shortUUID from 'short-uuid';

// eslint-disable-next-line no-shadow
export enum ProgramRating {
  RSC = 'RSC',
  RL = 'RL',
  R10 = 'R10',
  R12 = 'R12',
  R14 = 'R14',
  R16 = 'R16',
  R18 = 'R18',
}

// eslint-disable-next-line no-shadow
export enum ProgramContent {
  F = '',
  D = 'Drugs',
  V = 'Violence',
  S = 'Sex',
  DV = 'Drugs and Violence',
  DS = 'Drugs and Sex',
  VS = 'Violence and Sex',
  DVS = 'Drugs, Violence and Sex',
}

// eslint-disable-next-line no-shadow
export enum ProgramCategory {
  '0x0' = 'Jornalismo',
  '0x1' = 'Esporte',
  '0x2' = 'Educativo',
  '0x3' = 'Novela',
  '0x4' = 'Minissérie',
  '0x5' = 'Série/seriado',
  '0x6' = 'Variedade',
  '0x7' = 'Reality show',
  '0x8' = 'Informação',
  '0x9' = 'Humorístico',
  '0xA' = 'Infantil',
  '0xB' = 'Erótico',
  '0xC' = 'Filme',
  '0xD' = 'Sorteio, televendas, premiação',
  '0xE' = 'Debate/entrevista',
  '0xF' = 'Outros',
}

export interface IProgram {
  id?: string;
  startDateTime: Date;
  duration: number; // in seconds
  title: string;
  description: string;
  rating: ProgramRating;
  content: ProgramContent;
  category: ProgramCategory;
  subcategory: string;
}

export default class Program implements IProgram {
  public id: string;

  public startDateTime: Date;

  public duration: number; // in seconds

  public title: string;

  public description: string;

  public rating: ProgramRating;

  public content: ProgramContent;

  public category: ProgramCategory;

  public subcategory: string;

  constructor(program?: Partial<IProgram>) {
    const {
      id,
      startDateTime,
      duration,
      title,
      description,
      rating,
      content,
      category,
      subcategory,
    } = program ?? {
      id: shortUUID.generate(),
      startDateTime: new Date(),
      duration: 0,
      title: '',
      description: '',
      rating: ProgramRating.RSC,
      content: ProgramContent.F,
      category: ProgramCategory['0xF'],
      subcategory: 'Outros',
    };
    this.id = id ?? shortUUID.generate();
    this.startDateTime = startDateTime ? new Date(startDateTime) : new Date();
    this.duration = duration ?? 0;
    this.title = title ?? '';
    this.description = description ?? '';
    this.rating = rating ?? ProgramRating.RSC;
    this.content = content ?? ProgramContent.F;
    this.category = category ?? ProgramCategory['0xF'];
    this.subcategory = subcategory ?? 'Outros';
  }
}
