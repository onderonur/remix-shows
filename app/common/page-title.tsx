import type { GoBackButtonProps } from '~/common/go-back-button';
import GoBackButton from '~/common/go-back-button';
import type { TitleProps } from './title';
import Title from './title';

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
      titleAs="h1"
      title={title}
      subtitle={subtitle}
      before={goBackButtonProps && <GoBackButton {...goBackButtonProps} />}
      after={after}
    />
  );
}
