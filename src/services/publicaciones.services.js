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

/*=============================================
=     Section Licitacion 0           =
=============================================*/
export default {
  getPub(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('publicaciones/cab' + params) }
      return Api.get('publicaciones/cab')
  },
   getPublicDetalle(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('publicaciones/det/' + params) }
      return Api.get('publicaciones/det/')
  },
  
       postPubDet(jwt, body, id){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.post('publicaciones/det/' + id,body)
      },
      putPubDet(jwt, body, id) {
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.put('publicaciones/det/' + id, body)
      },
}