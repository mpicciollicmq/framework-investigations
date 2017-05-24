import * as React from 'react'
import { Component } from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { MouseEvent } from 'react'

import { Route } from './Route'
import { Routes } from './Routes'
import { TodoModel } from './TodoModel'

interface Props {
  currentRoute: Route
  deleteTodo: (todo: TodoModel) => void
  routes: Routes
  setCurrentRoute: (route: Route) => void
  todos: Array<TodoModel>
}

@observer
export class Footer extends Component<Props, void> {
  public render() {
    const numberOfActiveTodos = this.props.todos.filter(todo => !todo.completed).length
    const pluralizedItems = this.pluralize('item', numberOfActiveTodos)

    return (
      <footer className="footer">
        <span
          className="todo-count"
        >
          <strong>{numberOfActiveTodos}</strong> {pluralizedItems} left
        </span>
        <ul className="filters">
          {this.props.routes.allRoutes.map(route =>
            <li key={route.filter}>
              <a
                className={this.props.currentRoute.filter === route.filter ? 'selected' : ''}
                href=""
                onClick={e => this.navigate(e, route)}
              >
                {route.caption}
              </a>
            </li>
          )}
        </ul>
        {this.completedTodos.length >= 0 &&
          <button
            className="clear-completed"
            onClick={() => this.deleteCompletedTodos()}
          >
            Clear completed
          </button>
        }
      </footer>
    )
  }

  @computed
  private get completedTodos(): Array<TodoModel> {
    const completedTodos = this.props.todos.filter(todo => todo.completed)
    return completedTodos
  }

  private deleteCompletedTodos() {
    this.completedTodos.forEach(todo => this.props.deleteTodo(todo))
  }

  private pluralize(word: string, items: number) {
    if (items === 1) {
      return word
    }

    return word + 's'
  }

  private navigate(e: MouseEvent<HTMLAnchorElement>, route: Route): void {
    e.preventDefault()
    this.props.setCurrentRoute(route)
  }
}