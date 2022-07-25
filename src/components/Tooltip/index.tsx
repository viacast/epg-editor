import { styled } from '@mui/material/styles';
import MUITooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUITooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

export default Tooltip;
