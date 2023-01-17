import { AuthProvider } from '@pankod/refine-core'
import nookies from 'nookies'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

const mockUsers = [
  {
    username: 'admin',
    email: 'admin@refine.dev',
    roles: ['admin']
  },
  {
    username: 'editor',
    email: 'editor@refine.dev',
    roles: ['editor']
  }
]

export const authProvider: AuthProvider = {
  login: ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers[0]

    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        nookies.set(null, 'auth', JSON.stringify(user), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })
      })
      .catch(error => {
        const errorMessage = error.message
        return Promise.reject()
      })
  },
  logout: () => {
    nookies.destroy(null, 'auth')
    return Promise.resolve()
  },
  checkError: error => {
    if (error && error.statusCode === 401) {
      return Promise.reject()
    }

    return Promise.resolve()
  },
  checkAuth: ctx => {
    const cookies = nookies.get(ctx)
    return cookies['auth'] ? Promise.resolve() : Promise.reject()
  },
  getPermissions: () => {
    const auth = nookies.get()['auth']
    if (auth) {
      const parsedUser = JSON.parse(auth)
      return Promise.resolve(parsedUser.roles)
    }
    return Promise.reject()
  },
  getUserIdentity: () => {
    const auth = nookies.get()['auth']
    if (auth) {
      const parsedUser = JSON.parse(auth)
      return Promise.resolve(parsedUser.username)
    }
    return Promise.reject()
  }
}
