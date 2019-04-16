import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import makeFakeApi from './api/fake-api'
import {fetchInfoSagaAux} from './github-saga'
import {fetchFailed, GithubActionType, setViewerName} from './github-actions'

test('fetchInfoSaga success', () => {
  const fakeApi = makeFakeApi('Bob');

  return expectSaga(fetchInfoSagaAux, fakeApi)
    .take(GithubActionType.FETCH_INFO)
    .call(fakeApi.fetchInfo)
    .put(setViewerName('Bob'))
    .run()
})

test('fetchInfoSaga fail', () => {
  const error = new Error('error');
  const fakeApi = makeFakeApi();

  return expectSaga(fetchInfoSagaAux, fakeApi)
    .provide([
      [matchers.call.fn(fakeApi.fetchInfo), throwError(error)],
    ])
    .put(fetchFailed(error))
    .run()
})
