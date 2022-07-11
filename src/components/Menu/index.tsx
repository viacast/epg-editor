import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgClose, CgTimer, CgTrash } from 'react-icons/cg';
import { VscDiscard } from 'react-icons/vsc';
import { AiOutlineSave, AiOutlineClockCircle } from 'react-icons/ai';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { format } from 'date-fns';
import { Box, ClickAwayListener } from '@mui/material';
import structuredClone from '@ungap/structured-clone';

import {
  Text,
  Button,
  Input,
  ResizableInput,
  Select,
  DatePicker,
  TimePicker,
  DurationPicker,
} from 'components';
import { Program, ProgramRating } from 'services/epg';
import { EntityMap } from 'utils';
import SC from 'assets/icons/ratings/SC.svg';
import CL from 'assets/icons/ratings/RL.svg';
import C10 from 'assets/icons/ratings/R10.svg';
import C12 from 'assets/icons/ratings/R12.svg';
import C14 from 'assets/icons/ratings/R14.svg';
import C16 from 'assets/icons/ratings/R16.svg';
import C18 from 'assets/icons/ratings/R18.svg';

import { useModalProvider } from 'providers/ModalProvider';
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
  ToolbarText,
} from './styles';

const ratings = {
  RSC: SC,
  RL: CL,
  R10: C10,
  R12: C12,
  R14: C14,
  R16: C16,
  R18: C18,
};

export interface MenuProps extends MenuStyleProps {
  minWidth;
  hasChange;
  overflowStatus;
  programs: EntityMap<Program>;
  selectedProgramId: string;
  setIsClosing: (programId: boolean) => void;
  setHasChanges: (programId: boolean) => void;
  onSaveProgram: (program: Program) => void;
  handleRemoveProgram: (programId: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  minWidth,
  hasChange,
  overflowStatus,
  programs,
  selectedProgramId,
  setIsClosing,
  setHasChanges,
  onSaveProgram,
  handleRemoveProgram,
}) => {
  const { t } = useTranslation();

  const { openModal } = useModalProvider();
  const program = programs.get(selectedProgramId);
  const [newProgram, setNewProgram] = useState<Program>(
    program ? structuredClone(program) : new Program(),
  );
  const [openTime, setOpenTime] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [formattedDuration, setFormattedDuration] = useState('00:00:00');

  const stHour = format(time, 'HH:mm:ss');

  useEffect(() => {
    setTime(newProgram?.startTime);
    setDuration(newProgram?.duration);
    const num = duration;
    let hours = 0;
    let minutes = Math.floor(num / 60);
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes %= 60;
    }
    const seconds = num % 60;
    const d = new Date();
    d.setHours(hours, minutes, seconds);
    setFormattedDuration(format(d, 'HH:mm:ss'));
  }, [duration, newProgram]);

  useEffect(() => {
    setNewProgram(program ? structuredClone(program) : new Program());
  }, [program, selectedProgramId]);

  return (
    <MenuContainer minWidth={minWidth} overflowStatus={overflowStatus}>
      <Toolbar display={hasChange ? 'block' : 'none'}>
        <ToolbarText>
          {t('menu:edit')}: <p>{program?.title}</p>
        </ToolbarText>
        <VscDiscard
          id="menu-button-discard"
          size="20px"
          onClick={() => {
            if (!program) {
              return;
            }
            openModal({
              title: t('menu:discardProgramTitle'),
              content: t('menu:discardProgramMessage', {
                programTitle: program.title,
              }),
              confirm: () => {
                setNewProgram(program);
                setHasChanges(false);
              },
            });
          }}
        />
        <CgTrash
          id="menu-button-remove"
          size="20px"
          onClick={() => {
            if (!program) {
              return;
            }
            openModal({
              title: t('menu:deleteProgramTitle'),
              content: t('menu:deleteProgramMessage', {
                programTitle: program.title,
              }),
              confirm: () => {
                handleRemoveProgram(program.id);
              },
            });
          }}
        />
      </Toolbar>
      <ContentContainer>
        <BottomContainer>
          <FormContainer>
            <Form>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:title')}
              </Text>
              <Input
                height="45px"
                value={newProgram?.title}
                setValue={title => {
                  setNewProgram(p => ({ ...p, title }));
                  setHasChanges(true);
                }}
                onCtrlEnter={() => onSaveProgram(newProgram)}
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:description')}
              </Text>
              <ResizableInput
                maxRows={4}
                maxHeight="270px"
                value={newProgram?.description}
                setValue={description => {
                  setNewProgram(p => ({ ...p, description }));
                  setHasChanges(true);
                }}
                onCtrlEnter={() => onSaveProgram(newProgram)}
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
                    setHasChanges(true);
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
                    {t('menu:startDate')}
                  </Text>
                  <DatePicker
                    date={newProgram?.startDate ?? new Date()}
                    onDateChange={startDate => {
                      setNewProgram(p => {
                        const newStartTime = p.startTime;
                        newStartTime.setDate(startDate.getDate());
                        newStartTime.setMonth(startDate.getMonth());
                        newStartTime.setFullYear(startDate.getFullYear());
                        return { ...p, startDate, startTime: newStartTime };
                      });
                      setHasChanges(true);
                    }}
                  />
                </FormColumn>
                <FormColumn>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:startTime')}
                  </Text>
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={() => setOpenTime(false)}
                  >
                    <Box>
                      <HelpContainer>
                        <StyledInput variant="outlined">
                          <OutlinedInput
                            className="epg-time"
                            value={stHour}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setOpenTime(prev => !prev)}
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
                      {openTime ? (
                        <TimePicker
                          time={newProgram?.startTime ?? new Date()}
                          onTimeChange={startTime => {
                            setNewProgram(p => ({
                              ...p,
                              startTime,
                            }));
                            setHasChanges(true);
                          }}
                          setTime={setTime}
                        />
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                </FormColumn>
              </FormRow>
              <FormRow>
                <FormColumn>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:duration')}
                  </Text>
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={() => setOpenDuration(false)}
                  >
                    <Box>
                      <HelpContainer>
                        <StyledInput variant="outlined">
                          <OutlinedInput
                            className="epg-time"
                            value={formattedDuration}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setOpenDuration(prev => !prev)}
                                  aria-label="toggle password visibility"
                                  edge="end"
                                >
                                  <CgTimer />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </StyledInput>
                      </HelpContainer>
                      {openDuration ? (
                        <DurationPicker
                          duration={newProgram?.duration ?? 0}
                          onDurationChange={newDuration => {
                            setNewProgram(p => ({
                              ...p,
                              duration: newDuration,
                            }));
                            setHasChanges(true);
                          }}
                          setDuration={setDuration}
                        />
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                </FormColumn>
                <FormColumn />
              </FormRow>
            </Form>
            <ButtonContainer>
              <Button
                text={t('menu:cancel')}
                icon={<CgClose />}
                onClick={() => {
                  setIsClosing(true);
                  setHasChanges(false);
                }}
              />
              <Button
                text={t('menu:save')}
                icon={<AiOutlineSave />}
                onClick={() => {
                  if (newProgram) {
                    onSaveProgram(newProgram);
                  }
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
