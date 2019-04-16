import {Api} from './api/api-types'
import {call, put} from 'redux-saga/effects';
import {setViewerName} from './github-actions'

export function* fetchInfoSaga(api: Api) {
  const response = yield call(api.fetchInfo)

  yield put(setViewerName(response.data.viewer.name))
}
