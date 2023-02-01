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

export interface IProgram {
  id?: string;
  startDateTime: Date;
  duration: number; // in seconds
  title: string;
  description: string;
  rating: ProgramRating;
  content: ProgramContent;
}

export default class Program implements IProgram {
  public id: string;

  public startDateTime: Date;

  public duration: number; // in seconds

  public title: string;

  public description: string;

  public rating: ProgramRating;

  public content: ProgramContent;

  constructor(program?: Partial<IProgram>) {
    const { id, startDateTime, duration, title, description, rating, content } =
      program ?? {
        id: shortUUID.generate(),
        startDateTime: new Date(),
        duration: 0,
        title: '',
        description: '',
        rating: ProgramRating.RSC,
        content: ProgramContent.F,
      };
    this.id = id ?? shortUUID.generate();
    this.startDateTime = startDateTime ? new Date(startDateTime) : new Date();
    this.duration = duration ?? 0;
    this.title = title ?? '';
    this.description = description ?? '';
    this.rating = rating ?? ProgramRating.RSC;
    this.content = content ?? ProgramContent.F;
  }
}
