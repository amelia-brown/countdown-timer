import React from 'react'
import styles from './styles.sass'
import Timer from 'components/timer'

export default ({handleReset}) => (
  <div className={styles.container}>
    <Timer />
  </div>
)
