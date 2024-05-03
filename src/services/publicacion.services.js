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
      return Api.get('publicaciones/cab/' + params) 
    }
      return Api.get('publicaciones/cab/')
    },
    getPublicDetalle(jwt, params) {
      Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
      if (params != null) {
        return Api.get('publicaciones/det/' + params) }
        return Api.get('publicaciones/det/')
      },
      putPubDet(jwt, body, id){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.put('publicaciones/det' + id,body)
      },
      postPubDet(jwt, body) {
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.post('publicaciones/det' , body)
      },
  /* postPubNueva(jwt, body){
	   Api.defaults.headers.common['Authorization'] = 'Bearer' + jwt
	   return Api.post('publicaciones/cab', body)
   },  
     putPubNueva(jwt, body,id){
     Api.defaults.headers.common['Authorization'] = 'Bearer' + jwt
     return Api.put('publicaciones/cab', + id,body)    
   }, */
      postPubNueva(jwt, body){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.post('publicaciones/cab/', body)
      },
      putPubNueva(jwt, body, id) {
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.put('/publicaciones/cab/' + id, body)
      },
      deletePublicacion(jwt, body, id){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.delete('/publicaciones/cab/' + id, body)
      },
      deletePublicacionDet(jwt, body, id){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.delete('/publicaciones/det/' + id, body)
      }
}