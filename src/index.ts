import dotenv from 'dotenv'
import makeApi from './api/real-api'
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux'
import githubReducer from './github-reducer'

dotenv.config()

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware)

const store = createStore(
  githubReducer,
  enhancer,
)

sagaMiddleware.run()

const api = makeApi(process.env.GITHUB_ACCESS_TOKEN || '')

const run = async () => {
  let response;

  try {
    response = await api.fetchInfo();
  }
  catch (e) {
    console.log(e);
  }

  console.log(response.data.viewer.name)
}

run();
