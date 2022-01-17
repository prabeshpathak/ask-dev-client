import React from 'react'
import cn from 'classnames'

import styles from './Main.module.css'

const Main = ({ border = true, children }) => {
  return (
    <div className={cn(styles.main, border && styles.border)}>{children}</div>
  )
}

export default Main