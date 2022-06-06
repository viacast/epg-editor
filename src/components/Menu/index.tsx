import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button, Input, SelectRate } from 'components';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import DatePicker from 'components/Pickers/DatePicker';
import TimePicker from 'components/Pickers/TimePicker';
import DurationPickers from 'components/Pickers/DurationPicker';

import { Program } from 'services/epg';
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

  let i = 0;
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
          />
        </ButtonContainer>
      </ContentContainer>
    </MenuContainer>
  );
};

export default Menu;
