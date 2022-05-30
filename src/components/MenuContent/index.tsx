import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button, Input, InputSelect } from 'components';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSave } from 'react-icons/ai';
import DatePicker from 'components/Pickers/DatePicker';
import TimePicker from 'components/Pickers/TimePicker';
import DurationPickers from 'components/Pickers/DurationPicker';
import RL from 'assets/icons/L.png';
import {
  BottomContainer,
  ButtonContainer,
  Container,
  Form,
  IconContainer,
  IconViacast,
  LoginFormContainer,
} from './styles';

// export interface ButtonProps {
//   onClick?: () => void;
// }

const MenuContent: React.FC = () => {
  const { t } = useTranslation();

  const value = <IconViacast src={RL} alt="RL" />;

  return (
    <Container>
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
              placeholder=""
              disabled={false}
              value=""
            />
            <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
              {t('menu:description')}
            </Text>
            <Input
              width="449px"
              height="45px"
              placeholder=""
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
                <DatePicker />
              </div>
              <div style={{ marginLeft: '37px' }}>
                <TimePicker />
              </div>
            </div>
            <Text noSelect fontFamily="Nunito Bold" fontSize="32px">
              {t('menu:length')}
            </Text>
            <DurationPickers />
            <ButtonContainer>
              <Button text={t('menu:save')} icon={<AiOutlineSave />} />
              <div style={{ marginLeft: '27px' }}>
                <Button
                  text={t('menu:cancel')}
                  icon={<CgClose />}
                  // onClick={onclick}
                />
              </div>
            </ButtonContainer>
          </Form>
        </LoginFormContainer>
      </BottomContainer>
    </Container>
  );
};

export default MenuContent;
