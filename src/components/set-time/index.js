import React from 'react'
import styles from './styles.sass'
import Input from 'components/ui-input'

// Render inputs

export default ({error, handleSubmit}) => (
  <div
    className={styles.container}>
    <div
      className={styles['input-container']}>
      <p
        className={styles.title}>
        Start time
      </p>
      <Input />
      {
        error &&
          <p>
            {error}
          </p>
      }
    </div>
    <div
      className={styles['input-container']}>
      <p className={styles.title}>
        End time
      </p>
      <Input />
      {
        error &&
          <p>
            {error}
          </p>
      }
    </div>
    <button
      className={styles.button}>
      <i className={`${styles.start} material-icons`}>
        play_arrow
      </i>
    </button>
  </div>
)
