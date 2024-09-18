import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useGoBack } from '~/core/routing/routing.hooks';

export type GoBackButtonProps = Parameters<typeof useGoBack>[0];

export default function GoBackButton(props: GoBackButtonProps) {
  const goBack = useGoBack(props);

  return (
    <IconButton
      variant="outline"
      aria-label="Go back"
      icon={<ChevronLeftIcon />}
      onClick={goBack}
    />
  );
}
