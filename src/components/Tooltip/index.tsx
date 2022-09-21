import { styled } from '@mui/material/styles';
import MUITooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';
import { ColorPallete } from 'styles/global';

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUITooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    backgroundColor: `${ColorPallete.NEUTRAL_3}ff`,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: `${ColorPallete.NEUTRAL_3}ff`,
  },
});

export default Tooltip;
