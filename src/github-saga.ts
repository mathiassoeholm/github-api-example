import {Api} from './api/api-types'
import {call, put, all, fork, take} from 'redux-saga/effects';
import {fetchFailed, GithubActionType, setViewerName} from './github-actions'

export function* fetchInfoSaga(api: Api) {
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

  yield put(setViewerName(response.data.viewer.name))
}

export default function* root (api: Api) {
  yield all([
    fork(fetchInfoSaga, api),
  ]);
}
