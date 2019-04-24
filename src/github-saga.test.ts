import {expectSaga, testSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import makeFakeApi from './api/fake-api'
import {fetchInfoSagaAux} from './github-saga'
import * as GithubActions from './github-actions'
import {GithubViewer} from './github-types'

it('waits for fetch info action', () => {
  testSaga(fetchInfoSagaAux, makeFakeApi())
    .next()
    .take(GithubActions.GithubActionType.FETCH_INFO)
})

it('sets the viewer', () => {
  const fakeApi = makeFakeApi();

  const expectedViewer: GithubViewer = {
    name: 'Bob',
    repositories: [{
        languages: [{
            name: 'C#',
            size: 30000,
          }
        ]
      }
    ]
  }

  return expectSaga(fetchInfoSagaAux, fakeApi)
    .dispatch(GithubActions.fetchInfo())
    .call(fakeApi.fetchInfo)
    .put(GithubActions.setViewer(expectedViewer))
    .run()
})

it('puts fetch failed', () => {
  const error = new Error('error');
  const fakeApi = makeFakeApi();

  return expectSaga(fetchInfoSagaAux, fakeApi)
    .provide([
      [matchers.call.fn(fakeApi.fetchInfo), throwError(error)],
    ])
    .dispatch(GithubActions.fetchInfo())
    .put(GithubActions.fetchFailed(error))
    .run()
})
