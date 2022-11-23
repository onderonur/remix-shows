import { Grid } from '@chakra-ui/react';
import InfoAlert from '~/common/InfoAlert';
import React from 'react';

type ImageListProps = React.PropsWithChildren;

export default function ImageList({ children }: ImageListProps) {
  if (!React.Children.count(children)) {
    return <InfoAlert title="There are no images..." />;
  }

  return (
    <Grid gridTemplateColumns={'repeat(auto-fill, minmax(6rem, 1fr))'} gap={1}>
      {children}
    </Grid>
  );
}
