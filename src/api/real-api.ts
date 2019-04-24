import {Api} from './api-types'
import axios from 'axios';

type realApiFactory = (accessToken: string) => Api

const fetchInfoQuery = `
  query {
    viewer {
      name
      repositories(isFork: false, first: 100) {
        edges {
          node {
            languages(first: 100) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`

const makeRealApi: realApiFactory = accessToken => {

  const githubRequest = axios.create({
    baseURL: 'https://api.github.com/graphql',
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
