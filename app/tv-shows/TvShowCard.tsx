import { Box, Flex, Text } from "@chakra-ui/react";
import { getYear, isOfType } from "~/common/CommonUtils";
import FancyCard from "~/common/FancyCard";
import VoteRating from "~/common/VoteRating";
import { getImageUrl } from "~/medias/MediaUtils";
import GenreTags from "../genres/GenreTags";
import type { TvShow, TvShowListItem } from "./TvShowsTypes";

type TvShowCardProps = {
  tvShow: TvShowListItem | TvShow;
  overviewNoOfLines?: number;
  genresAsLink: boolean;
  hasBackgroundImage?: boolean;
};

export default function TvShowCard({
  tvShow,
  overviewNoOfLines,
  genresAsLink,
  hasBackgroundImage,
}: TvShowCardProps) {
  return (
    <FancyCard
      imageSrc={getImageUrl(tvShow.poster_path)}
      imageAlt={tvShow.name}
      imageRatio={2 / 3}
      backgroundImageSrc={
        hasBackgroundImage
          ? getImageUrl(tvShow.backdrop_path, {
              size: "original",
            })
          : undefined
      }
    >
      <Flex flexDirection="column" gap={2}>
        <Flex gap={2}>
          <VoteRating rating={tvShow.vote_average} size="lg" />
          <Box>&middot;</Box>
          <Box color="gray.600" fontWeight="semibold" fontSize="lg">
            {getYear(tvShow.first_air_date)}
          </Box>
        </Flex>
        <div>
          {tvShow.tagline && (
            <Text color="gray.600" fontSize="lg">
              {tvShow.tagline}
            </Text>
          )}
          <Text noOfLines={overviewNoOfLines}>{tvShow.overview}</Text>
        </div>
        <GenreTags
          genres={
            isOfType<TvShowListItem>(tvShow, ["genre_ids"])
              ? tvShow.genre_ids
              : tvShow.genres
          }
          asLink={genresAsLink}
        />
      </Flex>
    </FancyCard>
  );
}
