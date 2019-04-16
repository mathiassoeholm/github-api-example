import { expectSaga } from 'redux-saga-test-plan';
import makeFakeApi from './api/fake-api'
import {fetchInfoSaga} from './github-saga'
import {setViewerName} from './github-actions'

test('fetchInfoSaga success', () => {
  const fakeApi = makeFakeApi(false, 'Bob');

  return expectSaga(fetchInfoSaga, fakeApi)
    .call(fakeApi.fetchInfo)
    .put(setViewerName('Bob'))
    .run()
})
