export interface ProgramTableColumn {
  id: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
}

export default [
  { id: 'position', minWidth: 135 },
  { id: 'date', minWidth: 195 },
  {
    id: 'hour',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'duration',
    minWidth: 170,
    align: 'left',
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
