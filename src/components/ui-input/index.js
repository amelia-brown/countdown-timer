import React, {Component} from 'react'
import styles from './styles.sass'

// TODO still some bugs around backspace button/editing values
// should do something more like splitting every 2 characters
// and adding a colon

export default class Input extends Component {
  handleChange (e) {
    let val = e.target.value

    // remove non-number or colon values
    e.target.value = val.replace(/[^0-9:]/g, '')

    // add a colon after every second number
    let userEntry = val
      .slice()
      .split('')
      .filter(char => char !== ':')

    if (
      userEntry.length > 0 &&
      userEntry.length % 2 === 0 &&
      userEntry.length < 6
    ) {
      e.target.value = val += ':'
    }
  }

  render () {
    return (
      <input
        type='text'
        maxLength={8}
        className={styles.input}
        onChange={::this.handleChange}
        placeholder='00:00:00' />
    )
  }
}
