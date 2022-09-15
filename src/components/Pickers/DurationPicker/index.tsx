import * as React from 'react';
import { ClickAwayListener } from '@mui/material';
import { IoIosTimer } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import {
  leadingZeros,
  secondsToHms,
  hmsToSeconds,
  isNum,
} from 'utils/formatting';
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

  const [hours, setHours] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [seconds, setSeconds] = React.useState('');

  const [tmpStorageHours, setTmpStorageHours] = React.useState('');
  const [tmpStorageMinutes, setTmpStorageMinutes] = React.useState('');
  const [tmpStorageSeconds, setTmpStorageSeconds] = React.useState('');

  React.useEffect(() => {
    if (value) {
      setHours(secondsToHms(value).slice(0, 2));
      setMinutes(secondsToHms(value).slice(3, 5));
      setSeconds(secondsToHms(value).slice(6, 8));
      setTmpStorageHours(secondsToHms(value).slice(0, 2));
      setTmpStorageMinutes(secondsToHms(value).slice(3, 5));
      setTmpStorageSeconds(secondsToHms(value).slice(6, 8));
    }
    if (open) {
      setTmpStorageHours(secondsToHms(value).slice(0, 2));
      setTmpStorageMinutes(secondsToHms(value).slice(3, 5));
      setTmpStorageSeconds(secondsToHms(value).slice(6, 8));
    }
  }, [value, open]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setOpen(false)}
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
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setHours(tmpStorageHours);
                    }
                  }}
                  variant="outlined"
                  type="number"
                  name="hours"
                  value={isNum(tmpStorageHours)}
                  onChange={e => setTmpStorageHours(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max: 99 } }}
                />
                <SvgComponent />
                <StyledInputs
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setMinutes(tmpStorageMinutes);
                    }
                  }}
                  variant="outlined"
                  type="number"
                  name="minutes"
                  value={
                    Number(isNum(tmpStorageMinutes)) > 59
                      ? isNum(tmpStorageMinutes).slice(0, 1)
                      : isNum(tmpStorageMinutes)
                  }
                  onChange={e => setTmpStorageMinutes(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                />
                <SvgComponent />
                <StyledInputs
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setSeconds(tmpStorageSeconds);
                    }
                  }}
                  variant="outlined"
                  type="number"
                  name="seconds"
                  value={
                    Number(isNum(tmpStorageSeconds)) > 59
                      ? isNum(tmpStorageSeconds).slice(0, 1)
                      : isNum(tmpStorageSeconds)
                  }
                  onChange={e => setTmpStorageSeconds(e.target.value)}
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
                  const formData = `${hours}:${minutes}:${seconds}`;
                  onSubmit(hmsToSeconds(formData));

                  setHours(tmpStorageHours);
                  setMinutes(tmpStorageMinutes);
                  setSeconds(tmpStorageSeconds);
                }}
              >
                OK
              </SetyledButton>
              <SetyledButton
                variant="text"
                onClick={() => {
                  handleClick();
                }}
              >
                {t('menu:cancel')}
              </SetyledButton>
            </StyledFooter>
          </StyledBoxStack>
        ) : null}
      </StyledContainer>
    </ClickAwayListener>
  );
};

export default DurationPicker;
