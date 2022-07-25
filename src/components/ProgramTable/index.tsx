import React, { useCallback } from 'react';
import { TableBody, TableHead } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { Program } from 'services/epg';
import { EntityMap } from 'utils';

import ProgramRow from './ProgramRow';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from './styles';
import programTableColumns from './programTableColumns';

export interface ProgramTableRefProps {
  scrollToSelected?: (options?: ScrollToOptions) => void;
}

export interface ProgramTableProps {
  forwardRef?: React.MutableRefObject<ProgramTableRefProps>;
  programs: EntityMap<Program>;
  selectedProgramId: string;
  setSelectedProgramId: (programId: string) => void;
  setPrograms: React.Dispatch<React.SetStateAction<EntityMap<Program>>>;
}

const ProgramTable: React.FC<ProgramTableProps> = ({
  forwardRef,
  programs,
  selectedProgramId,
  setSelectedProgramId,
  setPrograms,
}) => {
  const { t } = useTranslation();

  const handleAddProgram = useCallback(
    (program: Program) => {
      const newProgram = new Program({
        duration: 3600,
        startDateTime: program.startDateTime,
      });
      setPrograms(p => p.add(newProgram, program.id).clone());
      setSelectedProgramId(newProgram.id);
    },
    [setPrograms, setSelectedProgramId],
  );

  const handleMove = useCallback(
    (program: Program, direction: 'up' | 'down') => {
      setPrograms(p =>
        p.moveRelative(program.id, direction === 'up' ? -1 : 1).clone(),
      );
    },
    [setPrograms],
  );

  const renderProgramRow = useCallback(
    (program, index) => (
      <ProgramRow
        forwardRef={forwardRef}
        key={program.id}
        index={index}
        program={program}
        isSelected={program.id === selectedProgramId}
        setSelectedProgramId={setSelectedProgramId}
        handleAddProgram={handleAddProgram}
        handleMove={handleMove}
      />
    ),
    [
      forwardRef,
      handleAddProgram,
      handleMove,
      selectedProgramId,
      setSelectedProgramId,
    ],
  );

  return (
    <StyledPaper>
      <StyledTableContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <StyledTableRow>
              {programTableColumns.map(({ id, align, minWidth }) => (
                <StyledTableCell key={id} align={align} style={{ minWidth }}>
                  {t(`program-table:columnLabel_${id}`)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>{programs.toArray().map(renderProgramRow)}</TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StyledPaper>
  );
};

ProgramTable.defaultProps = {
  forwardRef: undefined,
};

export default ProgramTable;
