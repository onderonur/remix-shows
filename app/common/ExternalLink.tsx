import type { LinkProps } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

type ExternalLinkProps = LinkProps;

export default function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  return (
    <Link {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
}
