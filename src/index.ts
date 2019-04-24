import dotenv from 'dotenv'
import makeApi from './api/real-api'
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux'
import githubReducer from './github-reducer'
import githubSaga from './github-saga'
import {fetchInfo} from './github-actions'
import {languageStatsSelector} from './github-selector'

dotenv.config()

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware)

const store = createStore(
  githubReducer,
  enhancer,
)

const api = makeApi(process.env.GITHUB_ACCESS_TOKEN || '')

sagaMiddleware.run(githubSaga, api)

console.log("State: " + JSON.stringify(store.getState()))

store.dispatch(fetchInfo())

function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}

wait().then(() => {
  console.log("Stats: " + JSON.stringify(languageStatsSelector(store.getState())))
})


