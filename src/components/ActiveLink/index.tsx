import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassLink: string;
}
export function ActiveLink({
  children,
  activeClassLink,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const className = asPath === rest.href ? activeClassLink : "";

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
