import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as countdown from 'modules/countdown'
import Input from 'components/ui-input'
import styles from './styles.sass'

const ERRORS = {
  START_EXISTS: 'Please enter a start time',
  END_EXISTS: 'Please enter an end time',
  START_END: 'End time must be before start time',
  HOURS: 'There are only 24 hours in a day!',
  MINUTES: 'There are only 60 minutes in an hour!',
  SECONDS: 'There are only 60 seconds in a minute!'
}

const MAX_HOUR = 23
const MAX_MIN = 59
const MAX_SECOND = 59

class SetTimeContainer extends Component {
  state = {
    startTime: null,
    endTime: null,
    errors: {
      startTime: [],
      endTime: []
    }
  }

  setTime (type) {
    return (value) => {
      this.setState({
        [type]: value
      })
    }
  }

  handleValidate (e) {
    const errors = {
      startTime: [],
      endTime: []
    }

    e.preventDefault()

    // validate existance of times

    if (!this.state.startTime) {
      return this.setState({
        errors: {
          ...this.state.errors,
          startTime: [ERRORS.START_EXISTS]
        }
      })
    }

    if (!this.state.endTime) {
      return this.setState({
        errors: {
          ...this.state.errors,
          endTime: [ERRORS.END_EXISTS]
        }
      })
    }

    const start = this.state.startTime.split(':')
    const end = this.state.endTime.split(':')
    // validate greater than relation for times

    if (parseInt(start.join('')) > parseInt(end.join(''))) {
      errors.endTime.push(ERRORS.START_END)
    }

    // destructure time

    const [
      startHour,
      startMin,
      startSecond
    ] = start.map(n => parseInt(n))

    const [
      endHour,
      endMin,
      endSecond
    ] = end.map(n => parseInt(n))

    // validate start time

    if (startHour > MAX_HOUR) errors.startTime.push(ERRORS.HOURS)
    if (startMin > MAX_MIN) errors.startTime.push(ERRORS.MINUTES)
    if (startSecond > MAX_SECOND) errors.startTime.push(ERRORS.SECONDS)

    // validate end time

    if (endHour > MAX_HOUR) errors.endTime.push(ERRORS.HOURS)
    if (endMin > MAX_MIN) errors.endTime.push(ERRORS.MINUTES)
    if (endSecond > MAX_SECOND) errors.endTime.push(ERRORS.SECONDS)

    if (errors.startTime.length === 0 && errors.endTime.length === 0) {
      return this.setState({
        errors: {
          startTime: [],
          endTime: []
        }
      }, () => {
        return this.handleSetTimer()
      })
    }

    return this.setState({
      errors
    })
  }

  handleSetTimer () {
    let start = this.state.startTime.split(':')
      .map(n => parseInt(n))
    let end = this.state.endTime.split(':')
      .map(n => parseInt(n))
    let hours = end[0] - start[0]
    let seconds = end[2] - start[2]
    let minutes = end[1] - start[1]
    if (minutes < 0) {
      minutes = 60 + minutes
      hours = hours - 1
    }
    if (seconds < 0) {
      seconds = 60 + seconds
      minutes = minutes - 1
    }
    this.props.dispatch(countdown.setCountdown({
      hours,
      minutes,
      seconds
    }))
  }

  render () {
    return (
      <form
        onSubmit={::this.handleValidate}
        className={styles.container}>
        <div className={styles['input-container']}>
          <p className={styles.title}>
            Start time
          </p>

          <Input
            errors={this.state.errors.startTime}
            setTime={::this.setTime('startTime')}
            time={this.state.startTime} />
        </div>

        <div className={styles['input-container']}>
          <p className={styles.title}>
            End time
          </p>

          <Input
            errors={this.state.errors.endTime}
            setTime={::this.setTime('endTime')}
            time={this.state.endTime} />
        </div>

        <button
          type='submit'
          className={styles.button}>
          <i className={`${styles.start} material-icons`}>
            play_arrow
          </i>
        </button>
      </form>
    )
  }
}

export default connect()(SetTimeContainer)
