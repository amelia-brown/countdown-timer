import React from 'react'
import styles from './styles.sass'

export default ({children}) => (
  <div className={styles.container}>
    {children}
  </div>
)
