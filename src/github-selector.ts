import { createSelector } from 'reselect'
import {GithubState} from './github-types'

export const repositoriesSelector = (state: GithubState) => state.viewer
  ? state.viewer.repositories
  : []

export const languageStatsSelector = createSelector(
  repositoriesSelector,
  repositories => {
    const nameToSum = repositories.reduce<{[name: string]: number }>(
      (dict, repo) => repo.languages.reduce((dict, lang) => {
        const currentVal = dict[lang.name] || 0
        return {
          ...dict,
          [lang.name]: currentVal + lang.size,
        }
      }, dict),
      {}
    )

    const languageNames = Object.keys(nameToSum)

    const totalSum = languageNames.reduce((sum, lang) =>
      sum + nameToSum[lang],
      0
    )

    const stats = languageNames.map((lang) => ({
      name: lang,
      percentage: (nameToSum[lang] / totalSum) * 100
    }))

    stats.sort((a, b) => b.percentage - a.percentage)

    return stats
  }
)
