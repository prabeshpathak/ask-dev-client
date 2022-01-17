import React from 'react'

import Navigation from '../navigation'

import styles from './nav-dropdown.module.css'

const NavigationDropdown = () => {
  return (
    <div className={styles.dialog}>
      <div className={styles.sidebar}>
        <Navigation />
      </div>
    </div>
  )
}

export default NavigationDropdown