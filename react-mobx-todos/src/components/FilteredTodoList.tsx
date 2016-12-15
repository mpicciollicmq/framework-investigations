import * as React from "react"
import { Component } from "react"

import { TodosFilter } from "../model/Filter"
import { TodoList } from "./TodoList"
import { Todo } from "../model/Todo"
import { Todos } from "../model/Todos"

interface Props {
  activeFilter: TodosFilter
  onTodoClick: (todo: Todo) => void,
  todos: Todos
}

export class FilteredTodoList extends Component<Props, void> {
  private getVisibleTodos(): Todos {
    switch (this.props.activeFilter) {
      case TodosFilter.active:
        return this.props.todos.filter(todo => !todo.completed)

      case TodosFilter.completed:
        return this.props.todos.filter(todo => todo.completed)

      // TODO: Handle the ShowAll case properly.
      case TodosFilter.ShowAll:
        return this.props.todos

      default:
        throw new Error("Unsupported filter: " + this.props.activeFilter)
    }
  }

  public render() {
    return (
      <TodoList onTodoClick={this.props.onTodoClick} todos={this.getVisibleTodos()}/>
    )
  }
}