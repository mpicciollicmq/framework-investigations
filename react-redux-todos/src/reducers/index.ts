import { combineReducers } from 'redux'
import { todosReducer } from './todos'
import { visibilityFilterReducer } from './visibilityFilter'

export const todoApp = combineReducers({
  todosReducer,
  visibilityFilterReducer
})