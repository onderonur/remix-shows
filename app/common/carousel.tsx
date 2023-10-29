import type { IconButtonProps } from '@chakra-ui/react';
// TODO: Add import/no-duplicates eslint rule.
import { useBreakpointValue } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Children, useRef, useState } from 'react';
import InfoAlert from './info-alert';
import { useIsTouchDevice } from './common-hooks';
import type { Maybe } from './common-types';

type CarouselProps = React.PropsWithChildren<{
  visibleItemCount: {
    base: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}>;

const gap = 12;

export default function Carousel({
  visibleItemCount,
  children,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalItemCount = Children.count(children);
  const currentVisibleItemCount =
    useBreakpointValue(visibleItemCount) ?? visibleItemCount.base;

  const getItemWidth = () => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return 0;
    }
    const totalGapWidth = gap * (totalItemCount - 1);
    const itemWidth = (carousel.scrollWidth - totalGapWidth) / totalItemCount;
    return itemWidth;
  };

  const isBeginning = (itemIndex: number) => itemIndex <= 0;

  const isEnd = (itemIndex: number) =>
    itemIndex >= totalItemCount - currentVisibleItemCount;

  const getButtonProps = ({
    navType,
    disabled,
  }: {
    navType: 'previous' | 'next';
    disabled: boolean;
  }): IconButtonProps => ({
    'aria-label': navType,
    disabled,
    sx: {
      position: 'absolute',
      top: '50%',
      left: navType === 'previous' ? { base: -1, md: -4 } : 'auto',
      right: navType === 'next' ? { base: -1, md: -4 } : 'auto',
      translate: '0 -50%',
      fontSize: '2xl',
      backgroundColor: 'whiteAlpha.600',
      '&:hover': disabled
        ? undefined
        : {
            backgroundColor: 'whiteAlpha.500',
          },
    },
    onClick: () => {
      if (
        (navType === 'previous' && isBeginning(currentIndex)) ||
        (navType === 'next' && isEnd(currentIndex))
      ) {
        return;
      }

      const carousel = carouselRef.current;
      if (!carousel) {
        return;
      }

      const newIndex = navType === 'next' ? currentIndex + 1 : currentIndex - 1;
      const itemWidth = getItemWidth();
      carousel.scrollTo({
        left: itemWidth * newIndex + gap * newIndex,
        behavior: 'smooth',
      });
      setCurrentIndex(newIndex);
    },
  });

  const isTouchDevice = useIsTouchDevice();

  const getGridAutoColumns = (colCount: Maybe<number>) =>
    colCount
      ? `calc(100% / ${colCount} - (${gap}px *  (${
          colCount - 1
        } / ${colCount})))`
      : undefined;

  const scrollTimerRef = useRef<NodeJS.Timeout>();

  if (!Children.count(children)) {
    return <InfoAlert title="Nothing found here..." />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        // TODO: May not need this. Will check it.
        display: 'grid',
      }}
    >
      <Box
        ref={carouselRef}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: {
            base: getGridAutoColumns(visibleItemCount.base),
            sm: getGridAutoColumns(visibleItemCount.sm),
            md: getGridAutoColumns(visibleItemCount.md),
            lg: getGridAutoColumns(visibleItemCount.lg),
            xl: getGridAutoColumns(visibleItemCount.xl),
            '2xl': getGridAutoColumns(visibleItemCount['2xl']),
          },
          gap: `${gap}px`,
          width: 'full',
          overflowX: 'auto',
          // Firefox
          scrollbarWidth: 'none',
          // Chrome, Edge etc.
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        onScroll={() => {
          const scrollTimer = scrollTimerRef.current;
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }

          scrollTimerRef.current = setTimeout(() => {
            const carousel = carouselRef.current;
            if (!carousel) {
              return;
            }
            const itemWidth = getItemWidth();
            const newIndex = Math.round(
              carousel.scrollLeft / (itemWidth + gap),
            );
            setCurrentIndex(newIndex);
          }, 150);
        }}
      >
        {children}
      </Box>
      {!isTouchDevice && totalItemCount > currentVisibleItemCount && (
        <>
          <IconButton
            {...getButtonProps({
              navType: 'previous',
              disabled: isBeginning(currentIndex),
            })}
            icon={<ChevronLeftIcon />}
          >
            Previous
          </IconButton>
          <IconButton
            {...getButtonProps({
              navType: 'next',
              disabled: isEnd(currentIndex),
            })}
            icon={<ChevronRightIcon />}
          >
            Next
          </IconButton>
        </>
      )}
    </Box>
  );
}
