import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

function NewTaskForm(props) {
  const [label, setLabel] = useState('')
  const [timeMin, setTimeMin] = useState('')
  const [timeSec, setTimeSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onTimeMinChange = (e) => {
    const min = parseInt(e.target.value)
    if (!isNaN(min) && min >= 0) {
      setTimeMin(min)
    }
  }

  const onTimeSecChange = (e) => {
    const sec = parseInt(e.target.value)
    if (!isNaN(sec) && sec >= 0) {
      setTimeSec(sec)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { addItem } = props
    const totalTime = Number(timeMin) * 60 * 1000 + Number(timeSec) * 1000
    if (label.trim().length !== 0) {
      addItem(label, totalTime)
      setLabel('')
      setTimeMin('')
      setTimeSec('')
    }
  }
  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        id="taskInput"
        name="taskInput"
        placeholder="what needs to be done?"
        value={label}
        onChange={onLabelChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="min"
        value={timeMin}
        type="number"
        onChange={onTimeMinChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="sec"
        value={timeSec}
        type="number"
        onChange={onTimeSecChange}
      />
      <button type="submit" style={{ display: 'none' }} aria-hidden />
    </form>
  )
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default NewTaskForm
