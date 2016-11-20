import { expect } from 'chai'

import { createAddTodo } from '../../src/actions/createAddTodo'
import { createSetVisibilityFilter } from '../../src/actions/createSetVisibilityFilter'
import { createToggleTodo } from '../../src/actions/createToggleTodo'

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    const actual = createAddTodo('Use Redux')
    const expected = {
      meta: {},
      payload: 'Use Redux',
      type: 'ADD_TODO'
    }
    expect(actual).to.deep.equal(expected)
  })

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(createSetVisibilityFilter('SHOW_ACTIVE')).to.deep.equal({
      meta: {},
      payload: 'SHOW_ACTIVE',
      type: 'SET_VISIBILITY_FILTER'
    })
  })

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(createToggleTodo(1)).to.deep.equal({
      meta: {},
      payload: 1,
      type: 'TOGGLE_TODO'
    })
  })
})