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
  /**
   * @name getAfianzadoras
   * @description Obtienen afianzadora
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar la tabla
   */
  getAfianzadoras(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt

    if (params != null) {
      return Api.get('afianzadoras/' + params)
    }
    return Api.get('afianzadoras/')
  },

  postAfianzadoras(jwt, body) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.post('afianzadoras/', body)
  },

  /**
   * @name putAfianzadoras
   * @description Se actualiza la afianzadora
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar la tabla
   */
  putAfianzadoras(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.put('afianzadoras/' + id, body)
  },
  /**
   * @name deleteAfianzadoras
   * @description Se actualiza el activo de afianzadoara
   *
   * @param {*} jwt JSON Web Token válido
   * @param {*} params campo1 -> Parametros para poblar la tabla
   */
  deleteAfianzadoras(jwt, body, id) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.delete('afianzadoras/' + id, body)
  },
}