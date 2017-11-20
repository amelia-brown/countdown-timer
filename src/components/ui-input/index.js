import React, {Component} from 'react'
import styles from './styles.sass'

export default class Input extends Component {
  state = {
    value: ''
  }

  handleKeyDown (e) {
    let value
    let character = e.key.replace(/[^0-9]/g, '')
    if (e.key === 'Backspace') {
      if (window.getSelection().toString()) {
        let match = window.getSelection().toString().replace(/:/g, '')
        value = this.state.value.replace(match, '')
      } else {
        value = this.state.value.slice(0, -1)
      }
    } else {
      if (this.state.value.length === 6) return
      value = this.state.value + character
    }

    this.setState({
      value
    })
  }

  render () {
    // add colon after every second digit
    // if (this.state.value.length >= 2) add colon at value[2]
    // if (this.state.value.length >=4) add colon at value[4]
    let value = this.state.value
      .split('')
      .map((char, i) => {
        let newChar
        if (i % 2 !== 0 && 1 !== 0 && i < 5) {
          newChar = char + ':'
          return newChar
        }
        return char
      })
      .join('')
    return (
      <input
        type='text'
        maxLength='8'
        value={value}
        className={styles.input}
        onKeyDown={::this.handleKeyDown}
        placeholder='HH:MM:SS' />
    )
  }
}
