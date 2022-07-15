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

export interface IProgram {
  id?: string;
  startDateTime: Date;
  duration: number; // in seconds
  title: string;
  description: string;
  rating: ProgramRating;
}

export default class Program implements IProgram {
  public id: string;

  public startDateTime: Date;

  public duration: number; // in seconds

  public title: string;

  public description: string;

  public rating: ProgramRating;

  constructor(program?: IProgram) {
    const { id, startDateTime, duration, title, description, rating } =
      program ?? {
        id: shortUUID.generate(),
        startDateTime: new Date(),
        duration: 0,
        title: '',
        description: '',
        rating: ProgramRating.RSC,
      };
    this.id = id ?? shortUUID.generate();
    this.startDateTime = startDateTime ? new Date(startDateTime) : new Date();
    this.duration = duration ?? 3600;
    this.title = title ?? '';
    this.description = description ?? '';
    this.rating = rating ?? ProgramRating.RSC;
  }
}
