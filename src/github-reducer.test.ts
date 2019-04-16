import githubReducer from './github-reducer'
import * as githubActions from './github-actions'

test('it returns initial state', () => {
  expect(
    githubReducer(undefined, { type: 'UNKNOWN_TYPE' })
  ).toEqual({ })
})

test('it sets viewer name', () => {
  expect(
    githubReducer(undefined, githubActions.setViewerName('Bob'))
  ).toEqual({
    viewer: {
      name: 'Bob',
    }
  })
})
