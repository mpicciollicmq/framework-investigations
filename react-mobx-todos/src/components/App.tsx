import * as React from "react"
import { Component } from "react"
import { RouterContext } from "react-router"

import { AddTodo } from "./AddTodo"
import { FilteredTodoList } from "./FilteredTodoList"
import { Filters } from "./Filters"
import { Store } from "../model/Store"
import { Todo } from "../model/Todo"
import { TodosFilter } from "../model/TodosFilter"

interface AppProps {
  routerContext: RouterContext.RouterContextProps,
  store: Store
}

export class App extends Component<AppProps, void> {
  private toFilter(filterString: string): TodosFilter {
    switch (filterString) {
      case undefined:
        return TodosFilter.ShowAll

      case "active":
        return TodosFilter.ShowActive

      case "completed":
        return TodosFilter.ShowCompleted

      default:
        throw new Error(`The filterString '${filterString}' is not supported.`)
    }
  }

  public render() {
    return (
      <div>
        <AddTodo
          addTodo={(text: string) => this.props.store.addTodo(text)}
          addTodoAsynchronously={(text: string) => this.props.store.addTodoAsynchronously(text)}
        />
        <FilteredTodoList
          // tslint:disable-next-line no-string-literal
          activeFilter={this.toFilter(this.props.routerContext.params["filter"])}
          onTodoClick={(todo: Todo) => this.props.store.toggleTodo(todo)}
          todos={this.props.store.todos}
        />
        <Filters/>
      </div>
    )
  }
}