import * as React from 'react';
import { ClickAwayListener } from '@mui/material';
import { IoIosTimer } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { leadingZeros, secondsToHms, hmsToSeconds } from 'utils/formatting';
import { useWindowSize } from 'hooks';
import {
  StyledContainer,
  StyledInput,
  StyledInputStack,
  StyledBoxStack,
  StyledInputsContainer,
  StyledInputs,
  StyledFooter,
  SetyledButton,
  StyledIconContainer,
  StyledGroups,
  StyledTitle,
} from './styles';

export interface DurationPickerProps {
  value: number;
  onSubmit: (value: number) => void;
}

const SvgComponent = () => (
  <svg width={12} height={80}>
    <circle cx={6} cy={20} r={4} fill="var(--color-neutral-3)" />
    <circle cx={6} cy={50} r={4} fill="var(--color-neutral-3)" />
  </svg>
);

const DurationPicker: React.FC<DurationPickerProps> = ({ value, onSubmit }) => {
  const { t } = useTranslation();

  const dimension = useWindowSize();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const [hours, setHours] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [seconds, setSeconds] = React.useState('');

  React.useEffect(() => {
    if (value) {
      setHours(secondsToHms(value).slice(0, 2));
      setMinutes(secondsToHms(value).slice(3, 5));
      setSeconds(secondsToHms(value).slice(6, 8));
    }
  }, [value]);

  const [originalValue, setOriginalValue] = React.useState('');

  React.useEffect(() => {
    if (value) {
      setOriginalValue(secondsToHms(value));
    }
  }, [value]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <StyledContainer>
        <StyledInputStack id="epg-duration-input-ref">
          <StyledInput
            value={`${leadingZeros(hours)}:${leadingZeros(
              minutes,
            )}:${leadingZeros(seconds)}`}
          />
          <StyledIconContainer onClick={handleClick}>
            <IoIosTimer aria-label="toggle password visibility" />
          </StyledIconContainer>
        </StyledInputStack>
        {open ? (
          <StyledBoxStack
            className="epg-duration-box"
            marginTop={dimension.height > 770 ? '5px' : '-222.5px'}
          >
            <StyledInputsContainer component="form">
              <StyledTitle>{`${t('menu:duration')} [hh:mm:ss]`}</StyledTitle>
              <StyledGroups>
                <StyledInputs
                  variant="outlined"
                  type="number"
                  name="hours"
                  value={leadingZeros(hours)}
                  onChange={e => setHours(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max: 99 } }}
                />
                <SvgComponent />
                <StyledInputs
                  variant="outlined"
                  type="number"
                  name="minutes"
                  value={leadingZeros(minutes)}
                  onChange={e => setMinutes(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                />
                <SvgComponent />
                <StyledInputs
                  variant="outlined"
                  type="number"
                  name="seconds"
                  value={leadingZeros(seconds)}
                  onChange={e => setSeconds(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                />
              </StyledGroups>
            </StyledInputsContainer>
            <StyledFooter component="form">
              <SetyledButton
                variant="text"
                onClick={() => {
                  setHours(originalValue.slice(0, 2));
                  setMinutes(originalValue.slice(3, 5));
                  setSeconds(originalValue.slice(6, 8));
                }}
              >
                {t('menu:cancel')}
              </SetyledButton>
              <SetyledButton
                variant="text"
                onClick={() => {
                  const formData = `${hours}:${minutes}:${seconds}`;
                  onSubmit(hmsToSeconds(formData));
                }}
              >
                {t('menu:save')}
              </SetyledButton>
            </StyledFooter>
          </StyledBoxStack>
        ) : null}
      </StyledContainer>
    </ClickAwayListener>
  );
};

export default DurationPicker;
