import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'

import { TodoList } from './TodoList'
import { Todos } from '../model/Todos'
import { TodosFilter } from '../model/TodosFilter'

interface Props {
  activeFilter: TodosFilter
  todos: Todos
}

@observer
export class FilteredTodoList extends Component<Props, void> {
  private getVisibleTodos(): Todos {
    const visibleTodos = this.props.activeFilter.filter(this.props.todos)
    return visibleTodos
  }

  public render() {
    return (
      <TodoList todos={this.getVisibleTodos()}/>
    )
  }
}