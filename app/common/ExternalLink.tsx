import { Link } from "@chakra-ui/react";

type ExternalLinkProps = React.PropsWithChildren<{
  "aria-label"?: string;
  href: string;
}>;

export default function ExternalLink({
  href,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </Link>
  );
}
