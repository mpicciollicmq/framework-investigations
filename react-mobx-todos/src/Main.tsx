import * as React from "react"
// TODO: Figure out how to remove dev tools from the production bundle.
import DevTools from "mobx-react-devtools"
import { browserHistory } from "react-router"
import { render } from "react-dom"
import { Route } from "react-router"
import { Router } from "react-router"
import { useStrict } from "mobx"

import { App } from "./components/App"
import { RouteComponent } from "./model/RouteComponent"
import { Store } from "./model/Store"
import { TodosFilter } from "./model/TodosFilter"
import { TypedRoute } from "./model/TypedRoute"

useStrict(true)
const store = new Store()

declare const process: any
const includeDevTools = process.env.NODE_ENV === "development"

class ConnectedApp extends RouteComponent<void> {
  public render() {
    return (
      <div>
        <App routerContext={this.props} store={store}/>
        {includeDevTools &&
          <DevTools/>
        }
      </div>
    )
  }
}

// TODO: Merge the to/from conversion in a single file.
// TodosFilter.ShowAll.path()
// TodosFilter.fromPath(path: string)
export const FilteredTodos: TypedRoute<(filter: TodosFilter) => string> = new TypedRoute(
  ConnectedApp,
  "/(:filter)",
  (filter: TodosFilter) => {
    switch (filter) {
      case TodosFilter.ShowActive:
        return "/active"

      case TodosFilter.ShowAll:
        return "/"

      case TodosFilter.ShowCompleted:
        return "/completed"

      default:
        throw new Error(`The filter '${filter} is not supported.`)
    }
  }
)

const allRoutes = [
  FilteredTodos
]

render(
  <Router history={browserHistory}>
    {allRoutes.map(route =>
      <Route key={route.routePath} component={route.component} path={route.routePath}/>
    )}
  </Router>,
  document.getElementById("app")
)