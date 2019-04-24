import {Api} from './api-types'

type fakeApiFactory = () => Api

const makeFakeApi: fakeApiFactory  = () => ({
  fetchInfo: async () => ({
    data: {
      viewer: {
        name: 'Bob',
        repositories: {
          edges: [
            {
              node: {
                languages: {
                  edges: [
                    {
                      size: 30000,
                      node: {
                        name: "C#",
                        color: "#FFFFFF"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  })
})

export default makeFakeApi
