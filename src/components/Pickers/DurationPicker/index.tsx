import React, { useEffect, useState, useCallback } from 'react';
import { ClickAwayListener } from '@mui/material';
import { IoIosTimer } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { hmsToDuration, durationToHms, secondsToHms } from 'utils/formatting';
import { useWindowSize } from 'hooks';
import { ColorPallete } from 'styles/global';
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
  duration: number;
  onSubmit: (value: number) => void;
}

const SvgComponent = () => (
  <svg width={12} height={80}>
    <circle cx={6} cy={20} r={4} fill={ColorPallete.NEUTRAL_3} />
    <circle cx={6} cy={50} r={4} fill={ColorPallete.NEUTRAL_3} />
  </svg>
);

const DurationPicker: React.FC<DurationPickerProps> = ({
  duration,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const dimension = useWindowSize();
  const [open, setOpen] = React.useState(false);

  const [, setSkipResetActiveField] = useState(false);
  const [activeField, setActiveField] = useState(
    'none' as 'none' | 'hours' | 'minutes' | 'seconds',
  );
  const [activeHours, setActiveHours] = useState('');
  const [activeMinutes, setActiveMinutes] = useState('');
  const [activeSeconds, setActiveSeconds] = useState('');

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSkipResetActiveField(skip => {
      if (!skip) {
        setActiveField('none');
        setActiveHours('');
        setActiveMinutes('');
        setActiveSeconds('');
      }
      return false;
    });

    const { hours: h, minutes: m, seconds: s } = durationToHms(duration);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [duration, open]);

  const handleSubmit = useCallback(() => {
    onSubmit(hmsToDuration({ hours, minutes, seconds }));
    setOpen(false);
  }, [hours, minutes, seconds, onSubmit]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setOpen(false)}
    >
      <StyledContainer onClick={() => setOpen(p => !p)}>
        <StyledInputStack id="epg-duration-input-ref">
          <StyledInput value={secondsToHms(duration)} />
          <StyledIconContainer>
            <IoIosTimer aria-label="toggle password visibility" />
          </StyledIconContainer>
        </StyledInputStack>
        {open ? (
          <StyledBoxStack
            className="epg-duration-box"
            marginTop={dimension.height > 940 ? '5px' : '-222.5px'}
          >
            <StyledInputsContainer component="form">
              <StyledTitle>{`${t('menu:duration')} [hh:mm:ss]`}</StyledTitle>
              <StyledGroups>
                <StyledInputs
                  variant="outlined"
                  type="number"
                  name="hours"
                  InputProps={{ inputProps: { min: 0, max: 99 } }}
                  onFocus={() => setActiveField('hours')}
                  onBlur={() => setActiveField('none')}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setSkipResetActiveField(true);
                      handleSubmit();
                    }
                  }}
                  value={
                    activeField === 'hours'
                      ? activeHours
                      : `${hours}`.padStart(2, '0')
                  }
                  onChange={e => {
                    let { value } = e.target;
                    if (value.length > 2) {
                      return;
                    }
                    if (Number(value) < 0) {
                      value = '0';
                    }
                    setActiveHours(value);
                    setHours(Number(value));
                  }}
                />
                <SvgComponent />
                <StyledInputs
                  variant="outlined"
                  type="number"
                  name="minutes"
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                  onFocus={() => setActiveField('minutes')}
                  onBlur={() => setActiveField('none')}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setSkipResetActiveField(true);
                      handleSubmit();
                    }
                  }}
                  value={
                    activeField === 'minutes'
                      ? activeMinutes
                      : `${minutes}`.padStart(2, '0')
                  }
                  onChange={e => {
                    let { value } = e.target;
                    if (value.length > 2) {
                      return;
                    }
                    if (Number(value) < 0) {
                      value = '0';
                    }
                    if (Number(value) > 59) {
                      value = '59';
                    }
                    setActiveMinutes(value);
                    setMinutes(Number(value));
                  }}
                />
                <SvgComponent />
                <StyledInputs
                  variant="outlined"
                  type="number"
                  name="seconds"
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                  onFocus={() => setActiveField('seconds')}
                  onBlur={() => setActiveField('none')}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setSkipResetActiveField(true);
                      handleSubmit();
                    }
                  }}
                  value={
                    activeField === 'seconds'
                      ? activeSeconds
                      : `${seconds}`.padStart(2, '0')
                  }
                  onChange={e => {
                    let { value } = e.target;
                    if (value.length > 2) {
                      return;
                    }
                    if (Number(value) < 0) {
                      value = '0';
                    }
                    if (Number(value) > 59) {
                      value = '59';
                    }
                    setActiveSeconds(value);
                    setSeconds(Number(value));
                  }}
                />
              </StyledGroups>
            </StyledInputsContainer>
            <StyledFooter component="form">
              <SetyledButton variant="text" onClick={() => handleSubmit()}>
                OK
              </SetyledButton>
              <SetyledButton variant="text" onClick={() => setOpen(false)}>
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
