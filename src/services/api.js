import axios from 'axios'
import router from '../router'
import store from '../store'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
})

/**
 * @description Interceptor para el request
 */
httpClient.interceptors.request.use(async (req) => {
    console.info('Entra a upload', token)
  req.config = {
    ...(req.config ?? {}), // preservar un objeto request.config dado
    start: Date.now(),
  }
  const token = store.getters['auth/accessToken']
  if (req.url.includes('upload')) {
    console.info('Entra a upload')
    req.headers = {
      'x-token': token, // Utiliza el valor del token como el valor del encabezado
      'Content-Type': 'multipart/form-data',
    }
  } else {
    req.headers = {
      'x-token': token, // Utiliza el valor del token como el valor del encabezado
      'Content-Type': 'application/json',
    }
  }
  return req
})

/**
 * @description Interceptor para el response
 */
httpClient.interceptors.response.use(
  (response) => {
    const end = Date.now()
    console.info(`Api Call ${response.config.url} took ${end - response.config.config.start}ms`)
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest.url.includes('/auth/token')) {
      console.log('Caduco el refresh token')
      store.commit('auth/clearUserData')
      store.commit('auth/LOGOUT')
      router.push({ name: 'Login' })
      console.info('push al login')
      return Promise.reject(error)
    } else if (error.response.status === 401 && !originalRequest._retry) {
      console.log('Caduco el token')
      originalRequest._retry = true
      await store.dispatch('auth/refreshToken')
      return httpClient(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default httpClient
