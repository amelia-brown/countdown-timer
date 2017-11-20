import React from 'react'
import styles from './styles.sass'
import Timer from 'components/timer'

export default ({countdown, displayMessage}) => (
  <div className={styles.container}>
    <Timer countdown={countdown} />

    <p className={`${styles.message} ${displayMessage ? styles.fadein : ''}`}>
      Countdown finished!
    </p>
  </div>
)
