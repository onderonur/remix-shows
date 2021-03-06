import { Box, Flex } from "@chakra-ui/react";
import SearchBar from "~/search/SearchBar";

export const APP_HEADER_HEIGHT = "70px";

type AppHeaderProps = {
  title: React.ReactNode;
};

export default function AppHeader({ title }: AppHeaderProps) {
  return (
    <>
      <Flex
        as="header"
        height={APP_HEADER_HEIGHT}
        boxShadow="md"
        alignItems={"center"}
        padding={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1}
        backgroundColor="white"
        flexShrink={0}
        gap={2}
      >
        <Box flexGrow={1} flexShrink={0}>
          {title}
        </Box>
        <Box width="full" maxWidth="2xs">
          <SearchBar />
        </Box>
      </Flex>
    </>
  );
}
