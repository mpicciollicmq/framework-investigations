// TODO: Why does the compiler not complain when Marionette is missing, but it fails at run time?
import * as Marionette from "backbone.marionette"
import TypedCompositeViewOptions from "./TypedCompositeViewOptions"

abstract class TypedCompositeView<
  TModel extends Backbone.Model,
  TCollection extends Backbone.Collection<TModel>,
  TView extends Marionette.View<TModel>
> extends Marionette.CompositeView<TModel, TView> {
  constructor(options: TypedCompositeViewOptions<TModel, TCollection>) {
    super(options)
  }

  collection: TCollection

  // TODO: Figure out how to define a template for the setDefaultOptions method.
}

export default TypedCompositeView
