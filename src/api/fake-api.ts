import {Api} from './api-types'

type fakeApiFactory = (fail: boolean, viewerName: string) => Api

const makeFakeApi: fakeApiFactory  = (fail, viewerName) => ({
  fetchInfo: async () => ({
    data: {
      viewer: {
        name: viewerName,
      }
    }
  })
})

export default makeFakeApi
