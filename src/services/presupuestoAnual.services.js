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
  timeout: 10000, 
})
export default {
getPresupuestoAnual(jwt, params) {
	Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
	if (params != null) {
		return Api.get('presupuesto/presanual/' + params) }
		return Api.get('presupuesto/presanual/')
  },
  getPresupuestoAnualDet(jwt, params) {
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  if (params != null) {
    return Api.get('presupuesto/presanualdet/' + params) }
    return Api.get('presupuesto/presanualdet/')
  },
  
}