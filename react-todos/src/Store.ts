import { Todo } from "./models/Todo"
import { Todos } from "./models/Todos"

export class Store {
  constructor(
    private storeUpdated: () => void
  ) {
    this.todos = []
  }

  public todos: Todos

  public addTodo(text: string) {
    const newTodo = new Todo(this.getId(), text)
    this.todos.push(newTodo)
    this.storeUpdated()
  }

  private getId(): number {
    const nextId = this.getRandomInteger(1, Number.MAX_SAFE_INTEGER)
    return nextId
  }

  private getRandomInteger(min: number, max: number): number {
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min
    return randomInteger
  }

  public toggleTodo(todo: Todo) {
    todo.toggle()
    this.storeUpdated()
  }
}