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

export interface Program {
  id: string;
  startDate: Date;
  startTime: Date;
  duration: number;
  title: string;
  description: string;
  rating: ProgramRating;
}

export function emptyProgram(): Program {
  return {
    id: '',
    startDate: new Date(),
    startTime: new Date(),
    duration: 0,
    title: '',
    description: '',
    rating: ProgramRating.RL,
  };
}
