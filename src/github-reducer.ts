import {GithubInfo} from './github-types'
import produce from 'immer'
import {GithubActionType} from './github-actions'

const initialState: GithubInfo = {

}

export default function(
 state = initialState,
 action: { type: string, payload?: any }
): GithubInfo {
  return produce<GithubInfo>(state, draft => {
    switch (action.type) {
      case GithubActionType.SET_VIEWER_NAME:
        draft.viewer = { ...state.viewer, name: action.payload }
    }
  })
}
