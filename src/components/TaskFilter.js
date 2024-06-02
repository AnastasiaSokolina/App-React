import React from 'react'

import './TaskFilter.css'

function TaskFilter({ onChangeFilter, filter }) {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => onChangeFilter('All')} className={filter === 'All' ? 'selected' : null} type="button">
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => onChangeFilter('Active')}
          className={filter === 'Active' ? 'selected' : null}
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => onChangeFilter('Completed')}
          className={filter === 'Completed' ? 'selected' : null}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  onChangeFilter: () => {},
  filter: 'All',
}

export default TaskFilter
