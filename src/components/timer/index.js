import React from 'react'
import styles from './styles.sass'

export default ({countdown}) => (
  <div className={styles.container}>
    {
      Object.keys(countdown).map(part => (
        <div className={styles.part}>
          <p className={styles.time}>
            {
              countdown[part] < 10
                ? `0${countdown[part]}`
                : countdown[part]
            }
          </p>

          <p className={styles.label}>
            {part}
          </p>
        </div>
      ))
    }
  </div>
)
