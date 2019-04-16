import {Api} from './api-types'

type fakeApiFactory = (viewerName?: string) => Api

const makeFakeApi: fakeApiFactory  = (viewerName) => ({
  fetchInfo: async () => ({
    data: {
      viewer: {
        name: viewerName,
      }
    }
  })
})

export default makeFakeApi
