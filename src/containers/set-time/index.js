import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class SetTime extends Component {
  render () {
    return (
      <SetTime
        errors={this.props.errors}
        handleSubmit={this.props.handleSubmit} />
    )
  }
}

export default connect()(SetTime)
