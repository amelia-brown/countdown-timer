import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import * as countdown from 'modules/countdown'
import isEqual from 'lodash.isequal'

class CountdownContainer extends Component {
  state = {
    time: {}
  }

  componentWillMount () {
    this.setState({
      countdown: this.props.countdown
    })
    this.startCountdown()
  }

  startCountdown = window.setInterval(this.stepDown, 1000)

  finishCountdown () {
    window.clearInterval(startCountdown)
    console.log('Countdown over')
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
    } else {
      seconds = seconds - 1
    }
    if (minutes <= 0) {
      minutes = 59
      hours = hours - 1
    } else {
      minutes = minutes - 1
    }
    if (hours <=0) {
      hours = 0
    } else {
      hours = hours - 1
    }
    return this.setState({
      hours,
      minutes,
      seconds
    })
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.countdown, nextProps.countdown)) {
      this.setState({
        countdown: nextProps.countdown
      })
    }
  }

  render () {
    return (
      <CountdownComponent
        time={this.props.countdown} />
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
