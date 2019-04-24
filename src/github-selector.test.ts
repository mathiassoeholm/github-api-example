import {GithubState} from './github-types'
import {languageStatsSelector} from './github-selector'

it('returns an empty array if viewer is not defined', () => {
  const state: GithubState = { }

  expect(
    languageStatsSelector(state)
  ).toEqual([])
})

it('returns an empty array if viewer has no repositories', () => {
  const state: GithubState = {
    viewer: {
      name: 'Name',
      repositories: []
    }
  }

  expect(
    languageStatsSelector(state)
  ).toEqual([])
})

it('selects language stats', () => {
  const state: GithubState = {
    viewer: {
      name: 'Name',
      repositories: [
        {
          languages: [
            {
              name: 'C#',
              size: 100
            },
            {
              name: 'JavaScript',
              size: 400,
            },
            {
              name: 'TypeScript',
              size: 50,
            },
          ],
        },
        {
          languages: [
            {
              name: 'C++',
              size: 50,
            },
            {
              name: 'JavaScript',
              size: 400,
            },
          ],
        },
      ]
    }
  }

  expect(
    languageStatsSelector(state)
  ).toEqual([
    {
      name: 'JavaScript',
      percentage: 80,
    },
    {
      name: 'C#',
      percentage: 10,
    },
    {
      name: 'TypeScript',
      percentage: 5,
    },
    {
      name: 'C++',
      percentage: 5,
    },
  ])
})

