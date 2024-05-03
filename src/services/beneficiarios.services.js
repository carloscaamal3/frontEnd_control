import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL_API
const endPoint = 'beneficiarios/'

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default {
  getBeneficiarios(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt

    if (params != null) {
      return Api.get(endPoint + params)
    }
    return Api.get(endPoint)
  },

  // postBeneficiarios(jwt, body) {
  //   Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  //   return Api.post('endPoint/', body)
  // },

  // putBeneficiarios(jwt, body, id) {
  //   Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  //   return Api.put('endPoint/' + id, body)
  // },

  // deleteBeneficiarios(jwt, body, id) {
  //   Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  //   return Api.delete('endPoint/' + id, body)
  // },
}
