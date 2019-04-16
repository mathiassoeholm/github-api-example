import dotenv from 'dotenv'
import makeApi from './api/real-api'

dotenv.config()

const api = makeApi(process.env.GITHUB_ACCESS_TOKEN || '');

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

