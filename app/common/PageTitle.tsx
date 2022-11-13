import type { GoBackButtonProps } from '~/routing/GoBackButton';
import GoBackButton from '~/routing/GoBackButton';
import type { TitleProps } from './Title';
import Title from './Title';

type PageTitleProps = Pick<TitleProps, 'title' | 'subtitle' | 'after'> & {
  goBackButtonProps?: GoBackButtonProps;
};

export default function PageTitle({
  goBackButtonProps,
  title,
  subtitle,
  after,
}: PageTitleProps) {
  return (
    <Title
      title={title}
      titleAs="h1"
      subtitle={subtitle}
      before={goBackButtonProps && <GoBackButton {...goBackButtonProps} />}
      after={after}
    />
  );
}
