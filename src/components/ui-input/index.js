import React, {Component} from 'react'
import styles from './styles.sass'

// add zeros to have correct formatting

const formatValue = value => {
  let parts = value.split(':')

  return [0, 1, 2].map(part => {
    part = parts[part] || ''
    let x = part.length
    let numZeros = 2 - x
    for (let y = 0; y < numZeros; y++) {
      part = '0' + part
    }
    return part
  }).join('')
}

// add colon after every second digit
// if (this.state.value.length >= 2) add colon at value[2]
// if (this.state.value.length >=4) add colon at value[4]

const addColons = value =>
  value
    .split('')
    .map((char, i) =>
      (i % 2 !== 0 && 1 !== 0 && i < 5)
        ? char + ':'
        : char
    )
    .join('')

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

  handleBlur (e) {
    const formattedValue = formatValue(e.target.value)

    this.setState({
      value: formattedValue
    })

    this.props.setTime(addColons(formattedValue))
  }

  render () {
    const value = addColons(this.state.value)

    return (
      <div
        className={styles.container}>
        <input
          type='text'
          maxLength='8'
          value={value}
          onBlur={::this.handleBlur}
          className={styles.input}
          onKeyDown={::this.handleKeyDown}
          placeholder='HH:MM:SS' />
        {
          this.props.errors.length > 0 &&
            <p
              className={styles.error}>
              {this.props.errors[0]}
            </p>
        }
      </div>
    )
  }
}
