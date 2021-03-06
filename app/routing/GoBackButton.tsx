import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useGoBack } from "./RoutingHooks";

export type GoBackButtonProps = Parameters<typeof useGoBack>[0];

export default function GoBackButton(props: GoBackButtonProps) {
  const goBack = useGoBack(props);

  return (
    <IconButton
      aria-label="Go back"
      icon={<ChevronLeftIcon />}
      onClick={goBack}
    />
  );
}
