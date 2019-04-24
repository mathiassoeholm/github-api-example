import githubReducer from './github-reducer'
import * as githubActions from './github-actions'
import {GithubViewer} from './github-types'

test('it returns initial state', () => {
  expect(
    githubReducer(undefined, { type: 'UNKNOWN_TYPE' })
  ).toEqual({ })
})

test('it sets the viewer', () => {
  const viewer: GithubViewer = {
    name: 'Carl',
    repositories: [
      {
        languages: [
          {
            name: 'TypeScript',
            size: 10000,
            color: '#343434',
          }
        ]
      }
    ]
  }

  expect(
    githubReducer(undefined, githubActions.setViewer(viewer))
  ).toEqual({
    viewer
  })
})
