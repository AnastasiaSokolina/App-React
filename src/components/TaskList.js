import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from './Task'
import './TaskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    onDeleteTask: () => {},
    onTaskCompleted: () => {},
    clickOnInput: () => {},
    onEditTask: () => {},
    createdAt: new Date(),
  }

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onTaskCompleted: PropTypes.func.isRequired,
    clickOnInput: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }

  render() {
    const { tasks, onDeleteTask } = this.props

    const taskComponents = tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onDelete={() => onDeleteTask(task.id)}
        onTaskCompleted={this.props.onTaskCompleted}
        clickOnInput={this.props.clickOnInput}
        onEditTask={this.props.onEditTask}
        createdAt={this.props.createdAt}
      />
    ))

    return <ul className="todo-list">{taskComponents}</ul>
  }
}
