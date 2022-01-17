import React from "react";
import Link from "next/link";
import cn from "classnames";

import styles from "./tags.module.scss";

const Tag = ({ children, className, count, ...props }) => {
  return count ? (
    <div>
      <Link href={{ pathnane: "/", query: { tag: children } }}>
        <a className={cn(styles.tag, className)} {...props}>
          {children}
        </a>
      </Link>
      <span className={styles.multiplier}>x</span> &nbsp;
      <span className={styles.count}>{count}</span>
    </div>
  ) : (
    <Link href={{ pathname: "/", query: { tag: children } }}>
      <a className={cn(styles.tag, className)} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default Tag;
