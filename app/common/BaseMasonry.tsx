import { Box } from "@chakra-ui/react";
import Masonry from "react-masonry-css";

type BaseMasonryProps = {
  children: ({ itemGap }: { itemGap: string }) => React.ReactNode;
};

const itemGap = "0.3rem";

const breakpointCols = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function BaseMasonry({ children }: BaseMasonryProps) {
  return (
    <Box
      sx={{
        ".masonry-grid": {
          display: "flex",
          marginLeft: `-${itemGap}`,
          marginRight: `-${itemGap}`,
          ".masonry-grid_column": {
            backgroundClip: "padding-box",
          },
        },
      }}
    >
      <Masonry
        breakpointCols={breakpointCols}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {children({ itemGap })}
      </Masonry>
    </Box>
  );
}
