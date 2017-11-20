import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import * as countdown from 'modules/countdown'
import isEqual from 'lodash.isequal'
import CountdownComponent from 'components/countdown'

class CountdownContainer extends Component {
  state = {
    minutes: 0,
    hours: 0,
    seconds: 0
  }

  constructor (props) {
    super(props)

    this.stepDown = ::this.stepDown
  }

  componentWillMount () {
    this.setState({
      ...this.props.countdown
    })
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.countdown, nextProps.countdown)) {
      this.setState({
        ...nextProps.countdown,
        displayMessage: false
      })
    }
    window.clearInterval(this.startCountdown)
    this.startCountdown = window.setInterval(this.stepDown, 1000)
  }

  finishCountdown () {
    window.clearInterval(this.startCountdown)
    this.setState({
      displayMessage: true
    })
  }

  stepDown () {
    // e.g. 12 23 12
    let seconds = this.state.seconds
    let minutes = this.state.minutes
    let hours = this.state.hours
    if (
      minutes === 0 &&
      seconds === 0 &&
      hours === 0
    ) return ::this.finishCountdown()

    if (seconds === 0) {
      seconds = 59
      minutes = minutes - 1
      if (minutes <= 0) {
        minutes = 59
        hours = hours - 1
      } else {
        minutes = minutes - 1
      }
      if (hours <= 0) {
        hours = 0
      } else {
        hours = hours - 1
      }
    } else {
      seconds = seconds - 1
    }
    return this.setState({
      hours,
      minutes,
      seconds
    })
  }

  render () {
    let countdown = {
      hours: this.state.hours,
      minutes: this.state.minutes,
      seconds: this.state.seconds
    }

    return (
      <CountdownComponent
        displayMessage={this.state.displayMessage}
        countdown={countdown} />
    )
  }
}

const mapStateToProps = createSelector(
  countdown.getCountdown,
  countdown => ({
    countdown
  })
)

export default connect(
  mapStateToProps
)(CountdownContainer)
