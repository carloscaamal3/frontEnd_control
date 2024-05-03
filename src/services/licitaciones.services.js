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
  getLictCe(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('proyectos/all/' + params) }
      return Api.get('proyectos/all/')
  },
  getProyFilterReg(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('consulta/regiones' + params) }
      return Api.get('consulta/regiones')
  },
  getProyFilterMun(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('consulta/municipios' + params) }
      return Api.get('consulta/municipios')
  },
  getProyFilterLoc(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('consulta/localidades' + params) }
      return Api.get('consulta/localidades')
  },
/*=====  End of Section Movimientos Detalle ======*/
  /*======================================================
  =            Section licitaciones all block            =
  ======================================================*/
  getLictAll(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('licitaciones/all/' + params) }
      return Api.get('licitaciones/all/')
  },
  postLicitacionNueva(jwt, body)
  {
    Api.defaults.headers.common['Authorization']= 'Bearer ' + jwt
        return Api.post('licitaciones/cab', body)
  },
  putLicitacionNueva(jwt, body, id)
  {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.put('licitaciones/cab/' + id, body)
 },
 putProyectoLicitacion(jwt, body, id)
 {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.put('licitaciones/proy/' + id, body)
 },
 postLiciXContra(jwt, body)
 {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    return Api.post('licitaciones/contra' , body)
 },
getLictXContratista(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('licitaciones/contra/' + params) }
      return Api.get('licitaciones/contra/')
  },
 deleteContrXLici(jwt, body, id){
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        return Api.delete('licitaciones/contra/' + id, body)
  },
  getContraXLicitacion(jwt, params) {
    Api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    if (params != null) {
      return Api.get('licitaciones/contraXLici/' + params) }
      return Api.get('licitaciones/contraXLici/')
  },
  /*=====  End of Section comment block  ======*/
  
}