import axios from 'axios'
// URL de la API
const baseURL = process.env.VUE_APP_BASE_URL_API

// Objeto axios de la api
const Api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de espera
})
export default {
  getAccionesD(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('accionesdet' + params)
    }
    return Api.get('accionesdet/')
  },
  postAccionesD(jwt, body) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.post('accionesdet/', body)
  },
  putAccionesD(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.put('accionesdet/' + id, body)
  },
  deleteAccionesD(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.delete('accionesdet/' + id, body)
  },
  getEjercicios(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    //console.log(params)
    if (params != null) {
      return Api.get('acciones/ejercicios' + params)
    }
    return Api.get('acciones/ejercicios')
  },
}
