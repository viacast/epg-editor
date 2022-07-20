import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'components';
import { Program } from 'services/epg';
import { addToDate, formatDateTime, secondsToHms } from 'utils';
import { useScrollIntoView } from 'hooks';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';

import programTableColumns from '../programTableColumns';
import { IconRating, Message, StyledText } from './styles';
import { StyledTableCell, StyledTableRow } from '../styles';

export interface ProgramRowRefProps {
  scrollToSelected?: (options?: ScrollToOptions) => void;
}

export interface ProgramRowProps {
  forwardRef?: React.MutableRefObject<ProgramRowRefProps>;
  program: Program;
  index: number;
  isSelected: boolean;
  setSelectedProgramId: (programId: string) => void;
}

const ProgramRow: React.FC<ProgramRowProps> = ({
  forwardRef,
  program,
  index,
  isSelected,
  setSelectedProgramId,
}) => {
  const { t } = useTranslation();
  const selectedRowRef = useRef<HTMLTableRowElement>(null);

  const scrollToSelected = useScrollIntoView({
    ref: selectedRowRef,
  });

  if (forwardRef?.current) {
    // eslint-disable-next-line no-param-reassign
    forwardRef.current.scrollToSelected = scrollToSelected;
  }

  return (
    <StyledTableRow
      ref={isSelected ? selectedRowRef : undefined}
      role="checkbox"
      tabIndex={-1}
      key={program.id}
      selected={isSelected}
      onClick={() => setSelectedProgramId(program.id)}
    >
      {programTableColumns.map(({ id, align, format }) => {
        let value: Program[keyof Program] | JSX.Element = program[id];
        if (id === 'position') {
          value = `${index + 1}`;
        }
        if (id === 'endDateTime') {
          value = addToDate(program.startDateTime, program.duration);
        }
        if (id === 'rating') {
          const ratings = {
            RSC: IconSC,
            RL: IconRL,
            R10: IconR10,
            R12: IconR12,
            R14: IconR14,
            R16: IconR16,
            R18: IconR18,
          };
          value = <IconRating src={ratings[program[id]]} alt={program[id]} />;
        }
        if (format === 'dateTime') {
          value = formatDateTime(value as Date);
        }
        if (format === 'duration') {
          value = secondsToHms(value as number);
        }
        return (
          <StyledTableCell key={id} align={align}>
            <Tooltip
              title={
                <>
                  {id !== 'rating' && value}
                  {id === 'rating' && (
                    <Message>
                      {t(`parental-guidance:rating_${program[id]}`)}
                    </Message>
                  )}
                </>
              }
              arrow
            >
              <StyledText>
                {value}
                {id === 'rating' && (
                  <Message>
                    {t(`parental-guidance:rating_${program[id]}`)}
                  </Message>
                )}
              </StyledText>
            </Tooltip>
          </StyledTableCell>
        );
      })}
    </StyledTableRow>
  );
};

ProgramRow.defaultProps = {
  forwardRef: undefined,
};

export default React.memo(ProgramRow);
