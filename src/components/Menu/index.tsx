import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSave, AiOutlineClockCircle } from 'react-icons/ai';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Text,
  Button,
  Input,
  Select,
  DatePickers,
  TimePickers,
  DurationPickers,
} from 'components';

import { Program, ProgramRating } from 'services/epg';
import structuredClone from '@ungap/structured-clone';
import { emptyProgram } from 'services/epg/program';

import CL from 'assets/icons/ratings/RL.svg';
import C10 from 'assets/icons/ratings/R10.svg';
import C12 from 'assets/icons/ratings/R12.svg';
import C14 from 'assets/icons/ratings/R14.svg';
import C16 from 'assets/icons/ratings/R16.svg';
import C18 from 'assets/icons/ratings/R18.svg';

import {
  BottomContainer,
  ButtonContainer,
  ContentContainer,
  Form,
  FormColumn,
  FormContainer,
  FormRow,
  Icon,
  IconContainer,
  MenuContainer,
  MenuStyleProps,
  SelectRateContainer,
  Toolbar,
  StyledInput,
  HelpContainer,
} from './styles';

const ratings = {
  RL: CL,
  R10: C10,
  R12: C12,
  R14: C14,
  R16: C16,
  R18: C18,
};

export interface MenuProps extends MenuStyleProps {
  minWidth;
  overflowStatus;
  programs: Program[];
  selectedProgramId: string;
  setIsClosing: (programId: boolean) => void;
  onSaveProgram: (newprogram: Program) => void;
}

const Menu: React.FC<MenuProps> = ({
  minWidth,
  overflowStatus,
  programs,
  selectedProgramId,
  setIsClosing,
  onSaveProgram,
}) => {
  const { t } = useTranslation();

  const program = programs.find(p => p.id === selectedProgramId);
  const [newProgram, setNewProgram] = useState<Program>(
    program ? structuredClone(program) : emptyProgram(),
  );

  useEffect(() => {
    setNewProgram(program ? structuredClone(program) : emptyProgram());
  }, [program, selectedProgramId]);

  const [style, setStyle] = useState('none');
  const [time, setTime] = useState('00:00:00');

  return (
    <MenuContainer minWidth={minWidth} overflowStatus={overflowStatus}>
      <Toolbar>
        {t('menu:edit')}: <p>{newProgram?.title}</p>
      </Toolbar>
      <ContentContainer>
        <BottomContainer>
          <FormContainer>
            <Form onSubmit={() => ''}>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:title')}
              </Text>
              <Input
                height="45px"
                value={newProgram?.title}
                setValue={title => setNewProgram(p => ({ ...p, title }))}
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:description')}
              </Text>
              <Input
                multiline
                maxRows={4}
                height="130px"
                value={newProgram?.description}
                setValue={description =>
                  setNewProgram(p => ({ ...p, description }))
                }
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:parentalRating')}
              </Text>
              <SelectRateContainer>
                <Select
                  value={newProgram?.rating.toString() ?? ProgramRating.RL}
                  setValue={rating => {
                    setNewProgram(p => ({
                      ...p,
                      rating: rating as ProgramRating,
                    }));
                  }}
                  options={Object.values(ProgramRating).map(r => ({
                    label: t(`parental-guidance:rating_${r}`),
                    value: r.toString(),
                  }))}
                />
                <IconContainer>
                  <Icon
                    src={
                      ratings[newProgram?.rating.toString() ?? ProgramRating.RL]
                    }
                    alt="Rate Icon"
                  />
                </IconContainer>
              </SelectRateContainer>
              <FormRow>
                <FormColumn>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:date')}
                  </Text>
                  <DatePickers
                    date={newProgram?.startDate ?? new Date()}
                    onDateChange={startDate =>
                      setNewProgram(p => ({ ...p, startDate }))
                    }
                  />
                </FormColumn>
                <FormColumn>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:time')}
                  </Text>
                  <HelpContainer
                    onClick={() => {
                      setStyle(style === 'none' ? 'block' : 'none');
                    }}
                  >
                    <StyledInput disabled variant="outlined">
                      <OutlinedInput
                        style={{
                          color: 'var(--color-neutral-3)',
                          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                          fontSize: '18px',
                        }}
                        value={time}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <AiOutlineClockCircle />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </StyledInput>
                  </HelpContainer>
                </FormColumn>
                <HelpContainer
                  style={{
                    display: style,
                    position: 'absolute',
                    background: 'var(--color-neutral-6)',
                    border: '4px solid var(--color-neutral-6)',
                    borderRadius: '4px',
                    zIndex: '3',
                    marginTop: '38px',
                    marginLeft: '155px',
                    transform: 'scale(0.75)',
                  }}
                >
                  <TimePickers
                    time={newProgram?.startHour ?? new Date()}
                    onTimeChange={startHour =>
                      setNewProgram(p => ({ ...p, startHour }))
                    }
                  />
                </HelpContainer>
              </FormRow>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:length')}
              </Text>
              <DurationPickers
                duration={newProgram?.duration ?? 0}
                onDurationChange={duration =>
                  setNewProgram(p => ({ ...p, duration }))
                }
              />
            </Form>
            <ButtonContainer>
              <Button
                text={t('menu:cancel')}
                icon={<CgClose />}
                onClick={() => {
                  setIsClosing(true);
                }}
              />
              <Button
                text={t('menu:save')}
                icon={<AiOutlineSave />}
                onClick={() => {
                  if (newProgram) onSaveProgram(newProgram);
                  setIsClosing(true);
                }}
              />
            </ButtonContainer>
          </FormContainer>
        </BottomContainer>
      </ContentContainer>
    </MenuContainer>
  );
};

export default Menu;
