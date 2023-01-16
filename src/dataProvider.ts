import {
  ApolloClient,
  gql,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import type {
  CreateResponse,
  DataProvider,
  DeleteOneResponse,
  GetListResponse,
  UpdateResponse
} from '@pankod/refine-core'

const API_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

const filmFragment = gql`
  fragment filmFragment on Film {
    id
    title
  }
`

const notImplemented = (method: string) =>
  new Promise((resolve, reject) => {
    console.log(`${method} is not implemented`)
    resolve({ id: 0 })
  })

export const dataProvider: DataProvider = {
  create: ({ resource, variables, metaData }) =>
    notImplemented('create') as Promise<CreateResponse<any>>,
  // createMany?: ({ resource, variables, metaData }) => Promise,
  deleteOne: ({ resource, id, variables, metaData }) =>
    notImplemented('deleteOne') as Promise<DeleteOneResponse<any>>,
  // deleteMany?: ({ resource, ids, variables, metaData }) => Promise,
  getList: async ({
    resource
    // pagination,
    // sort,
    // filters,
    // metaData,
    // hasPagination
  }) => {
    console.log('resource', resource)
    if (resource === 'Film') {
      const result = await client.query({
        query: gql`
          ${filmFragment}
          query Films {
            allFilms {
              films {
                ...filmFragment
              }
            }
          }
        `
      })
      return {
        data: result.data['allFilms']['films'],
        total: result.data['allFilms']['films'].length
      }
    }
    if (resource === 'User') {
      return {
        data: [
          { id: '1', fullName: 'JAsdsa' },
          { id: '2', fullName: 'sadasda' }
        ],
        total: 2
      }
    }
    return { data: [], total: 0 }
  },
  //   getMany: ({ resource, ids, metaData }) => Promise
  getOne: async ({ resource, id, metaData }) => {
    const result = await client.query({
      query: gql`
        query Film($filmId: ID) {
          film(id: $filmId) {
            id
            title
          }
        }
      `,
      variables: {
        filmId: id
      }
    })
    return result
  },
  update: ({ resource, id, variables, metaData }) =>
    notImplemented('update') as Promise<UpdateResponse<any>>,
  // updateMany?: ({ resource, ids, variables, metaData }) => Promise,
  // custom: ({
  //     url,
  //     method,
  //     sort,
  //     filters,
  //     payload,
  //     query,
  //     headers,
  //     metaData,
  // }) => Promise,
  getApiUrl: () => API_URL
}
