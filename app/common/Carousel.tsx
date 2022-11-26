import type { IconButtonProps } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React, { useRef, useState } from 'react';
import InfoAlert from './InfoAlert';

type CarouselProps = React.PropsWithChildren<{ visibleItemCount: number }>;

// TODO: Performance fix'leri yapılabilir.
// TODO: Responsive'lik
export default function Carousel({
  visibleItemCount,
  children,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);
  const itemCount = React.Children.count(children);
  const gap = '12px';

  const buttonProps = (navType: 'previous' | 'next'): IconButtonProps => ({
    'aria-label': navType,
    sx: {
      position: 'absolute',
      top: '50%',
      left: navType === 'previous' ? 0 : 'auto',
      right: navType === 'next' ? 0 : 'auto',
      translate: '0 -50%',
      marginX: 2,
    },
  });

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (!React.Children.count(children)) {
    return <InfoAlert title="There are no images..." />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        // TODO: Buna daha iyi bi alternatif var mı bak
        display: 'grid',
      }}
    >
      <Box
        ref={carouselRef}
        className="carousel"
        sx={{
          display: 'flex',
          width: 'full',
          scrollSnapType: 'x mandatory',
          overflowX: 'auto',
          // IE and Edge
          msOverflowStyle: 'none',
          // Firefox
          scrollbarWidth: 0,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        onScroll={(e) => {
          const carousel = carouselRef.current;
          if (carousel) {
            const rect = carousel.getBoundingClientRect();
            const newCurrent = Math.round(
              carousel.scrollLeft / (rect.width / visibleItemCount),
            );
            setCurrent(newCurrent);
          }
        }}
      >
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return (
            <Box
              sx={{
                scrollSnapAlign: 'start',
                flex: 'none',
                marginRight: i !== itemCount - 1 ? gap : 0,
                width: `calc(100% / ${visibleItemCount} - (${gap} *  (${
                  visibleItemCount - 1
                } / ${visibleItemCount})))`,
              }}
            >
              {React.cloneElement(child)}
            </Box>
          );
        })}
      </Box>
      {!isTouchDevice && (
        <>
          <IconButton
            {...buttonProps('previous')}
            icon={<ChevronLeftIcon />}
            onClick={(e) => {
              const carousel = carouselRef.current;
              if (carousel) {
                const rect = carousel.getBoundingClientRect();
                const newCurrent = current - 1;
                if (newCurrent < 0) {
                  return;
                }
                carousel.scrollTo({
                  left: (rect.width / visibleItemCount) * newCurrent,
                  behavior: 'smooth',
                });
                setCurrent(newCurrent);
              }
            }}
          >
            Previous
          </IconButton>
          <IconButton
            {...buttonProps('next')}
            icon={<ChevronRightIcon />}
            onClick={(e) => {
              const carousel = carouselRef.current;
              if (carousel) {
                const rect = carousel.getBoundingClientRect();
                const newCurrent = current + 1;
                if (newCurrent > itemCount - visibleItemCount) {
                  return;
                }
                carousel.scrollTo({
                  left: (rect.width / visibleItemCount) * newCurrent,
                  behavior: 'smooth',
                });
                setCurrent(newCurrent);
              }
            }}
          >
            Next
          </IconButton>
        </>
      )}
    </Box>
  );
}
