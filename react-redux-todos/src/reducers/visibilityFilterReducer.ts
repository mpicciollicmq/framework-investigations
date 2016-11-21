import { Action as ReduxAction } from 'redux'

import { createSetVisibilityFilter } from '../actions/createSetVisibilityFilter'
import { Filter } from '../model/Filter'
import { isType } from 'redux-typescript-actions'

export const visibilityFilterReducer = (state: Filter = 'SHOW_ALL', action: ReduxAction): Filter => {
  if (isType(action, createSetVisibilityFilter)) {
    return action.payload
  }

  return state
}