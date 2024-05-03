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
=     Section Movimientos Detalle            =
=============================================*/
export default {
  getMontoDetalle(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('presupuesto/movtosdet/' + params) }
      return Api.get('presupuesto/movtosdet/')
  },
/*=====  End of Section Movimientos Detalle ======*/
/*=============================================
  =            Section Saldos           =
  =============================================*/
  getSaldoDet(jwt, params) {
  Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  if (params != null) {
    return Api.get('presupuesto/saldopresxmov/' + params) }
    return Api.get('presupuesto/saldopresxmov/')
  },
  
  /*=====  End of Section Saldos  ======*/
  
}