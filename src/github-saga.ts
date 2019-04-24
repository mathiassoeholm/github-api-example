import {Api} from './api/api-types'
import {call, put, all, fork, take} from 'redux-saga/effects';
import {fetchFailed, GithubActionType, setViewer} from './github-actions'
import {GithubViewer} from './github-types'
import produce from 'immer'

function* fetchInfoSaga(api: Api) {
  while (true) {
    yield fetchInfoSagaAux(api)
  }
}

export function* fetchInfoSagaAux(api: Api) {
  yield take(GithubActionType.FETCH_INFO)

  let response;

  try {
    response = yield call(api.fetchInfo)
  }
  catch (e) {
    yield put(fetchFailed(e))
    return
  }

  const { viewer } = response.data;

  const modifiedViewer = produce<GithubViewer>(viewer, draft => {
    draft.name = viewer.name
    draft.repositories = viewer.repositories.edges.map((r: any) => ({
      languages: r.node.languages.edges.map((l: any) => ({
        name: l.node.name,
        size: l.size,
      }))
    }))
  })

  yield put(setViewer(modifiedViewer))
}

export default function* root (api: Api) {
  yield all([
    fork(fetchInfoSaga, api),
  ]);
}
