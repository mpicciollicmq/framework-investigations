import * as React from 'react'
import { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Info } from './Info'
import { Main } from './Main'
import { TodoModel } from './TodoModel'

@observer
export class App extends Component<{}, void> {
  constructor(props: {}, context?: any) {
    super(props, context)

    this.todos = [
      new TodoModel('Taste JavaScript', true),
      new TodoModel('Buy a unicorn', false)
    ]
  }

  @observable private readonly todos: Array<TodoModel>

  public render() {
    return (
      <div>
        <section className="todoapp">
          <Header addTodo={text => this.addTodo(text)}/>
          {this.todos.length >= 1 &&
            <Main todos={this.todos} />
          }
          {this.todos.length >= 1 &&
            <Footer todos={this.todos}/>
          }
        </section>
        <Info/>
      </div>
    )
  }

  private addTodo(text: string) {
    this.todos.push(new TodoModel(text, false))
  }
}