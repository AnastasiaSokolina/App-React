import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from './TaskFilter'
import './Footer.css'

function Footer({ todoCount, onClearCompleted, onChangeFilter, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter onChangeFilter={onChangeFilter} filter={filter} />
      <button className="clear-completed" type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todoCount: 0,
  onChangeFilter: () => {},
  filter: 'All',
  onClearCompleted: () => {},
}

Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
  onClearCompleted: PropTypes.func,
}
export default Footer
