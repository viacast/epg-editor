import { Program } from 'services/epg';

export interface ProgramTableColumn {
  id: 'position' | 'endDateTime' | keyof Program;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: 'dateTime' | 'duration';
}

export default [
  { id: 'position', minWidth: 130, align: 'center' },
  {
    id: 'startDateTime',
    minWidth: 190,
    align: 'left',
    format: 'dateTime',
  },
  {
    id: 'endDateTime',
    minWidth: 190,
    align: 'left',
    format: 'dateTime',
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
