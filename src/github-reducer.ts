import {GithubState} from './github-types'
import produce from 'immer'
import {GithubActionType} from './github-actions'

const initialState: GithubState = {

}

export default function(
 state = initialState,
 action: { type: string, payload?: any }
): GithubState {
  return produce<GithubState>(state, draft => {
    switch (action.type) {
      case GithubActionType.SET_VIEWER:
        draft.viewer = action.payload
    }
  })
}
