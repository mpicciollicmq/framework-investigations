import * as _ from "underscore"
import * as Marionette from "backbone.marionette"
import AddTodoView from "./AddTodoView"
import RootModel from "./RootModel"
import TodosView from "./TodosView"
import TypedLayoutView from "./TypedLayoutView"

interface RootViewOptions extends Marionette.LayoutViewOptions<RootModel> { }

export default class RootView extends TypedLayoutView<RootModel> {
  constructor(options: RootViewOptions) {
    super(RootView.setDefaultOptions(options))

    this.setUi({
      toggleAll: ".jsToggleAll"
    })

    this.setEvents({
      "click @ui.toggleAll": this.toggleAllClicked
    })

    this.listenTo(this.model.todos, "change:completed", this.getThrottledRender())
  }

  template = require("./RootView.ejs")

  private get addTodoRegion() {
    return this.getRegion("addTodo")
  }

  private get todosRegion() {
    return this.getRegion("todos")
  }

  /** Returns a throttled version of the render method. */
  private getThrottledRender() {
    return _.throttle(this.render, 10, { leading: false })
  }

  onRender() {
    const addTodoView = new AddTodoView({
      collection: this.model.todos
    })
    this.addTodoRegion.show(addTodoView)

    const todosView = new TodosView({
      collection: this.model.todos
    })
    this.todosRegion.show(todosView)
  }

  private static setDefaultOptions(options: RootViewOptions): RootViewOptions {
    options.el = ".jsRootViewElement"

    options.regions = {
      addTodo: ".jsAddTodoRegion",
      todos: ".jsTodosRegion"
    }

    return options
  }

  templateHelpers() {
    return {
      numberOfCompletedTodos: this.model.todos.getCompleted().length,
      numberOfTodos: this.model.todos.length,
      toggleAllChecked: this.model.todos.allCompleted() ? "checked" : ""
    }
  }

  private toggleAllClicked() {
    const markTodosCompleted = !this.model.todos.allCompleted()

    this.model.todos.each(todo => {
      todo.completed = markTodosCompleted
    })
  }
}
