import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

function Task({
  label,
  onDelete,
  onToggleDone,
  done,
  id,
  created,
  time,
  onStopTimer,
  onStartTimer,
  updateTask,
  timerStep,
}) {
  const [changedTaskLabel, setChangedTaskLabel] = useState('')
  const [edited, setEdited] = useState(false)
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    const intervalTime = setInterval(() => timerStep(id), 1000)
    setTimerId(intervalTime)

    return () => {
      clearInterval(intervalTime)
    }
  }, [id, timerStep])

  const onClickEdit = (prevLabel) => {
    setChangedTaskLabel(prevLabel)
    setEdited(true)
  }

  const onChangeTask = (event) => {
    setChangedTaskLabel(event.target.value)
  }

  const onSubmitUpdatedTask = (event) => {
    event.preventDefault()
    if (changedTaskLabel.trim()) {
      updateTask(id, changedTaskLabel)
      setChangedTaskLabel('')
      setEdited(false)
    }
  }

  const minutes = time ? Math.floor(time / 1000 / 60) : 0
  const seconds = time ? (time / 1000) % 60 : 0

  let liClassName = ''
  if (done) {
    liClassName = 'completed'
  } else if (edited) {
    liClassName = 'editing'
  }

  return (
    <li className={liClassName}>
      {edited ? (
        <form onSubmit={onSubmitUpdatedTask}>
          <input type="text" className="edit" value={changedTaskLabel} onChange={onChangeTask} />
        </form>
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} id={id} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description control-timer">
              <button
                className="icon icon-play"
                aria-label="start timer"
                onClick={() => onStartTimer(id)}
                type="button"
              />
              <button
                className="icon icon-pause"
                aria-label="stop timer"
                onClick={() => onStopTimer(id)}
                type="button"
              />
              <span>
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </span>
            <span className="description">created {formatDistanceToNow(created, { includeSeconds: true })} ago </span>
          </label>
          {!done && (
            <button aria-label="Edit" type="button" className="icon icon-edit" onClick={() => onClickEdit(label)} />
          )}
          <button
            aria-label="Delete"
            type="button"
            className="icon icon-destroy"
            onClick={() => onDelete(id, timerId)}
          />
        </div>
      )}
    </li>
  )
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.number.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  timerStep: PropTypes.func.isRequired,
}

export default Task
