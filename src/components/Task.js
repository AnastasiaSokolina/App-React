import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends Component {
  constructor() {
    super()
    this.state = {
      completed: false,
      editing: false,
      editingTaskText: '',
    }
  }

  static defaultProps = {
    task: {},
    className: '',
    onDelete: () => {},
  }

  static propTypes = {
    task: PropTypes.object.isRequired,
    className: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
  }

  handleEdit = () => {
    this.setState({ editing: true, editingTaskText: this.props.task.text })
  }

  handleInputChange = (e) => {
    this.setState({ editingTaskText: e.target.value })
  }

  handleSave = () => {
    const { task } = this.props
    const { editingTaskText } = this.state
    if (editingTaskText.trim() !== '') {
      this.props.onEditTask(task.id, editingTaskText)
      this.setState({ editing: false })
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSave()
    }
  }

  render() {
    const { task, className, onDelete } = this.props
    const { editing, editingTaskText } = this.state
    const liClassName = `${className ? `${className} ` : ''}${task.completed ? 'completed' : ''}${editing ? ' editing' : ''}`

    return (
      <li className={liClassName}>
        <div className="view">
          {!editing ? (
            <>
              <input
                className="toggle"
                type="checkbox"
                onClick={() => this.props.clickOnInput(task.id)}
                defaultChecked={task.completed}
              />
              <label>
                <span className="description">{task.text}</span>

                <span className="created">created {formatDistanceToNow(new Date(this.props.createdAt))} ago</span>
              </label>
              <button className="icon icon-edit" onClick={this.handleEdit} />
              <button className="icon icon-destroy" onClick={onDelete} />
            </>
          ) : (
            <input
              className="edit"
              type="text"
              value={editingTaskText}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              autoFocus
            />
          )}
        </div>
      </li>
    )
  }
}
