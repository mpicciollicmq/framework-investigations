import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'

import { Filter } from './Filter'
import { FilteredTodoList } from './FilteredTodoList'
import { TodoModel } from './TodoModel'

interface Props {
  currentFilter: Filter
  deleteTodo: (todo: TodoModel) => void
  todos: Array<TodoModel>
}

@observer
export class Main extends Component<Props, void> {
  public render() {
    const allTodosChecked = this.props.todos.every(todo => todo.completed)

    return (
      <section className="main">
        <input
          checked={allTodosChecked}
          className="toggle-all"
          id="toggle-all"
          onChange={() => this.toggleAllTodos()}
          type="checkbox"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <FilteredTodoList
          currentFilter={this.props.currentFilter}
          deleteTodo={todo => this.props.deleteTodo(todo)}
          todos={this.props.todos}
        />
      </section>
    )
  }

  private allTodosHaveSameState() {
    if (this.props.todos.every(todo => todo.completed)) {
      return true
    }

    if (this.props.todos.every(todo => !todo.completed)) {
      return true
    }

    return false
  }

  private toggleAllTodos() {
    if (this.allTodosHaveSameState()) {
      this.props.todos.forEach(todo => todo.toggle())
      return
    }

    this.props.todos.forEach(todo => {
      todo.completed = true
    })
  }
}