import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'
import './TaskList.css'

function TaskList({ filteredTasks, onDelete, updateTask, onToggleDone, onStartTimer, onStopTimer, timerStep }) {
  if (!filteredTasks.length) return null

  const elements = filteredTasks.map((item) => (
    <Task
      id={item.id}
      label={item.label}
      done={item.done || false}
      created={item.created}
      time={item.time}
      key={item.id}
      onDelete={() => onDelete(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      updateTask={updateTask}
      onStartTimer={onStartTimer}
      onStopTimer={onStopTimer}
      timerStep={() => timerStep(item.id)}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDelete: () => {},
  onToggleDone: () => {},
}

TaskList.propTypes = {
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
  updateTask: PropTypes.func.isRequired,
}

export default TaskList
