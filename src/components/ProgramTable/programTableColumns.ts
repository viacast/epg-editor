import { Program } from 'services/epg';

export interface ProgramTableColumn {
  id: 'position' | keyof Program;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: 'startDateTime' | 'endDateTime' | 'duration';
}

export default [
  { id: 'position', minWidth: 50 },
  {
    id: 'startDateTime',
    minWidth: 190,
    align: 'left',
    format: 'startDateTime',
  },
  {
    id: 'endDateTime',
    minWidth: 190,
    align: 'left',
    format: 'endDateTime',
  },
  {
    id: 'duration',
    minWidth: 110,
    align: 'left',
    format: 'duration',
  },
  {
    id: 'title',
    minWidth: 250,
    align: 'left',
  },
  {
    id: 'rating',
    minWidth: 340,
    align: 'left',
  },
  {
    id: 'description',
    minWidth: 645,
    align: 'left',
  },
] as ProgramTableColumn[];
