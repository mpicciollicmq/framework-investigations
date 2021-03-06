import { h } from "preact"
import { render } from "preact"

import { App } from "./components/App"
import { TodoStore } from "./models/TodoStore"

const storeUpdated = () => {
  renderApp()
}

const store = new TodoStore(storeUpdated)

const renderApp = () => {
  render(
    <App store={store}/>,
    document.getElementById("root") as HTMLElement
  )
}

renderApp()