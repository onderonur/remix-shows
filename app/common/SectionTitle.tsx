import type { BoxProps } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import type { GoBackButtonProps } from "~/routing/GoBackButton";
import GoBackButton from "~/routing/GoBackButton";

type SectionTitleProps = {
  goBackButtonProps?: GoBackButtonProps;
  title: string;
  titleAs?: BoxProps["as"];
  subtitle?: string;
  extra?: React.ReactNode;
};

export default function SectionTitle({
  goBackButtonProps,
  title,
  titleAs,
  subtitle,
  extra,
}: SectionTitleProps) {
  return (
    <Flex
      alignItems={"center"}
      gap={3}
      mb={2}
      color="gray.700"
      flex={1}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Flex gap={3}>
        {goBackButtonProps && <GoBackButton {...goBackButtonProps} />}
        <Flex flexDirection="column" justifyContent="center">
          <Box
            as={titleAs}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
          >
            {title}
          </Box>
          {subtitle && (
            <Box fontSize={{ base: "sm", lg: "md" }} color="gray.600">
              {subtitle}
            </Box>
          )}
        </Flex>
      </Flex>
      {extra && <Box>{extra}</Box>}
    </Flex>
  );
}
