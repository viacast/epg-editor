import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgClose, CgTimer, CgTrash } from 'react-icons/cg';
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
  Select,
  DatePickers,
  TimePickers,
  DurationPickers,
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
  overflowStatus;
  programs: EntityMap<Program>;
  selectedProgramId: string;
  setIsClosing: (programId: boolean) => void;
  onSaveProgram: (program: Program) => void;
  handleRemoveProgram: (programId: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  minWidth,
  overflowStatus,
  programs,
  selectedProgramId,
  setIsClosing,
  onSaveProgram,
  handleRemoveProgram,
}) => {
  const { t } = useTranslation();

  const program = programs.get(selectedProgramId);
  const [newProgram, setNewProgram] = useState<Program>(
    program ? structuredClone(program) : new Program(),
  );
  const [openTime, setOpenTime] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [leng, setLeng] = useState('');

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
    setLeng(format(d, 'HH:mm:ss'));
  }, [duration, newProgram]);

  useEffect(() => {
    setNewProgram(program ? structuredClone(program) : new Program());
  }, [program, selectedProgramId]);

  const handleClickTime = () => {
    setOpenTime(prev => !prev);
  };

  const handleClickAwayTime = () => {
    setOpenTime(false);
  };

  const handleClickDuration = () => {
    setOpenDuration(prev => !prev);
  };

  const handleClickAwayDuration = () => {
    setOpenDuration(false);
  };

  return (
    <MenuContainer minWidth={minWidth} overflowStatus={overflowStatus}>
      <Toolbar>
        <ToolbarText>
          {t('menu:edit')}: <p>{program?.title}</p>
        </ToolbarText>
        <CgTrash
          size="20px"
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals, no-alert
            if (confirm(t('menu:delete', { programTitle: program.title }))) {
              handleRemoveProgram(program.id);
            }
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
                setValue={title => setNewProgram(p => ({ ...p, title }))}
                onCtrlEnter={() => onSaveProgram(newProgram)}
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
                      setNewProgram(p => {
                        const newStartTime = p.startTime;
                        newStartTime.setDate(startDate.getDate());
                        newStartTime.setMonth(startDate.getMonth());
                        newStartTime.setFullYear(startDate.getFullYear());
                        return { ...p, startDate, startTime: newStartTime };
                      })
                    }
                  />
                </FormColumn>
                <FormColumn>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:time')}
                  </Text>
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={handleClickAwayTime}
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
                                  onClick={handleClickTime}
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
                        <TimePickers
                          time={newProgram?.startTime ?? new Date()}
                          onTimeChange={startTime =>
                            setNewProgram(p => ({
                              ...p,
                              startTime,
                            }))
                          }
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
                    {t('menu:length')}
                  </Text>
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={handleClickAwayDuration}
                  >
                    <Box>
                      <HelpContainer>
                        <StyledInput variant="outlined">
                          <OutlinedInput
                            className="epg-time"
                            value={leng}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickDuration}
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
                        <DurationPickers
                          duration={newProgram?.duration ?? 0}
                          onDurationChange={newDuration =>
                            setNewProgram(p => ({
                              ...p,
                              duration: newDuration,
                            }))
                          }
                          setDuration={setDuration}
                        />
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                </FormColumn>
                <FormColumn /> {/* empty column */}
              </FormRow>
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
