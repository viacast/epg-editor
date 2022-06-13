import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import {
  Text,
  Button,
  Input,
  Select as SelectRate,
  DatePickers,
  TimePickers,
  DurationPickers,
} from 'components';

import { Program, ProgramRating } from 'services/epg';
import structuredClone from '@ungap/structured-clone';
import { emptyProgram } from 'services/epg/program';
import {
  BottomContainer,
  ButtonContainer,
  ContentContainer,
  Form,
  FormColumn,
  FormContainer,
  FormRow,
  MenuContainer,
  MenuStyleProps,
  Toolbar,
} from './styles';

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
              <SelectRate
                value={newProgram?.rating.toString() ?? 'RL'}
                setValue={rating => {
                  setNewProgram(p => ({
                    ...p,
                    rating: rating as ProgramRating,
                  }));
                }}
              />
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
                  <TimePickers
                    time={newProgram?.startHour ?? new Date()}
                    onTimeChange={startHour =>
                      setNewProgram(p => ({ ...p, startHour }))
                    }
                  />
                </FormColumn>
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
          </FormContainer>
        </BottomContainer>
        <ButtonContainer>
          <Button
            margin="auto 0 0 0"
            text={t('menu:cancel')}
            icon={<CgClose />}
            onClick={() => {
              setIsClosing(true);
            }}
          />
          <Button
            margin="auto 0 0 27px"
            text={t('menu:save')}
            icon={<AiOutlineSave />}
            onClick={() => {
              if (newProgram) onSaveProgram(newProgram);
              setIsClosing(true);
            }}
          />
        </ButtonContainer>
      </ContentContainer>
    </MenuContainer>
  );
};

export default Menu;
