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
  Toolbar,
} from './styles';

export interface MenuProps {
  programs: Program[];
  selectedProgramId: string;
  setSelectedProgramId: (programId: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  programs,
  selectedProgramId,
  setSelectedProgramId,
}) => {
  const { t } = useTranslation();

  let i = 0;
  let title;
  let description;
  let rating;
  let defaultRate;
  let date;
  let time;
  let timeLength;

  while (i < programs.length) {
    if (programs[i].id === selectedProgramId) {
      title = programs[i].title;
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
    <MenuContainer>
      <Toolbar />
      <ContentContainer>
        <div className="Content" />
        <BottomContainer>
          <FormContainer>
            <Form onSubmit={() => ''}>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:title')}
              </Text>
              <Input
                width="449px"
                height="45px"
                defaultValue={title}
                disabled={false}
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:description')}
              </Text>
              <Input
                multiline
                maxRows={4}
                width="449px"
                height="130px"
                defaultValue={description}
                disabled={false}
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:parentalRating')}
              </Text>
              <SelectRate defaultValue={defaultRate} />
              <div>
                <div style={{ float: 'left' }}>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:date')}
                  </Text>
                </div>
                <div style={{ float: 'right', marginRight: '168px' }}>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:time')}
                  </Text>
                </div>
              </div>
              <div style={{ display: 'inline-flex', width: '449px' }}>
                <div style={{ float: 'left' }}>
                  <DatePicker programDate={date} />
                </div>
                <div style={{ marginLeft: '29px' }}>
                  <TimePicker programTime={time} />
                </div>
              </div>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:length')}
              </Text>
              <DurationPickers programDuration={timeLength} />
              <ButtonContainer>
                <Button
                  margin="auto 0 0 0"
                  text={t('menu:save')}
                  icon={<AiOutlineSave />}
                />
                <Button
                  margin="auto 0 0 27px"
                  text={t('menu:cancel')}
                  icon={<CgClose />}
                  onClick={() => {
                    setSelectedProgramId('');
                  }}
                />
              </ButtonContainer>
            </Form>
          </FormContainer>
        </BottomContainer>
      </ContentContainer>
    </MenuContainer>
  );
};

export default Menu;
