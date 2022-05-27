export interface ProgramTableColumn {
  id: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
}

export default [
  { id: 'position', label: '#', minWidth: 90 },
  { id: 'date', minWidth: 140 },
  {
    id: 'hour',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 'duration',
    minWidth: 140,
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
