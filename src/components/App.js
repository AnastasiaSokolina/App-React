import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import NewTaskForm from './NewTaskForm'
import TaskList from './TaskList'
import Footer from './Footer'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        // { id: 1, text: 'cheer up', completed: false, editing: false, activeTimer: false, timerId: null },
        // { id: 2, text: 'pussyfoot react', completed: false, editing: false, activeTimer: false, timerId: null },
        // { id: 3, text: 'do fucking app', completed: false, editing: false, activeTimer: false, timerId: null },
      ],
      filter: 'all',
      minutes: '',
      seconds: '',
      currentTime: 0,
      timerIds: {},
    }
  }

  handleTaskCompleted = (id, completed) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
    }))
  }

  handleAddTask = (newTask, minutes, seconds) => {
    let currentTime = 0

    if (minutes !== '') {
      currentTime += parseInt(minutes) * 60
    }

    if (seconds !== '') {
      currentTime += parseInt(seconds)
    }

    const createdTask = {
      ...newTask,
      createdAt: new Date(),
      currentTime: currentTime,
    }

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, createdTask],
    }))
  }

  startTimer = (taskId) => {
    clearInterval(this.state.timerIds[taskId])

    const timerId = setInterval(() => {
      const updatedTasks = this.state.tasks.map((task) => {
        if (task.id === taskId && task.currentTime > 0) {
          return { ...task, currentTime: task.currentTime - 1 }
        } else if (task.id === taskId && task.currentTime === 0) {
          clearInterval(this.state.timerIds[taskId])
          return { ...task, isRunning: false }
        }
        return task
      })
      this.updateTaskState(updatedTasks, taskId)
    }, 1000)

    this.setState((prevState) => ({
      timerIds: {
        ...prevState.timerIds,
        [taskId]: timerId,
      },
    }))
  }

  pauseTimer = (taskId) => {
    clearInterval(this.state.timerIds[taskId])
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isRunning: false }
      }
      return task
    })
    this.setState({ tasks: updatedTasks })
  }

  updateTaskState = (updatedTasks, taskId) => {
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId)
    if (taskToUpdate) {
      this.setState({
        tasks: updatedTasks,
        currentTime: taskToUpdate.currentTime,
      })
    } else {
      console.error(`Task with ID ${taskId} not found.`)
    }
  }

  handleDeleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }))
  }

  handleClearCompletedTasks = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.completed),
    }))
  }

  handleFilterTasks = (filter) => {
    this.setState({ filter })
  }

  filterTasks = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed)
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    } else {
      return tasks
    }
  }

  clickOnInput = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  countIncompleteTasks = () => {
    const { tasks } = this.state
    return tasks.filter((task) => !task.completed).length
  }

  handleEditTask = (id, newText) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    }))
  }

  render() {
    const { filter, tasks } = this.state
    const filteredTasks = this.filterTasks(tasks, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.handleAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={this.handleDeleteTask}
            onTaskCompleted={this.handleTaskCompleted}
            clickOnInput={this.clickOnInput}
            onEditTask={this.handleEditTask}
            createdAt={new Date()}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
          />
          <Footer
            filter={this.state.filter}
            onClearCompletedTasks={this.handleClearCompletedTasks}
            onFilterTasks={this.handleFilterTasks}
            countIncompleteTasks={this.countIncompleteTasks}
          />
        </section>
      </section>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
