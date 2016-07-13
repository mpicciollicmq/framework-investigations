import FilterModel from "./FilterModel"
import TypedItemView from "./TypedItemView"

interface FilterViewOptions extends Backbone.ViewOptions<FilterModel> {
  fragment: string,
  name: string,
  model: FilterModel
}

export default class FilterView extends TypedItemView<FilterModel> {
  constructor(
    private options: FilterViewOptions
  ) {
    super(FilterView.setDefaultOptions(options))

    this.setUi({
      filterLink: ".jsFilter"
    })

    this.setEvents({
      "click @ui.filterLink": this.filterClicked
    })
  }

  template = require("./FilterView.ejs")

  private filterClicked() {
    // TODO: Implement
  }

  private static setDefaultOptions(options: FilterViewOptions): FilterViewOptions {
    this.setTagName(options, "span")
    return options
  }

  templateHelpers() {
    return {
      active: this.options.active,
      name: this.options.name
    }
  }
}
