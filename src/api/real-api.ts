import {Api} from './api-types'
import axios from 'axios';

type realApiFactory = (accessToken: string) => Api

const fetchInfoQuery = `
  query { 
    viewer { 
      name
    }
  }
`

const makeRealApi: realApiFactory = accessToken => {

  const githubRequest = axios.create({
    url: 'https://api.github.com/graphql',
    headers: { Authorization: `bearer ${accessToken}` },
  })

  return {
    fetchInfo: async () => {
      const response = await githubRequest.post('', {
        query: fetchInfoQuery,
      })

      return response.data
    }
  }
};


export default makeRealApi;
