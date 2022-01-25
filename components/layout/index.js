import React from 'react';
import cn from 'classnames';

import CONSTANT from '../../util/constants'
import useWindowSize from '../../hooks/useWindowSize';

import Sidebar from './Sidebar'
import Main from './Main'
import Extra from './Extra'
import Header from './Header'

import styles from './layout.module.css'

const Layout = ({ extra = true, children }) => {
  const size = useWindowSize()
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <div className={cn(styles.body, !extra && styles.main)}>
          {size.width > CONSTANT.MOBILE_SIZE && <Sidebar />}
          <Main>{children}</Main>
          {size.width > CONSTANT.TABLET_SIZE && extra && <Extra />}
        </div>
      </div>
    </div>
  )
}

export default Layout