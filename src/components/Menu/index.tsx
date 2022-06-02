import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button, Input, InputSelect } from 'components';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import DatePicker from 'components/Pickers/DatePicker';
import TimePicker from 'components/Pickers/TimePicker';
import DurationPickers from 'components/Pickers/DurationPicker';
import CL from 'assets/icons/ratings/RL.png';
import C10 from 'assets/icons/ratings/R10.png';
import C12 from 'assets/icons/ratings/R12.png';
import C14 from 'assets/icons/ratings/R14.png';
import C16 from 'assets/icons/ratings/R16.png';
import C18 from 'assets/icons/ratings/R18.png';

import { Program } from 'services/epg';
import {
  BottomContainer,
  ButtonContainer,
  ContentContainer,
  Form,
  IconContainer,
  IconViacast,
  LoginFormContainer,
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
  let date;
  let time;
  let timeLength;

  while (i < programs.length) {
    if (programs[i].id === selectedProgramId) {
      title = programs[i].title;
      description = programs[i].description;
      rating = programs[i].rating;
      date = new Date(programs[i].startDate);
      time = new Date(programs[i].startHour);
      timeLength = programs[i].duration;
    }
    // eslint-disable-next-line no-plusplus
    ++i;
  }

  const ratings = {
    RL: CL,
    R10: C10,
    R12: C12,
    R14: C14,
    R16: C16,
    R18: C18,
  };

  const value = <IconViacast src={ratings[rating]} alt={rating} />;

  return (
    <MenuContainer>
      <Toolbar />
      <ContentContainer>
        <div className="Content" />
        <BottomContainer>
          <LoginFormContainer>
            <Form onSubmit={() => ''}>
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:title')}
              </Text>
              <Input
                width="449px"
                height="45px"
                placeholder={title}
                disabled={false}
                value=""
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:description')}
              </Text>
              <Input
                multiline
                maxRows={4}
                width="449px"
                height="130px"
                placeholder={description}
                disabled={false}
                value=""
              />
              <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                {t('menu:parentalRating')}
              </Text>
              <div style={{ display: 'inline-flex' }}>
                <InputSelect />
                <IconContainer>{value}</IconContainer>
              </div>
              <div>
                <div style={{ float: 'left' }}>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:date')}
                  </Text>
                </div>
                <div style={{ float: 'right', marginRight: '170px' }}>
                  <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
                    {t('menu:time')}
                  </Text>
                </div>
              </div>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ float: 'left' }}>
                  <DatePicker programDate={date} />
                </div>
                <div style={{ marginLeft: '37px' }}>
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
          </LoginFormContainer>
        </BottomContainer>
      </ContentContainer>
    </MenuContainer>
  );
};

export default Menu;
