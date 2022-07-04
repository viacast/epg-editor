import { Program } from 'services/epg';

export interface ProgramTableColumn {
  id: 'position' | keyof Program;
  minWidth?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: 'startDateTime' | 'endDateTime' | 'duration';
}

export default [
  { id: 'position', minWidth: 90 },
  {
    id: 'startDateTime',
    minWidth: 230,
    align: 'left',
    format: 'startDateTime',
  },
  {
    id: 'endDateTime',
    minWidth: 250,
    align: 'left',
    format: 'endDateTime',
  },
  {
    id: 'duration',
    minWidth: 140,
    align: 'left',
    format: 'duration',
  },
  {
    id: 'title',
    minWidth: 250,
    align: 'left',
  },
  {
    id: 'description',
    minWidth: 645,
    align: 'left',
  },
  {
    id: 'rating',
    minWidth: 250,
    align: 'left',
  },
] as ProgramTableColumn[];
