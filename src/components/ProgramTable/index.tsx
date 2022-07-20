import React, { useCallback } from 'react';
import { TableBody, TableHead } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { Program } from 'services/epg';
import { EntityMap } from 'utils';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from './styles';
import programTableColumns from './programTableColumns';
import ProgramRow from './ProgramRow';

export interface ProgramTableRefProps {
  scrollToSelected?: (options?: ScrollToOptions) => void;
}

export interface ProgramTableProps {
  forwardRef?: React.MutableRefObject<ProgramTableRefProps>;
  programs: EntityMap<Program>;
  selectedProgramId: string;
  setSelectedProgramId: (programId: string) => void;
}

const ProgramTable: React.FC<ProgramTableProps> = ({
  forwardRef,
  programs,
  selectedProgramId,
  setSelectedProgramId,
}) => {
  const { t } = useTranslation();

  const renderProgramRow = useCallback(
    (program, index, isSelected) => (
      <ProgramRow
        forwardRef={forwardRef}
        key={program.id}
        index={index}
        program={program}
        isSelected={isSelected}
        setSelectedProgramId={setSelectedProgramId}
      />
    ),
    [forwardRef, setSelectedProgramId],
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
          <TableBody>
            {programs
              .toArray()
              .map((program, index) =>
                renderProgramRow(
                  program,
                  index,
                  program.id === selectedProgramId,
                ),
              )}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StyledPaper>
  );
};

ProgramTable.defaultProps = {
  forwardRef: undefined,
};

export default ProgramTable;
