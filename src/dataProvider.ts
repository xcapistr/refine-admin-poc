import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import type {
  CreateResponse,
  DataProvider,
  DeleteOneResponse,
  UpdateResponse
} from '@pankod/refine-core'

const API_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

const users = [
  {
    id: '1',
    fullName: 'Pedro Pascal',
    email: 'asdasd@asdasd.te',
    zipCode: '10001'
  },
  {
    id: '2',
    fullName: 'Bella Ramsey',
    email: 'asdsaads@fssdf.fg',
    zipCode: '10002'
  }
]

const filmFragment = gql`
  fragment filmFragment on Film {
    id
    title
    director
    releaseDate
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
  deleteOne: ({ resource, id, variables, metaData }) =>
    notImplemented('deleteOne') as Promise<DeleteOneResponse<any>>,
  getList: async ({ resource }) => {
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
        data: users,
        total: users.length
      }
    }
    return { data: [], total: 0 }
  },
  getOne: async ({ resource, id, metaData }) => {
    if (resource === 'Film') {
      const result = await client.query({
        query: gql`
          ${filmFragment}
          query Film($filmId: ID) {
            film(id: $filmId) {
              ...filmFragment
            }
          }
        `,
        variables: {
          filmId: id
        }
      })
      return result
    } else {
      return {
        data: { user: users.find(user => user.id === id) }
      } as any
    }
  },
  update: ({ resource, id, variables, metaData }) =>
    notImplemented('update') as Promise<UpdateResponse<any>>,
  getApiUrl: () => API_URL
}
