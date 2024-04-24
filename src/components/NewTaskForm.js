import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddTask: () => {},
  }

  static propTypes = {
    onAddTask: PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      text: '',
    }
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        text: this.state.text,
      }
      this.props.onAddTask(newTask)
      this.setState({ text: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="what needs to be done?"
          autoFocus
          value={this.state.text}
          onChange={this.handleTextChange}
          onKeyPress={this.handleKeyPress}
        />
      </form>
    )
  }
}
