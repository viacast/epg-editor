import shortUUID from 'short-uuid';

// eslint-disable-next-line no-shadow
export enum ProgramRating {
  SC = 'SC',
  RL = 'RL',
  R10 = 'R10',
  R12 = 'R12',
  R14 = 'R14',
  R16 = 'R16',
  R18 = 'R18',
}

export interface IProgram {
  id?: string;
  startDate: Date;
  startTime: Date;
  duration: number;
  title: string;
  description: string;
  rating: ProgramRating;
}

export default class Program implements IProgram {
  public id: string;

  public startDate: Date;

  public startTime: Date;

  public duration: number;

  public title: string;

  public description: string;

  public rating: ProgramRating;

  constructor(program?: IProgram) {
    const { id, startDate, startTime, duration, title, description, rating } =
      program ?? {
        id: shortUUID.generate(),
        startDate: new Date(),
        startTime: new Date(),
        duration: 0,
        title: '',
        description: '',
        rating: ProgramRating.SC,
      };
    this.id = id ?? shortUUID.generate();
    this.startDate = startDate;
    this.startTime = startTime;
    this.duration = duration;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}
