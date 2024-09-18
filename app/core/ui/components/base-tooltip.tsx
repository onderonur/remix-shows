import type { TooltipProps } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';

type BaseTooltipProps = TooltipProps;

export function BaseTooltip(props: BaseTooltipProps) {
  return <Tooltip {...props} openDelay={500} />;
}
