import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import styles from './nav-items.module.scss'

const NavItem = ({ href, children, selected, ...props }) => {
  return (
    <Link href={href} as={href}>
      <a
        className={cn(styles.navItem, selected && styles.navItemSelected)}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export default NavItem