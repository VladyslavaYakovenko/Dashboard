import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import styles from "./styles.module.scss";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: string;
  to: string;
}

const IconLink = React.forwardRef(
  ({ icon, to, className, ...props }: Props, ref: any) => {
    const router = useRouter();

    const active = router.pathname === to;

    return (
      <div
        className={classNames(
          styles.link,
          { [styles.active]: active },
          {
            [styles["no-icon"]]: !icon,
          }
        )}
      >
        {icon && <i className={`icon-${icon}`} />}
        <Link href={to}>
          <a {...props} ref={ref} />
        </Link>
      </div>
    );
  }
);

IconLink.displayName = "IconLink";

export default IconLink;
