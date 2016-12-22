import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Todo } from "../model/Todo"

interface Props {
  onClick: () => void,
  todo: Todo
}

@observer
export class TodoItem extends Component<Props, void> {
  public render() {
    return (
      <li
        onClick={() => this.props.onClick()}
        style={{
          cursor: "pointer",
          textDecoration: this.props.todo.completed ? "line-through" : "none"
        }}
      >
        {this.props.todo.text}
      </li>
    )
  }
}