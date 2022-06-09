/* eslint-disable no-param-reassign */
/* eslint-disable no-self-assign */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button, Input, SelectRate } from 'components';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import DatePicker from 'components/Pickers/DatePicker';
import TimePicker from 'components/Pickers/TimePicker';
import DurationPickers from 'components/Pickers/DurationPicker';

import { Program, ProgramRating } from 'services/epg';
import {
  BottomContainer,
  ButtonContainer,
  ContentContainer,
  Form,
  FormContainer,
  MenuContainer,
  MenuStyleProps,
  Toolbar,
} from './styles';

export interface MenuProps extends MenuStyleProps {
  minWidth;
  overflowStatus;
  programs: Program[];
  selectedProgramId: string;
  setisClosing: (programId: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({
  minWidth,
  overflowStatus,
  programs,
  selectedProgramId,
  setisClosing,
}) => {
  const { t } = useTranslation();

  const [program, setProgram] = React.useState<Program[]>(programs);

  let i = 0;
  let aux;
  let title;
  let editTitle;
  let description;
  let rating;
  let defaultRate;
  let date;
  let time;
  let timeLength;

  while (i < programs.length) {
    if (programs[i].id === selectedProgramId) {
      aux = i;
      title = programs[i].title;
      editTitle = title.toString();
      description = programs[i].description;
      rating = programs[i].rating;
      defaultRate = rating.toString();
      date = new Date(programs[i].startDate);
      time = new Date(programs[i].startHour);
      timeLength = programs[i].duration;
    }
    // eslint-disable-next-line no-plusplus
    ++i;
  }

  return (
    <MenuContainer minWidth={minWidth} overflowStatus={overflowStatus}>
      <Toolbar>
        {t('menu:edit')} <p>{editTitle}</p>
      </Toolbar>
      <ContentContainer>
        <BottomContainer>
          <FormContainer>
            <Form onSubmit={() => ''}>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:title')}
              </Text>
              <Input height="45px" defaultValue={title} disabled={false} />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:description')}
              </Text>
              <Input
                multiline
                maxRows={4}
                height="130px"
                defaultValue={description}
                disabled={false}
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:parentalRating')}
              </Text>
              <SelectRate defaultValue={defaultRate} />
              <div style={{ display: 'inline-flex', width: '100%' }}>
                <div style={{ width: '50%', float: 'left' }}>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:date')}
                  </Text>
                  <DatePicker programDate={date} />
                </div>
                <div style={{ width: '50%', marginLeft: '30px' }}>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:time')}
                  </Text>
                  <TimePicker programTime={time} />
                </div>
              </div>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:length')}
              </Text>
              <DurationPickers programDuration={timeLength} />
            </Form>
          </FormContainer>
        </BottomContainer>
        <ButtonContainer>
          <Button
            margin="auto 0 0 0"
            text={t('menu:cancel')}
            icon={<CgClose />}
            onClick={() => {
              setisClosing(true);
            }}
          />
          <Button
            margin="auto 0 0 27px"
            text={t('menu:save')}
            icon={<AiOutlineSave />}
            onClick={() => {
              let desc;
              if (document.getElementsByTagName('textarea')[0] !== undefined) {
                desc = document.getElementsByTagName('textarea')[0]?.innerHTML;
              }
              let dur;
              time = document.getElementsByTagName('input')[6].value;
              // eslint-disable-next-line no-restricted-globals
              if (isNaN(dur)) {
                dur =
                  time.split('hour')[0] * 3600 +
                  time.split('hour')[1].split('minutes')[0] * 60;
              } else {
                dur =
                  time.split('hours')[0] * 3600 +
                  time.split('hours')[1].split('minutes')[0] * 60;
              }
              const hour = new Date();
              const instant = document.getElementsByTagName('input')[5].value;
              hour.setHours(
                Number(instant.split(':')[0]),
                Number(instant.split(':')[1]),
                Number(instant.split(':')[2]),
              );
              const rate = document.getElementsByTagName('input')[3].value;
              const ratings = {
                RL: ProgramRating.RL,
                R10: ProgramRating.R10,
                R12: ProgramRating.R12,
                R14: ProgramRating.R14,
                R16: ProgramRating.R16,
                R18: ProgramRating.R18,
              };
              programs[aux].title =
                document.getElementsByTagName('input')[2].value;
              programs[aux].description = desc;
              programs[aux].rating = ratings[rate];
              programs[aux].startDate = new Date(
                document.getElementsByTagName('input')[4].value,
              );
              programs[aux].startHour = new Date(hour);
              programs[aux].duration = Number(dur);
              setProgram(programs);
              // console.log(aux);
              // console.log(program);
              setisClosing(true);
            }}
          />
        </ButtonContainer>
      </ContentContainer>
    </MenuContainer>
  );
};

export default Menu;
