import React from 'react'
import styles from './styles.sass'

let time = {
  hours: 12,
  minutes: 32,
  seconds: 48
}

export default () => (
  <div className={styles.container}>
    {
      Object.keys(time).map(part => (
        <div
          className={styles.part}>
          <p
            className={styles.time}>
            {time[part]}
          </p>
          <p
            className={styles.label}>
            {part}
          </p>
        </div>
      ))
    }
  </div>
)
