import {Api} from './api/api-types'
import {call, put} from 'redux-saga/effects';
import {fetchFailed, setViewerName} from './github-actions'

export function* fetchInfoSaga(api: Api) {
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
