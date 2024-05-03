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
  getContratistas(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
	return Api.get('contratistas/' + params) }
    return Api.get('contratistas/')
  },
  postContratistas(jwt, body){
	Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
	return Api.post('contratistas/', body)
  },
  putContratistas(jwt, body, id) {
	Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
	return Api.put('contratistas/' + id, body)
       },
       deleteContratistas(jwt, body, id){
	Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
	return Api.delete('contratistas/' + id, body)
       }

}
