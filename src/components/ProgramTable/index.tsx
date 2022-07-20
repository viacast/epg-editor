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
    (program, index) => (
      <ProgramRow
        forwardRef={forwardRef}
        key={program.id}
        index={index}
        program={program}
        isSelected={program.id === selectedProgramId}
        setSelectedProgramId={setSelectedProgramId}
      />
    ),
    [forwardRef, selectedProgramId, setSelectedProgramId],
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
